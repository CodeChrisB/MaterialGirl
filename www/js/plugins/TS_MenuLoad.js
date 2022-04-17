//=========================================================
// MenuLoad
//=========================================================

/*:ja
 * @plugindesc
 * メニューにロードコマンド追加
 */


/*:
*/

(function() {
	
	
	//****************************************************************************
	// メニュー拡張
	//****************************************************************************
	
	//---------------------------------
	// ImageManagerの変更
	//---------------------------------
	
	ImageManager.loadThum = function(filename, hue) {
		return this.loadBitmap('img/thum/', filename, hue, true);
	};
	
	//---------------------------------
	// Window_MenuCommandの変更
	//---------------------------------
	
	// ○ロードコマンド追加
	var _TS_MenuLoad_Window_MenuCommand_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
	Window_MenuCommand.prototype.addSaveCommand = function() {
		_TS_MenuLoad_Window_MenuCommand_addSaveCommand.call(this);
		
		// ロード追加
		var enabled = DataManager.isAnySavefileExists();
		this.addCommand(TextManager.continue_, 'load', enabled);
	};
	
	//---------------------------------
	// Scene_Menuの変更
	//---------------------------------
	
	// ○回想モードのハンドルを読み込む
	var _TS_MenuLoad_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_TS_MenuLoad_Scene_Menu_createCommandWindow.call(this);
		// ロード追加
		this._commandWindow.setHandler('load',      this.commandLoad.bind(this));
	};
	
	// ロードシーンの呼び出し
	Scene_Menu.prototype.commandLoad = function() {
		SceneManager.push(Scene_Load);
	};
	
})();
