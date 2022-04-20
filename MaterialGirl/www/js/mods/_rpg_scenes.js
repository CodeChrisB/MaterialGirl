Scene_GameEnd.prototype.CommandWindowIndex=0;
Scene_GameEnd.prototype.CommandWindowMaxIndex=1;

Scene_GameEnd.prototype.createCommandWindow = function() {
    window.setListenForKey(false)
    this._commandWindow = new Window_GameEnd();
    if(this.CommandWindowIndex === 0){
        this._commandWindow.setHandler('toTitle',  this.commandToTitle.bind(this));
        this._commandWindow.setHandler('wallClip',  this.wallClip.bind(this));
        this._commandWindow.setHandler('speed',  this.speedHack.bind(this));
        this._commandWindow.setHandler('addDay',  this.AddDay.bind(this));
        this._commandWindow.setHandler('removeDay',  this.RemoveDay.bind(this));
        this._commandWindow.setHandler('addHour',  this.AddHour.bind(this));
        this._commandWindow.setHandler('decreaseHour',  this.DecreaseHour.bind(this));
        this._commandWindow.setHandler('addGold',  this.AddMillion.bind(this));
        this._commandWindow.setHandler('cancel',   this.close.bind(this));
        this._commandWindow.setHandler('next',   this.close.bind(this));
        this._commandWindow.setHandler('unlockAll',  this.UnlockAll.bind(this));
        this._commandWindow.setHandler('maxStats',  this.MaxStats.bind(this));
        this._commandWindow.setHandler('next',   this.Next.bind(this));
    }
    this.addWindow(this._commandWindow);
};

Scene_GameEnd.prototype.Next = function() {
    window["CommandWindowIndex"]++
    if(window["CommandWindowIndex"]>window["CommandWindowMaxIndex"])
        window["CommandWindowIndex"] =0
    this.stop()
    this.createCommandWindow()
};

Scene_GameEnd.prototype.MaxStats = function() {
    //virgin maybe new cheat for that one
    $gameSwitches.setValue(TS_GameConfig.argVirginSwi, false);
    //lot of money
    $gameParty._gold = 99999999
    //no lazy days
    $gameVariables.setValue(37,0)
    //max lewdness
    $gameActors.actor(1).addLewd(1000)
    //max popularity
    //max bj
    //max titty fuck
        //$gameActors.actor(1).addPoly(1000);
        //$gameActors.actor(1).maxParam();
    //max vagina
        //$gameVariables.setValue(TS_GameConfig.SexNumVal, 10000);
    this.stop()
    this.createCommandWindow()
};

Scene_GameEnd.prototype.UnlockAll = function() {
    //give 99 of every f*ing item
    var items = $dataItems
    var i=0;
    for(i;i<items.length;i++){
        if(items[i] !== null && items[i]["description"] !== "")
            $gameParty.setItemMax(items[i])
    }
    
    //unlock all armors aka clothing
    $gameParty._armors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

    //unlock all workplaces
    var array = TS_GameConfig.WorkList;
    for(var i=0; i<array.length; i++){
        var work = array[i];
        $gameActors.actor(1)._mWork[work] = true;
    }
    //todo check if activated more than once so that more than one message will be displayed
    $gameMessage.add("Everything Unlocked !")
    this.stop()
    this.createCommandWindow()
};

Scene_GameEnd.prototype.AddMillion = function() {
    $gameParty._gold = 1000000
    this.stop()
    this.createCommandWindow()
};
    
Scene_GameEnd.prototype.AddHour = function() {
    $gameSystem.chronus().addTime(60)
    this.stop()
    this.createCommandWindow()
};

Scene_GameEnd.prototype.DecreaseHour = function() {
    $gameSystem.chronus().addTime(-60)
    this.stop()
    this.createCommandWindow()
};

Scene_GameEnd.prototype.commandToTitle = function() {
    this.fadeOutAll();
    window.setListenForKey(true)
    SceneManager.goto(Scene_Title);
    this.stop()
};

Scene_GameEnd.prototype.close = function() {
    window.setListenForKey(true)
    this.stop()
    this.popScene()
};


Scene_GameEnd.prototype.wallClip = function() {
    window.setKey("123")
    this.stop()
    this.createCommandWindow()
};

Scene_GameEnd.prototype.speedHack = function() {
    window.setKey("122")
    this.stop()
    this.createCommandWindow()
};

Scene_GameEnd.prototype.AddDay = function() {
    $gameSystem.chronus().addDay(1);
    this.stop()
    this.createCommandWindow()
};
Scene_GameEnd.prototype.RemoveDay = function() {
    if($gameSystem.chronus()._dayMeter>=2){
        $gameSystem.chronus().addDay(-1);
    }
    this.stop()
    this.createCommandWindow()
};
