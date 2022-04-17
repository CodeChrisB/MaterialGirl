//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
    window["maps"] = ["007","021","035","120","008","022","036","121","009","023","037","122","010","024","038","143","011","025","039","146","012","026","040","013","027","041","014","028","042","001","015","029","043","002","016","030","044","003","017","031","045","004","018","032","046","005","019","033","047","006","020","034","119"]
    window["mapIndex"] = 0

};


window.onkeydown = function(e) { 
    $gameMessage.cheatMenu()
    window.choice("test",[])
    window.setKey(e.keyCode)
}

window.message= function(e){
    $gameMessage.add(e)
}

window.choice = function(message,choice){
    $gameMessage.setChoices(["1","2","3"])
    this.message(message)
}


//#region Key stuff
window.getKey = function(key){ 
    if(!this[window.genKey(key)])
        this[window.genKey(key)] = false

    return this[window.genKey(key)]
}

window.setKey = function(key){

    if(this.getKey(key)){
        this[window.genKey(key)] = !this[window.genKey(key)]
    }else{
        this[window.genKey(key)] = true
    }

}

window.genKey = function(key){ return ['key',key].join('-') }

//#endregion