//=========================================================
// CommonSave
//=========================================================

/*:ja
 * @plugindesc
 * 共通セーブファイル追加
 */

/*:
 * @param File Name
 * @desc セーブファイル名
 * @default common
 
 * @help
 *
 * プラグインコマンド:
 *   CommonSave 1 100       : [1]に100の値を入れる
 *   CommonSave flag01 true : [flag01]をtrueにする
 *
 * 読み込みはスクリプトで行う
 * 「$CommonSave.check(id)」  : idの値を受け取る（true/false）
 * 「$CommonSave.get_num(id)」: idの値を受け取る（数値型）
 *
*/
(function() {
	
	// 引数
	var parameters = PluginManager.parameters('CommonSave');
	var argFileName = String(parameters['File Name'] || 'common');
	
	// 共通セーブデータ管理クラス
	function CommonSave() {
		this.initialize.apply(this, arguments);
	}
	
	CommonSave.prototype.initialize = function() {
		this.load();
	};
	
	
	// true or false のチェック
	CommonSave.prototype.check = function(id) {
		return this._mData[id] == null ? false : this._mData[id];
	};
	
	// true or false のセット
	CommonSave.prototype.set = function(id, flag) {
		if( this._mData[id] != flag ){
			this._mData[id] = flag;
			this.save();
		}
	};
	
	// 数値のチェック
	CommonSave.prototype.get_num = function(id) {
		return this._mData[id] == null ? -1 : this._mData[id];
	};
	
	// 数値のセット
	CommonSave.prototype.set_num = function(id, num) {
		if( this._mData[id] != num ){
			this._mData[id] = num;
			this.save();
		}
	};
	
	// ファイルにセーブ
	CommonSave.prototype.save = function() {
		var json = JSON.stringify(this._mData);
		var data = LZString.compressToBase64(json);
		var fs = require('fs');
		var dirPath = StorageManager.localFileDirectoryPath();
		var filePath = this.localFilePath();
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath);
		}
		fs.writeFileSync(filePath, data);
	};
	
	// ファイルからロード
	CommonSave.prototype.load = function() {
		try {
			var data = null;
			var fs = require('fs');
			var filePath = this.localFilePath();
			if (fs.existsSync(filePath)) {
				data = fs.readFileSync(filePath, { encoding: 'utf8' });
			}
			json = LZString.decompressFromBase64(data);
		} catch(e) {
			console.error(e);
		}
		if (json) {
			this._mData = JSON.parse(json);
		}else{
			this._mData = {};
		}
	};
	
	// パス
	CommonSave.prototype.localFilePath = function() {
		return StorageManager.localFileDirectoryPath() + argFileName + '.rpgsave';
	};
	
	// ○プラグインコマンド拡張
	var _TS_CommonSave_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_TS_CommonSave_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'CommonSave') {
			var id = (args[0] || '').trim();
			var data = (args[1] || '').trim();
			if( data == 'true' || data == 'false' ){
				$CommonSave.set(id,data == 'true');
			}else{
				$CommonSave.set_num(id,parseInt(data));
			}
			
		}
	};
	
	// ○データに登録
	var _TS_CommonSave_DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		_TS_CommonSave_DataManager_createGameObjects.call(this);
		$CommonSave = new CommonSave();
	};
})();
