
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = [window["gameplus"] ? "g+" : "","RPGMV"].join('')
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
    return info;
};


DataManager.loadGameWithoutRescue = function(savefileId) {
    var globalInfo = this.loadGlobalInfo();
    window.gameplus = globalInfo[savefileId].globalId.includes("g+")
    if (this.isThisGameFile(savefileId)) {
        var json = StorageManager.load(savefileId);
        
        this.createGameObjects();
        this.extractSaveContents(JsonEx.parse(json));
        this._lastAccessedId = savefileId;
        return true;
    } else {
        return false;
    }
};

