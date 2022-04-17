//=========================================================
// SelfSwitchOperation
//=========================================================

/*:ja
 * @plugindesc
 * プラグインコマンド「SaleSwitchReset」を追加
 * セルフスイッチの情報を全削除
 */


/*:
 
*/

(function() {
	
	//****************************************************************************
	// セルフスイッチ
	//****************************************************************************
	
	
	// セルフスイッチのリセット
	TS_AllSelfSwitch = function() {
		$gameSelfSwitches.clear();
	}
	

	
	// ○プラグインコマンド拡張
	var _TS_SelfSwitchOperation_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_TS_SelfSwitchOperation_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'SaleSwitchReset') {
			TS_AllSelfSwitch();
		}
	};
	
})();
