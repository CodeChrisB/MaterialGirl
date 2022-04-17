//=========================================================
// TS_Decode
//=========================================================

/*:ja
 * @plugindesc
 * シナリオファイルデコード
 */


/*:
*/

var argTsDecodeDebug = false;

(function() {

	
	var argTsDecodeKey = 255;

	var argLanguagePath = [
		'Ja/',
		'En/',
		'Ch/',
	]

	// シナリオファイル再生開始
	/*
	ADV_System.prototype.fileLoad = function(filename) {
		var fs = require('fs');
		var filepath = this.localFileDirectoryPath()+filename+TS_Function.getScenarioExtension();
		var file_data = fs.readFileSync(filepath, 'utf-8');
		
		// エンコードを行うか判定
		if(!$gameTemp.isPlaytest() || argTsDecodeDebug){
			var text_ary = file_data.split('');
			for (var i = 0; i < text_ary.length; i++) {
				//text_ary[i] = text_ary[i] ^ argTsDecodeKey;
				text_ary[i] = String.fromCharCode(text_ary[i].charCodeAt(0) ^ argTsDecodeKey);
			}
			
			file_data = text_ary.join('');
		}
		
		return file_data;
	}
	*/
	
	// シナリオファイル再生開始
	// ※言語切り替え用
	ADV_System.prototype.fileLoad = function(filename) {
		var lang_val = $gameVariables.value(TS_GameConfig.LanguageVal);
		var fs = require('fs');
		var filepath = this.localFileDirectoryPath()+ argLanguagePath[lang_val] + filename+TS_Function.getScenarioExtension();
		//var filepath = this.localFileDirectoryPath()+ argLanguagePath[lang_val] + filename+'.txt';
		var file_data = fs.readFileSync(filepath, 'utf-8');
		
		// エンコードを行うか判定
		if(!$gameTemp.isPlaytest() || argTsDecodeDebug){
			var text_ary = file_data.split('');
			for (var i = 0; i < text_ary.length; i++) {
				text_ary[i] = String.fromCharCode(text_ary[i].charCodeAt(0) ^ argTsDecodeKey);
			}
			
			file_data = text_ary.join('');
		}
		
		return file_data;
	}


})();


