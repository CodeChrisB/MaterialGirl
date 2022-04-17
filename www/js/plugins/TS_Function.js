//=========================================================
// Function
//=========================================================

/*:ja
 * @plugindesc
 * 関数群
 */

//******************************************************************************
// デフォルト機能拡張

// 文字列に挿入
String.prototype.splice = function(idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

//******************************************************************************


var TS_Function = {};

// 翻訳用
TS_Function.getLanguage = function(type){
	var output = TS_Localize.LanguageList[type][ConfigManager.langSelect];
	return output;
};


// 翻訳用
TS_Function.getLanguageNameAdd = function(){
	var list = ['','_en','_ch']
	var output = list[ConfigManager.langSelect];
	return output;
};

// 翻訳用
TS_Function.changeLanguage = function(name){
	if(ConfigManager.langSelect == 0) return name;
	if(!TS_Localize.ChangeList[name]) return name;
	var output = TS_Localize.ChangeList[name][ConfigManager.langSelect-1];
	return output;
};

// パーティのインデックスを取得
Game_Party.prototype.GetMembersIndex = function(name) {
	var index = -1;
	var list = $gameParty.battleMembersAll();
	for (var i = 0; i < list.length; i++) {
		if(name == list[i].name()){
			index = i;
			break;
		}
	}
	return index;
};


// シナリオの拡張子取得
TS_Function.getScenarioExtension = function(){
	
	var output = '.txt';
	
	// エンコードを行うか判定
	if(!$gameTemp.isPlaytest() || argTsDecodeDebug){
		output = '.sl';
	}
	
	return output;
};


// ○画像動作後に関数呼び出し
var _TS_Function_Game_Picture_updateMove = Game_Picture.prototype.updateMove;
Game_Picture.prototype.updateMove = function() {
	var move = this._duration > 0 ? true : false;
	_TS_Function_Game_Picture_updateMove.call(this);
	if( this.mAfterFunk != undefined && move && this._duration == 0 ){
		// このタイミングで処理が終わった
		this.mAfterFunk = this.mAfterFunk(this);
	}
};

// 名前からアクター取得
TS_Function.getActor = function(name){
	var output;
	$gameParty.members().forEach( function(data){
		if( data._name == name ){
			output = data;
			return ;
		}
	} );
	
	return output;
};

// 最小と最大の間の乱数を取得
TS_Function.rand = function(min,max){
	return Math.randomInt( (max-min+1) ) + min;
};

// 配列をシャッフル
TS_Function.shuffleArray = function(array){
	for(var i = array.length - 1; i > 0; i--){
		var r = Math.floor(Math.random() * (i + 1));
		var tmp = array[i];
		array[i] = array[r];
		array[r] = tmp;
	}
	return array;
};
// 配列をシャッフル
TS_Function.getRandomArray = function(array){
	var output = null;
	array = this.shuffleArray(array);
	output = array[0];
	return output;
};

// リストからどこの値にいるかチェック
TS_Function.lineCheckArray = function(array,val){
	var output = null;
	for(var i=0, length=array.length; i<length; i++){
		var line = array[i];
		if( val <= line ){
			output = i;
			break;
		}
	}
	return output;
};



// 所持金確認
TS_Function.moneyCheck = function(money){
	return $gameParty.gold() >= money;
};


// 数字画像を表示
TS_Function.viewNumber = function(contents,num,x,y,num_bitmap,id,split,dot_bitmap,align){
	
	// デフォルト1
	id = id || 1;
	// デフォルト右詰め
	align = align || -1
	
	// ドット画像表示
	var dot_cnt = null;
	if(dot_bitmap){
		var dot_w = dot_bitmap.width;
		var dot_h = dot_bitmap.height / split;
		var dot_sy = dot_h * (id-1);
		
	}
	
	var num_x = x;
	var num_y = y;
	var num_val = num.toString();
	var num_w = num_bitmap.width / 10;
	var num_h = num_bitmap.height / split;
	var num_sy = num_h * (id-1);
	
	num_x -= (num_w * align);
	for (var i = num_val.length; i > 0; i--) {
		var id = i-1;
		var n = Number(num_val[id]);
		
		if(dot_bitmap){
			if(dot_cnt > 0 && dot_cnt % 3 == 0){
				num_x += dot_w * align;
				contents.blt(dot_bitmap, 0, dot_sy, dot_w, dot_h, num_x, num_y);
			}
			dot_cnt++;
		}
		num_x += num_w * align;
		contents.blt(num_bitmap, num_w * n, num_sy, num_w, num_h, num_x, num_y);
		
	}
};

// 不具合を発生させない
var _TS_Function_Bitmap_blt = Bitmap.prototype.blt;
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
	try {
		_TS_Function_Bitmap_blt.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
	} catch (e) {
		console.log(e);
	}
};


//=============================================================================
// Game_Picture
//  機能追加
//=============================================================================

// 画像変更
Game_Picture.prototype.setName = function(name){
	this._name = name;
};

// 画像のスケールをセット
Game_Picture.prototype.setScaleX = function(scale){
	this._scaleX = scale;
};

// 画像の透過度セット
Game_Picture.prototype.setOpacity = function(opacity){
	this._targetOpacity = this._opacity = opacity;
};

// 画像の透過度セット
Game_Picture.prototype.setReload = function(flag){
	this._bitmapReload = flag;
};

//=============================================================================
// Game_Picture
//  機能追加
//=============================================================================
var _TS_Function_Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
	_TS_Function_Sprite_Picture_updateBitmap.apply(this,arguments);
	var picture = this.picture();
	if (picture) {
		if(picture._bitmapReload){
			picture._bitmapReload = false;
			
			var pictureName = picture.name();
			
			this._pictureName = "";
			this.loadBitmap();
			
			this._pictureName = pictureName;
			this.loadBitmap();
		}
	}
};

//=============================================================================
// Game_Event
//  追加変数
//=============================================================================

Game_Event.prototype.setOptionVariable = function(key,value) {
	this._optionVariable = this._optionVariable || {};
	this._optionVariable[key] = value;
};

Game_Event.prototype.getOptionVariable = function(key) {
	return this._optionVariable[key];
};

Game_Event.prototype.optionVariableClear = function(key) {
	return this._optionVariable = {};
};

