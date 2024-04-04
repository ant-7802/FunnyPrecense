import { ActiveWindow } from "@paymoapp/active-window";
import Jimp from "jimp";
const ghapi = await fetch("https://api.github.com/users/ant-7802");
const { login, id } = await ghapi.json();
const profile = await Jimp.read(`https://avatars.githubusercontent.com/u/${id}`);
profile.resize(150,150);
profile.circle();
console.log(id)
console.log(login)


await Jimp.read("background.png", (err, background) => {
    if (err) throw err;
    Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then((font) => {
        background.composite(profile,70,30)
        background.print(font, 325, 30, `${login}`)
        background.write("curr.png");
    });
});
