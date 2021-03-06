window.onkeydown = function (e) {
    $gameMessage.debug(Object.keys($gameSystem).join("\n"))

    if (window.getListenForKey() === false || window.gameplus) return;
    window.setKey(e.keyCode)
}

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