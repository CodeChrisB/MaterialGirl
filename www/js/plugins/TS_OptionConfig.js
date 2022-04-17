//=========================================================
// OptionConfig
//=========================================================

/*:ja
 * @plugindesc
 * ウィンドウの透過度を設定可能にする
 */

/*:
 * @param Window Opacity
 * @desc オプションで表示する名前：ウィンドウ透過度
 * @default ウィンドウ透過度
*/

(function() {
	
	// 引数
	var parameters = PluginManager.parameters('OptionConfig');
	var argWindowOpacity = String(parameters['Window Opacity'] || 'ウィンドウ透過度');
	
	//****************************************************************************
	// オプション設定拡張
	//****************************************************************************
	
	//---------------------------------
	// ConfigManagerの変更
	//---------------------------------
	
	ConfigManager.SymbolSpecialVal = {};
	
	// ○コマンドを自由に追加できるようにする
	var _TS_OptionConf_ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		var config = _TS_OptionConf_ConfigManager_makeData.call(this);
		config = this.addConfigData(config);
		return config;
	};
	
	// △ここに追加したいオプションを入れる
	ConfigManager.addConfigData = function(config) {
		return config;
	};
	
	// △透過度用
	ConfigManager.readOpacity = function(config, name) {
	var value = config[name];
		if (value !== undefined) {
			return Number(value).clamp(0, 255);
		} else {
			return 255;
		}
	};
	
	//---------------------------------
	// Window_Optionsの変更
	//---------------------------------
	// ●（書き換え） 音量の名前を変更
	/*
	Window_Options.prototype.addVolumeOptions = function() {
		this.addCommand(TextManager.bgmVolume, 'bgmVolume');
		this.addCommand(TextManager.bgsVolume, 'bgsVolume');
		this.addCommand(TextManager.meVolume, 'meVolume');
		this.addCommand(TextManager.seVolume + ' ボイス音量', 'seVolume');
	};
	*/
	
	// ○コマンドを自由に追加できるようにする
	var _TS_OptionConf_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
	Window_Options.prototype.makeCommandList = function() {
		_TS_OptionConf_Window_Options_makeCommandList.call(this);
		this.addOptionCommand();
	};
	
	// △ここに追加したいオプションを入れる
	Window_Options.prototype.addOptionCommand = function() {
	};
	
	// ●（書き換え） オプションの形式変更
	Window_Options.prototype.statusText = function(index) {
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if ( this.isVolumeSymbol(symbol) ) {
			// %系の表示（20%区切り）
			return this.volumeStatusText(value);
		} else if(this.isOpacitySymbol(symbol)) {
			// %系の表示（5%区切り）
			return this.opacityStatusText(value);
		} else {
			// ON・OFFの表示
			return this.booleanStatusText(value);
		}
	};
	
	// △透過度の判定
	Window_Options.prototype.isOpacitySymbol = function(symbol) {
		return symbol.contains('Opacity');
	};
	
	Window_Options.prototype.isSymbolCheck = function(symbol) {
		return ConfigManager.SymbolSpecialVal[symbol] !== undefined;
	};
	
	// △透過度の添字
	Window_Options.prototype.opacityStatusText = function(value) {
		return value + '%';
	};
	
	// △透過度の増減値
	Window_Options.prototype.opacityOffset = function() {
		return 5;
	};
	
	// ●（書き換え）音声の増減値
	Window_Options.prototype.volumeOffset = function() {
		return 5;
	};
	
	// ●（書き換え） オプション系統の追加
	var _TS_OptionConf_Window_Options_processOk = Window_Options.prototype.processOk;
	Window_Options.prototype.processOk = function() {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			value += this.volumeOffset();
			if (value > 100) {
				value = 0;
			}
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if(this.isOpacitySymbol(symbol)) {
			value += this.opacityOffset();
			if (value > 100) {
				value = 0;
			}
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if(this.isSymbolCheck(symbol)) {
			value += 1;
			if (value > ConfigManager.SymbolSpecialVal[symbol]) {
				value = 1;
			}
			this.changeValue(symbol, value);
		} else {
			_TS_OptionConf_Window_Options_processOk.apply(this,arguments);
		}
	};
	
	// ●（書き換え） オプション系統の追加
	Window_Options.prototype.cursorRight = function(wrap) {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			value += this.volumeOffset();
			if (value > 100) {
				value = 0;
			}
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if(this.isOpacitySymbol(symbol)) {
			value += this.opacityOffset();
			if (value > 100) {
				value = 0;
			}
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if(this.isSymbolCheck(symbol)) {
			value += 1;
			if (value > ConfigManager.SymbolSpecialVal[symbol]) {
				value = 1;
			}
			this.changeValue(symbol, value);
		} else {
			this.changeValue(symbol, true);
		}
	};
	
	// ●（書き換え） オプション系統の追加
	Window_Options.prototype.cursorLeft = function(wrap) {
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			value -= this.volumeOffset();
			if (value < 0) {
				value = 100;
			}
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if(this.isOpacitySymbol(symbol)) {
			value -= this.opacityOffset();
			if (value < 0) {
				value = 100;
			}
			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else if(this.isSymbolCheck(symbol)) {
			value -= 1;
			if (value < 1) {
				value = ConfigManager.SymbolSpecialVal[symbol];
			}
			this.changeValue(symbol, value);
		} else {
			this.changeValue(symbol, false);
		}
	};
	
	// ●（書き換え）実際の値と表示の値のズレを修正
	Window_Options.prototype.getConfigValue = function(symbol) {
		if(this.isOpacitySymbol(symbol)) {
			// 透過度
			//return parseInt(100 * ConfigManager[symbol] / 255);
			return parseInt(ConfigManager[symbol]/12.75) * 5;
		} else {
			return ConfigManager[symbol];
		}
	};
	
	// ●（書き換え）実際の値と表示の値のズレを修正
	Window_Options.prototype.setConfigValue = function(symbol, volume) {
		if(this.isOpacitySymbol(symbol)) {
			ConfigManager[symbol] = Math.ceil( 255 * volume / 100 );
		} else {
			ConfigManager[symbol] = volume;
		}
	};
	
	//****************************************************************************
	// ウィンドウ透過度追加
	//****************************************************************************
	
	// ○透過度追加
	/*
	var _TS_OptionWinOpacity_Window_Options_addOptionCommand = Window_Options.prototype.addOptionCommand;
	Window_Options.prototype.addOptionCommand = function() {
		_TS_OptionWinOpacity_Window_Options_addOptionCommand.call(this);
		this.addCommand(argWindowOpacity, 'windowOpacity');
	};
	*/
	
	// ●（書き換え） 値を影響させる
	Window_Base.prototype.standardBackOpacity = function() {
		return ConfigManager['windowOpacity'];
	};
	
	//---------------------------------
	// ConfigManagerの変更
	//---------------------------------
	
	// 初期値
	ConfigManager.windowOpacity = 255; 
	
	// ○透過度追加
	var _TS_OptionWinOpacity_ConfigManager_addConfigData = ConfigManager.addConfigData;
	ConfigManager.addConfigData = function(config) {
		config.windowOpacity = this.windowOpacity;
		return config;
	};
	
	// ○透過度追加
	var _TS_OptionWinOpacity_ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		_TS_OptionWinOpacity_ConfigManager_applyData.call(this, config);
		this.windowOpacity = this.readOpacity(config, 'windowOpacity');
	};
	
	
	
})();
