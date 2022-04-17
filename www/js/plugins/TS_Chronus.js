//=========================================================
// Chronus
//=========================================================

/*:ja
 * @plugindesc
 * 「Chronus.js」の一部を変更
 * 日付の表示が月に影響しないようにする（31日以上の表示）
 */


Game_Chronus.prototype.getDay = function () {
	if (this.isRealTime()) return this._nowDate.getDate();
	var days = this._dayMeter + 1;
	if(days > 99) days = 99
	return days;
};
