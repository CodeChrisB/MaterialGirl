Game_Party.prototype.setItemMax = function(item) {
    var container = this.itemContainer(item);
    if (container) {
        var newNumber =  this.maxItems(item);
        container[item.id] = newNumber.clamp(0, this.maxItems(item));
        if (container[item.id] === 0) {
            delete container[item.id];
        }
        if (true && newNumber < 0) {
            this.discardMembersEquip(item, -newNumber);
        }
        $gameMap.requestRefresh();
    }
};