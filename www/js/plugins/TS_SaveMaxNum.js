//=============================================================================
// SaveMaxNum
//=============================================================================

/*:
 * @plugindesc セーブデータの最大数を変更します
 *
 *
 * @param FileNum
 * @desc セーブファイルの個数
 * 初期値: 50
 * @default 50
 *
 * @help
 * 使い方:
 *   セーブファイルの最大個数を指定して下さい。
 *
 * 
 */

var Imported = Imported || {};
Imported.TMStatusMenuEx = true;

(function() {
	
	// 引数
	var parameters = PluginManager.parameters('SaveMaxNum');
	var argFileNum = parseInt(parameters['FileNum'] || '50');
	
	DataManager.maxSavefiles = function() {
		return argFileNum;
	};
	
})();
