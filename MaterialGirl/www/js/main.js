//=============================================================================
// main.js
//=============================================================================

window["mods"] = [
    { "name": "_CheatMenu", "status": true, "description": ""},
    { "name": "_rpg_windows", "status": true, "description": ""},
    { "name": "_rpg_scenes", "status": true, "description": ""},
    { "name": "_TS_ExtensionStatus", "status": true, "description": ""},
    { "name": "_rpg_objects", "status": true, "description": ""},
    
]
PluginManager.setup($plugins);
window.onload = function () {
    SceneManager.run(Scene_Boot);
    window["maps"] = ["007", "021", "035", "120", "008", "022", "036", "121", "009", "023", "037", "122", "010", "024", "038", "143", "011", "025", "039", "146", "012", "026", "040", "013", "027", "041", "014", "028", "042", "001", "015", "029", "043", "002", "016", "030", "044", "003", "017", "031", "045", "004", "018", "032", "046", "005", "019", "033", "047", "006", "020", "034", "119"]
    window["mapIndex"] = 0
    window["keyListen"] = true


    PluginManager.setup = function (plugins, path) {
        plugins.forEach(function (plugin) {
            if (plugin.status && !this._scripts.contains(plugin.name)) {
                this.setParameters(plugin.name, {});
                this.loadScript(plugin.name + '.js', path);
                this._scripts.push(plugin.name);
            }
        }, this);
    };

    PluginManager.loadScript = function (name, path) {
        var url = path + name;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = false;
        script.onerror = this.onError.bind(this);
        script._url = url;
        document.body.appendChild(script);
    };

    PluginManager.setup(window["mods"], "js/mods/");

};


Game_Message.prototype.debug = function (str) {
    //var span = document.getElementById('debug');
    //span.innerText = str;
}

Game_Message.prototype.debugKeys = function (str) {
    var span = document.getElementById('debug');
    if (str === false) return ""
    //span.innerText = Object.keys(str).join('\n');
}



Game_Message.prototype.debugKeysA = function (str) {
    var span = document.getElementById('debug');
    //span.innerText += Object.keys(str).join('\n');
}

Game_Message.prototype.debugAppend = function (str) {
    var span = document.getElementById('debug');
    //span.innerText += str;
}

//#region 
window.onkeydown = function (e) {
    $gameMessage.debug(Object.keys($gameSystem).join("\n"))
    $gameParty.gainGold(10000)

    if (window.getListenForKey() === false) return;
    window.setKey(e.keyCode)
}

window.message = function (e) {
    $gameMessage.add(e)
}

window.choice = function (message, choice) {
    $gameMessage.setChoices(["1", "2", "3"])
    this.message(message)
}
window.setListenForKey = function (can) {
    window["keyListen"] = can
}
window.getListenForKey = function () {
    return window["keyListen"]
}

//#region Key stuff
window.getKey = function (key) {
    if (!this[window.genKey(key)])
        this[window.genKey(key)] = false

    return this[window.genKey(key)]
}

window.setKey = function (key) {


    if (this.getKey(key)) {
        this[window.genKey(key)] = !this[window.genKey(key)]
    } else {
        this[window.genKey(key)] = true
    }

}

window.genKey = function (key) { return ['key', key].join('-') }

//#endregion