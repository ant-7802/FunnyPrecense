const express = require("express");
const { ActiveWindow } = require("@paymoapp/active-window");
const Jimp = require("jimp");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs")
async function main() {
    
    var fontsans64 = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    var fontsans32 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const ghapi = await fetch("https://api.github.com/users/ant-7802");
    const { login, id } = await ghapi.json();
    const profile = await Jimp.read(`https://avatars.githubusercontent.com/u/${id}`);
    const graycircle = (await Jimp.read(`assets/graycircle.png`)).resize(40,40);
    const greencircle = (await Jimp.read(`assets/greencircle.png`)).resize(40,40);
    profile.resize(150, 150);
    profile.circle();
    var status = await ActiveWindow.getActiveWindow();
    const icon = (await Jimp.read(Buffer.from(status.icon.split(",")[1],"base64url"))).resize(64,64);
    Jimp.read("background.png", async (err, background) => {
        if (err) throw err;
        await background.composite(profile, 70, 30);
        await background.print(fontsans64, 325, 30, `${login}`);
        await background.print(fontsans32, 325, 120, status.title);
        await background.composite(greencircle,170,140);
        await background.composite(icon,170,140);
        await background.write("img.png");
    });


    app.get("/mew", async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET');
        var imagePath = path.join(__dirname, 'img.png');
        res.sendFile(imagePath);
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}

main();