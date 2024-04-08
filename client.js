const {
    ActiveWindow
} = require("@paymoapp/active-window");
const dotenv = require("dotenv");
const fs = require("fs");
const env = dotenv.config().parsed;
if (!fs.readFileSync(".env") || !env.key || !env.server) {
    console.log("Please make a file called .env and add a key like this: key=akeyhere, and server like this: server=server");
    process.exit()
}
//setInterval(async () => {
async function ok() {
    var status = await ActiveWindow.getActiveWindow();
    var data = {
        "key": env.key,
        "status": status
    };
    var submit = await fetch("http://localhost:3000/", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "KEY": env.key
        },
        body: JSON.stringify(data)
    });
    console.log(await submit.status)
}
ok()
//}, 1000);