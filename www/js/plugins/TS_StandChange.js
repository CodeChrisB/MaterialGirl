//=========================================================
// StandChange
//=========================================================

/*:ja
 * @plugindesc
 * 立ち絵・ドット絵の服装を変更させる

 * @param SlotId
 * @desc 服装に影響する装備
 * @default 1
*/

(function() {
	
	// 引数
	var parameters = PluginManager.parameters('TS_StandChange');
	var argSlotId = parseInt(parameters['SlotId'] || '1');
	
	// 初期値
	var argDefaultCos = '制服';
	var argDefaultDecoration = '';
	var argDefaultHair = '';
	//var argDefaultCos = null;
	// 立ち絵切り替え用の正規表現
	var RE_COSTUME = /BODY\((.*)\)/i;
	var RE_DECORATION = /DECORATION\((.*)\)/i;
	
	// 服装に必要な淫乱度
	var CHECK_LEWD = {
		//'下着':30,
		//'裸':75,
	}
	
	
	//****************************************************************************
	// ステータス追加
	//****************************************************************************
	var _TS_StandChange_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		_TS_StandChange_Game_Actor_initMembers.call(this);
		this._mCos = argDefaultCos;	// 服装
		this._mDec = argDefaultDecoration;	// 装飾
		this._mHair = argDefaultHair;	// 髪色
	};
	
	var _TS_StandChange_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
	Game_Actor.prototype.changeEquip = function(slotId, item) {
		_TS_StandChange_Game_Actor_changeEquip.call(this, slotId, item);
		
		if (!item || item == this.equips()[slotId]) {
			
			//if( slotId != argSlotId ) return;
			
			//var new_cos = argDefaultCos;
			if( item != null ){
				var note_list = item.note.split("\n");
				for(var i=0, length=note_list.length; i<length; i++){
					var text = note_list[i];
					var type = RE_COSTUME.exec(text);
					if( type != null ){
						var new_cos = type[1];
						break;
					}
					
					var type = RE_DECORATION.exec(text);
					if( type != null ){
						var new_dec = type[1];
						break;
					}
				}
			}else{
				if(slotId == 0){
					// 装備を外した
					new_dec = '';
				}
			}
			
			
			if(new_cos != null){
				this._mCos = new_cos;
				this.changeCosSwitch();
				this.changeCos();
			}
			
			if(new_dec != null){
				this._mDec = new_dec;
				//this.changeCos();
			}
		}
	};
	
	// 特定の服装は装備できるかチェックする
	Game_Actor.prototype.checkCos = function(slotId, item) {
		
		var output = true;
		if( slotId != argSlotId ) return true;
		
		var new_cos = '';
		if( item != null ){
			var note_list = item.note.split("\n");
			for(var i=0, length=note_list.length; i<length; i++){
				var text = note_list[i];
				var type = RE_COSTUME.exec(text);
				if( type != null ){
					new_cos = type[1];
					break;
				}
			}
		}
		
		if( CHECK_LEWD[new_cos] && CHECK_LEWD[new_cos] > this._mLewd ) output = false;
		
		return output;
	};
	
	
	// 衣装に合わせたドット絵の変更
	Game_Actor.prototype.changeCos = function() {
		//var file_name = this.name() + '_' + $advSystem.getBodyCos(this._name,false,true);
		var file_name = TS_GameConfig.HeroineName + '_' + $advSystem.getBodyCos(this._name,false,true);
		
		this._characterName = TS_FileLoad.AdvPictChange(file_name + this.getHairName());
		//this._characterName = file_name;
		this._characterIndex = 0;
		
		// 顔画像の切り替え
		this._faceName = TS_FileLoad.AdvPictChange(file_name + this.getHairName());
		this.changeFaceIndex();
		
		$gamePlayer.refresh();
	};
	
	// 現在の衣装をスイッチに保存
	Game_Actor.prototype.changeCosSwitch = function() {
		var hash = TS_GameConfig.CosSwiId;
		for(key in hash){
			var swi_id = hash[key];
			var val = key == this._mCos ? true : false;
			$gameSwitches.setValue(swi_id, val);
		}
	};
	
	// 現在の淫乱度に合わせて表情変化
	Game_Actor.prototype.changeFaceIndex = function() {
		// 顔画像の切り替え
		
		var list = TS_GameConfig.FaceIndexList;
		var lew = this.Lewd();
		for(var i=0, length=list.length; i<length; i++){
			var line = list[i];
			if( lew <= line ){
				this._faceIndex = i;
				break;
			}
			
		}

	};
	
	
	// ●髪色取得
	Game_Actor.prototype.getHair = function() {
		return this._mHair;
	}
	Game_Actor.prototype.getHairName = function() {
		var output = '';
		if(this._mHair != ''){
			output = '_' + this._mHair;
		}
		return output;
	}
	
	Game_Actor.prototype.changeHair = function(color) {
		
		var old = this._mHair;
		switch(color){
			case 'ピンク':
				this._mHair = 'pink';
				break;
			default:
				this._mHair = '';
				break;
		}
		
		if(old != this._mHair){
			// 色が変わった
			this.changeCos();
		}
	}
	
	// 特定の服装は装備できるかチェックする
	var _TS_StandChange_Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
	Scene_Equip.prototype.onItemOk = function() {
		if( this.actor().checkCos(this._slotWindow.index(), this._itemWindow.item()) ){
			// 装備できる
			_TS_StandChange_Scene_Equip_onItemOk.call(this);
		}else{
			// 装備出来ない
			SoundManager.playBuzzer();
			this._slotWindow.activate();
			this._slotWindow.refresh();
			this._itemWindow.deselect();
			this._itemWindow.refresh();
			this._statusWindow.refresh();
		}
		
	};
	
	// ●（書き換え）服装を取得
	ADV_System.prototype.getBodyCos = function(name,en,dot) {
		var output = '';
		
		// 名前が英語の方
		if(en == true){
			var list = this.STAND_NAME;
			var result = Object.keys(list).filter(
				function(k) {
					return list[k] == name;
				}
			)[0];
			if(result != null){
				name = result;
			}
			
		}
		
		var actor = null;
		var cos_name = this.DEFAULT_NAME.BODY;
		// アクター情報取得
		/*
		$gameParty.members().forEach( function(data){
			if( data._name == name ){
				
				return ;
			}
		} );
		*/
		// 翻訳関係で無理矢理動かす
		actor = $gameParty.members()[0];
		
		
		if(actor){
			
			if(actor._mCos){
				// 服装設定あり
				output = actor._mCos;
				if(!dot && actor._mDec != '' && TS_GameConfig.CheckDecCos.indexOf(actor._mCos) != -1 ){
					output += '_' + actor._mDec;
				}
			}else{
				// 服装設定無し
				output = actor._mCos == null ? cos_name : actor._mCos;
			}
			
		}
		return output;
	}
	
	
	// ●（書き換え）装備のパラメータが一部変わる
	// ○プラグインコマンド拡張
	var _TS_StandChange_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_TS_StandChange_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toUpperCase() === 'CHANGE_COLOR') {
			// 髪の色を変更
			var actor = $gameActors.actor(1);
			if(!actor){
				console.log( 'No Data:'+args[0] );
				return;
			}
			actor.changeHair(args[0]);
		}
	};
	
})();
