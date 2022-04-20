DataManager.extractSaveContents = function(contents) {
    $gameSystem        = contents.system;
    $gameScreen        = contents.screen;
    $gameTimer         = contents.timer;
    $gameSwitches      = contents.switches;
    $gameVariables     = contents.variables;
    $gameSelfSwitches  = contents.selfSwitches;
    $gameActors        = contents.actors;
    $gameParty         = contents.party;
    $gameMap           = contents.map;
    $gamePlayer        = contents.player;
    $gameMessage.add("\\. Mod Created by CCB")
    if(window["gameplus"]){
        $gameMessage.add("\\. New Game+")
    }

    require('nw.gui').Window.get().showDevTools();
};