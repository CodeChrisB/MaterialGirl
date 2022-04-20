(function () {

    //****************************************************************************
    // Cheat Menu
    //****************************************************************************

    //add day $gameSystem.chronus().addDay(1);



    Game_Message.prototype.cheatMenu = function () {
        //$gameSystem.setMessagePopup(3);
    };


    //****************************************************************************
    // Other stuff todo move somewhere else
    //****************************************************************************

    Game_Message.prototype.debug = function (str) {
        //var span = document.getElementById('debug');
        //span.innerText = str;
    }

    Game_Message.prototype.debugKeys = function (str) {
        var span = document.getElementById('debug');
        if(str === false) return ""
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


    window.message = function (e) {
        $gameMessage.add(e)
    }

    window.choice = function (message, choice) {
        $gameMessage.setChoices(["1", "2", "3"])
        this.message(message)
    }
    window.setListenForKey = function(can){
        window["keyListen"]=can
    }
    window.getListenForKey = function(){
       return window["keyListen"]
    }

})();


//****************************************************************************
// Make Debugging easier
//****************************************************************************


Window_Base.prototype.processCharacter = function(textState) {
    switch (textState.text[textState.index]) {
    case '\n':
        this.processNewLine(textState);
        break;
    case '\f':
        this.processNewPage(textState);
        break;
    case '\x1b':
        this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
        break;
    default:
        this.processNormalCharacter(textState);
        break;
    }
};

RTK.log = function(_v, _o) {};