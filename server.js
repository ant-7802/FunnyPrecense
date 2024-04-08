const express = require("express");
const Jimp = require("jimp");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const port = 3000;
const env = dotenv.config().parsed;
const fs = require("fs");
var timer = 55;
app.use(express.json({limit: '50mb'}));
async function main() {
if (!fs.readFileSync(".env") || !env.key) {
    console.log("Please make a file called .env and add a key like this: key=akeyhere");
    process.exit()
}   



    var fontsans64 = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    var fontsans32 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const ghapi = await fetch("https://api.github.com/users/ant-7802");
    const { login, id } = await ghapi.json();
    const profile = await Jimp.read(`https://avatars.githubusercontent.com/u/${id}`);
    const graycircle = (await Jimp.read(`assets/graycircle.png`)).resize(40,40);
    const greencircle = (await Jimp.read(`assets/greencircle.png`)).resize(40,40);
    profile.resize(150, 150);
    profile.circle();

    async function imgen(colorcircle,icon,title) {
        var background = await Jimp.read("assets/background.png");
        await background.composite(profile, 30, 30);
        await background.print(fontsans64, 325, 30, `${login}`);
        await background.print(fontsans32, 340, 120, title);
        await background.composite(colorcircle,130,140);
        if (icon) {
            await background.composite(icon,250,107);
        }
        await background.write("img.png");
    }

    app.post("/submit", async (req,res) => {
        var headers = req.headers
        var body = req.body;
        if (body && headers.key && headers.key == env.key) { 
            timer = 0;
            var icon;
        if (body.enableicon == true) {
            icon = (await Jimp.read(Buffer.from(body.icon,"base64url"))).resize(64,64);   
        } else {
            icon = null;
        }
        imgen(greencircle,icon,body.title)
        res.sendStatus(200);
        
    } else {
        res.sendStatus(403)
    }
    });
       

    setInterval(() => {
        timer += 1;
        if (timer == 60) {
            imgen(graycircle,null,"Offline")
        }
    }, 1000);



    app.get("/status", async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET');
        var imagePath = path.join(__dirname, 'img.png');
        if (fs.readFileSync(imagePath)) {
            res.sendFile(imagePath);
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });


}
main();

