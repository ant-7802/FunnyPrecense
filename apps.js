


function findname(apptitle) {
    const names = [
        { keyword: "Visual Studio Code", tag: "VS Code" },
        { keyword: "Google Chrome", tag: "Browsing the Web" },
        { keyword: "Google Docs", tag: "Schoolwork" },
        { keyword: "~", tag: "Terminal", specific: true },
        { keyword: "sudo apt", tag: "Updating" },
        { keyword: "GitHub", tag: "Github" },
    ];
    for (const app of names) {
        if (apptitle.includes(app.keyword) && !app.specific) {
            return { tag: app.tag, icon: app.icon }; 
        } else if (app.specific && apptitle == app.keyword) {
            return { tag: app.tag, icon: app.icon };
        }
    }
    return { tag: "Online", enableicon: false };
}

module.exports = {
    findname: findname
};