const express = require("express");
const { ActiveWindow } = require("@paymoapp/active-window");
const Jimp = require("jimp");
const path = require("path");
const app = express();
const port = 3000;

async function main() {
    const ghapi = await fetch("https://api.github.com/users/ant-7802");
    const { login, id } = await ghapi.json();
    const profile = await Jimp.read(`https://avatars.githubusercontent.com/u/${id}`);
    
    profile.resize(150, 150);
    profile.circle();
    var status = await ActiveWindow.getActiveWindow();
    Jimp.read("background.png", async (err, background) => {
        if (err) throw err;
        background.composite(profile, 70, 30);
        await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then((font) => {
            
            background.print(font, 325, 30, `${login}`);
            
        });
        await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then((font) => {
            console.log(status)
            background.print(font, 325, 120, status.title);
        });
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