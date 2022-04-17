//=========================================================
// TS_ConfigAnimation
//=========================================================

/*:ja
 * @plugindesc
 * アニメーションの再生ON/OFFの設定
 */



//---------------------------------
// ConfigManagerの変更
//---------------------------------

// 初期値
var defaultAnimationView = true; 

// ○値初期化
var _TS_ConfigAnimation_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function(config) {
	var config = _TS_ConfigAnimation_ConfigManager_makeData.apply(this, arguments);
	config.animationView = this.animationView;
	return config;
};

// ○値追加
var _TS_ConfigAnimation_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	_TS_ConfigAnimation_ConfigManager_applyData.apply(this, arguments);
	if (config.animationView == null) config.animationView = defaultAnimationView;
	this.animationView = this.readFlag(config, 'animationView');
};

//=============================================================================
// Window_Options
//=============================================================================

//  オプションに項目を追加。
var _TS_ConfigAnimation_Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	_TS_ConfigAnimation_Window_Options_addGeneralOptions.apply(this, arguments);
	this.addCommand(TS_Function.getLanguage('Animation'), 'animationView');
};

// ●アニメーションをさせるか判定
ADV_System.prototype.isAnimation = function() {
	return ConfigManager.animationView;
};
