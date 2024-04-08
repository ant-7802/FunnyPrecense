const { ActiveWindow } = require("@paymoapp/active-window");
const dotenv = require("dotenv");
const fs = require("fs");
const env = dotenv.config().parsed;
const { findname } = require("./apps.js")
if (!fs.readFileSync(".env") || !env.key || !env.server) {
    console.log("Please make a file called .env and add a key like this: key=akeyhere, and server like this: server=server");
    process.exit()
}


async function loop() {
    var status = await ActiveWindow.getActiveWindow();
    const name = findname(status.title);
    var iconenabled = true;
    var icon = status.icon.split(",")[1];
    if (name.enableicon == false) {
        icon = "";
        iconenabled = false;
    }
    
    // if (name.icon) {
    //     var res = await fetch(name.icon)
    //     const ArBu = await res.arrayBuffer();
    //     const byteArray = new Uint8Array(ArBu);
    //     icon = Buffer.from(byteArray).toString('base64');
    //     console.log(byteArray)
    // } else {
    //     icon = status.icon.split(",")[1];
    // }
    
    var submit = await fetch(`${env.server}/submit`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "key": env.key
        },
        body: JSON.stringify({
            title: name.tag,
            icon: icon,
            enableicon: iconenabled
        })
    });
}
loop()
//setInterval(loop, 10000);