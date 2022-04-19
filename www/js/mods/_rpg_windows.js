Window_GameEnd.prototype.makeCommandList = function() {
    //HEADER
    this.addCommand("[---Cheat Menu ("+(window["CommandWindowIndex"]+1)+"/"+(window["CommandWindowMaxIndex"]+1)+")---]","next");
    //PAGE 1
    if(window["CommandWindowIndex"] ===0){
        this.addCommand(["Current Map Id :",window["mapId"]].join(' '));
        this.addCommand(this.createCommandLabel("WallClip" ,"F12",window.getKey("123")), 'wallClip');
        this.addCommand(this.createCommandLabel("Speedhack" ,"F11",window.getKey("122")), 'speed');
        this.addCommand(this.createCustomCommandLabel("Add Day" ,"F10","Day",$gameSystem.chronus()._dayMeter), 'addDay');
        this.addCommand(this.createCustomCommandLabel("Sub Day" ,"F9","Day",$gameSystem.chronus()._dayMeter), 'removeDay');
        this.addCommand(this.createCustomCommandLabel("Add Hour" ,"+1:00","Day",Math.floor($gameSystem.chronus()._timeMeter/60)+":"+($gameSystem.chronus()._timeMeter%60).padZero(2)), 'addHour');
        this.addCommand(this.createCustomCommandLabel("Sub Hour" ,"-1:00","Day",Math.floor($gameSystem.chronus()._timeMeter/60)+":"+($gameSystem.chronus()._timeMeter%60).padZero(2)), 'decreaseHour');
        this.addCommand(this.createCustomCommandLabel("1.000.000 Yen",null,null),"addGold");
    } 
    else if(window["CommandWindowIndex"] ===1){
        this.addCommand(this.createCustomCommandLabel("Unlock All",null,null),"unlockAll");
        this.addCommand(this.createCustomCommandLabel("Max Stats","Todo",null),"maxStats");
        this.addCommand(this.createCustomCommandLabel("Lewdness Level","Todo",null),"lewdness");
        this.addCommand(this.createCustomCommandLabel("Blow Job Level","Todo",null),"blowjob");
        this.addCommand(this.createCustomCommandLabel("Titty Fuck Level","Todo",null),"titty");
        this.addCommand(this.createCustomCommandLabel("Vagina Level","Todo",null),"vagina");
        this.addCommand(this.createCustomCommandLabel("Lazy Days Reset","Todo",null),"lazy");
        this.addCommand(this.createCustomCommandLabel("Idk yet","Todo",null),"idk");
    }
    //FOOTER
    //NAVIGATOR
    this.addCommand("[------Next Page------]","next");
};


Window_GameEnd.prototype.createCommandLabel = function(name,key,active) {
    return [
        name,
        ["[",key,"]"].join(''),
        active ? 'ON' : 'OFF'
    ].join(' ')

};

Window_GameEnd.prototype.createCustomCommandLabel = function(name,key,valueName,value) {
    return [
        name,
        key ? ["[",key,"]"].join('') :"",
        valueName ? ["[",valueName," ",value,"]"].join('') : ""
    ].join(' ')
};