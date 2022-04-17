//=========================================================
// TS_CostumeChange
//=========================================================

/*:ja
 * @plugindesc
 * 着替え時の処理
 */


/*:
*/

var TS_CostumeChange = TS_CostumeChange || {};

// 選択中の服
TS_CostumeChange.SelectCostume = 23;


// 画像ID
// 01～10：UI
// 11～20：マウスエフェクト
// 21～40：ハートUI
// 41～50：吹き出し文字

TS_CostumeChange.BodyPictId = 1;
TS_CostumeChange.FacePictId = 2;

TS_CostumeChange.CosList = [
	'私服',
	'制服',
	'体操着',
	'パン屋制服',
	'コンビニ制服',
	'バニー',
	'ゴージャス',
	'下着',
	'裸',
];

TS_CostumeChange.CosPictId = {
	'私服'         : {'pict_id':11,'swi_id':51,'db_id':2,},
	'制服'         : {'pict_id':12,'swi_id':52,'db_id':3,},
	'体操着'       : {'pict_id':13,'swi_id':53,'db_id':6,},
	'パン屋制服'   : {'pict_id':14,'swi_id':54,'db_id':5,},
	'コンビニ制服' : {'pict_id':15,'swi_id':55,'db_id':7,},
	'バニー'       : {'pict_id':16,'swi_id':56,'db_id':8,},
	'ゴージャス'   : {'pict_id':17,'swi_id':57,'db_id':9,},
	'下着'         : {'pict_id':18,'swi_id':58,'db_id':10,},
	'裸'           : {'pict_id':19,'swi_id':59,'db_id':12,},
};

TS_CostumeChange.CosViewList = null;


// 初期化
TS_CostumeChange.init = function() {
	
	// 透過度0で画像を表示する
	
	
	// 服装はスクリプトで表示する
	var hair_name = TS_Function.getActor(TS_GameConfig.HeroineName).getHairName();
	var cos_name = $advSystem.getBodyCos(TS_GameConfig.HeroineName,false);
	var body_name = TS_GameConfig.HeroineName + '_' + cos_name + hair_name;
	var face_name = TS_GameConfig.HeroineName + '@' + '無表情' + hair_name;
	
	$gameScreen.showPicture(this.BodyPictId, body_name, 0, 0, 0, 100, 100, 0, 0);
	$gameScreen.showPicture(this.FacePictId, face_name, 0, 0, 0, 100, 100, 0, 0);
	
	// 服装リスト
	var f_name = 'CC_';
	var hash = TS_CostumeChange.CosPictId;
	for(key in hash){
		var data = hash[key];
		var pict_id = data.pict_id;
		var db_id = data.db_id;
		var b_name = 'no';
		if( $gameParty.hasItem($dataArmors[db_id], true) ){
			// アイテムを所持している
			b_name = key;
			// ここでは装備できない
			if( this.CosViewList && this.CosViewList.indexOf(b_name) == -1 ){
				b_name += '_non';
			}else{
				// ボタン機能追加
				$gameScreen.setPictureCallCommon(pict_id, data.swi_id * -1, 1);
			}
		}
		// ピクチャ表示（中心座標）
		$gameScreen.showPicture(pict_id, (f_name + b_name), 1, 0, 0, 100, 100, 0, 0);
		
	}
	
};

// 終了
TS_CostumeChange.selectClick = function() {
	// 選択中の服装ID
	var id = $gameVariables.value(this.SelectCostume);
	var cos_name = this.CosList[id];
	var cos_data = TS_CostumeChange.CosPictId[cos_name];
	var check = false;
	
	if( $gameParty.hasItem($dataArmors[cos_data.db_id], true) ){
		// ここでは装備できない
		if( !(this.CosViewList && this.CosViewList.indexOf(cos_name) == -1) ){
			check = true;
		}
	}
	
	if(check){
		$gameSwitches.setValue(cos_data.swi_id, true);
	}
}

// 終了
TS_CostumeChange.end = function() {
	// ピクチャ削除
	for(var i=0; i<25;i++){
		$gameScreen.erasePicture(i+1);
	}
}

// 立ち絵の服装を今の装備に合わせる
TS_CostumeChange.cosCheck = function() {
	
	var hair_name = TS_Function.getActor(TS_GameConfig.HeroineName).getHairName();
	var cos_name = $advSystem.getBodyCos(TS_GameConfig.HeroineName,false);
	var body_name = TS_GameConfig.HeroineName + '_' + cos_name + hair_name;
	$gameScreen.picture(this.BodyPictId).setName(body_name);
	
};




// 今から装着出来るリスト
TS_CostumeChange.setCos = function(list) {
	
	if(list == 'ALL'){
		TS_CostumeChange.CosViewList = null;
	}else{
		TS_CostumeChange.CosViewList = list.split('_');
	}
};

// ○プラグインコマンド拡張
var _TS_CostumeChange_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	_TS_CostumeChange_Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'COS_CHANGE') {
		TS_CostumeChange.setCos(args[0]);
	}
};
