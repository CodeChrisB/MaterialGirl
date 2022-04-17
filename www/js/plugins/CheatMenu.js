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
        var span = document.getElementById('debug');
        span.innerText = str;
    }

    Game_Message.prototype.debugKeys = function (str) {
        var span = document.getElementById('debug');
        span.innerText = Object.keys(str).join('\n');
    }

    Game_Message.prototype.debugAppend = function (str) {
        var span = document.getElementById('debug');
        span.innerText += str;
    }


    window.onkeydown = function (e) {
        $gameMessage.debug(Object.keys($gameSystem).join("\n"))

        if(window.getListenForKey() === false) return;
            window.setKey(e.keyCode)
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

})();
