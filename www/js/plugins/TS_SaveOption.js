//=========================================================
// TS_SaveOption
//=========================================================

/*:ja
 * @plugindesc
 * セーブ画面での見た目変更
 */

(function() {
	
	//****************************************************************************
	// セーブ画面のレイアウト変更
	//****************************************************************************
	var _TS_saveoption_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function() {
		var info = _TS_saveoption_DataManager_makeSavefileInfo.call(this);
		var title = $gameMap.note();
		if( title != '' ){
			// メモ欄に記載されてるマップ名を表示
			info.title = title;
		}else{
			info.title = '？？？？';
		}
		
		var actor = $gameActors.actor(1);
		
		// 現在の服装保存
		info.cos = $advSystem.getBodyCos(TS_GameConfig.HeroineName,false,true);
		info.cos += actor.getHairName();
		
		// ゲーム内時間保存
		//info.gameTimeDay = $gameSystem.chronus().getDateFormat(1);
		info.gameTimeDay = $gameSystem.chronus().getDay();
		info.gameTimeWeek = $gameSystem.chronus().getWeekIndex();
		
		info.gameTimeMin = $gameSystem.chronus().getDateFormat(2);
		
		
		
		// 所持金保存
		info.gold = $gameParty.gold();
		
		// 淫乱度保存
		info.lewRate = actor.getLewdRate() * 100;
		
		return info;
	};
	
	// レイアウト表示部分書き換え
	Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
		var bottom = rect.y + rect.height;
		
		// 境界線表示
		this.drawHorzLine(rect.y - 17);
		
		// マップ名表示
		this.drawGameTitle(info, rect.x + 192, rect.y, rect.width - 192);
		
		// キャラクター表示
		if(valid){
			this.drawPlayer(info, rect.x + 180, rect.y + 30);
		}
		
		// ゲーム内時間表示
		this.drawGameTime(info, rect.x + 300, rect.y + 40, rect.width - 300);
		
		// 所持金表示
		var width = 350;
		this.drawGold(info, rect.x + rect.width - width, rect.y, width );
		
		// 淫乱度表示
		this.drawLew(info, rect.x + rect.width - width, rect.y + 50);
		
		// プレイ時間表示
		var lineHeight = this.lineHeight();
		var y2 = bottom - lineHeight;
		if (y2 >= lineHeight) {
			this.drawPlaytime(info, rect.x, y2, rect.width);
		}
	};
	
	// 表示処理
	Window_SavefileList.prototype.drawGameTitle = function(info, x, y, width) {
		if (info.title) {
			this.drawText(TS_Function.changeLanguage(info.title), x, y, width);
		}
	};
	
	
	Window_SavefileList.prototype.drawPlayer = function(info, x, y) {
		if(info.cos){
			var name = 'status_dot_' + TS_FileLoad.get(info.cos);
			var bitmap = ImageManager.loadSystem(name);
			var pw = bitmap.width;
			var ph = bitmap.height;
			var sx = 0;
			var sy = 0;
			this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
		}
	};
	
	Window_SavefileList.prototype.drawGameTime = function(info, x, y, width) {
		if(info.gameTimeDay){
			var lineHeight = this.lineHeight();
			
			if(!info.gameTimeWeek) info.gameTimeWeek = 0;
			
			var day_text = info.gameTimeDay + TS_Function.getLanguage('Day') + TS_Function.getLanguage('Week' + info.gameTimeWeek);
			this.drawText(day_text, x, y, width);
			this.drawText(info.gameTimeMin, x, y + lineHeight, width);
		}
	};
	
	Window_SavefileList.prototype.drawGold = function(info, x, y, width) {
		if(info.gold != null){
			var text = info.gold;
			
			//this.drawText(TS_Function.getLanguage('MoneyTitle'), x, y, width);
			this.drawCurrencyValue(text, TextManager.currencyUnit, x, y, width);
		}
	};
	
	Window_SavefileList.prototype.drawLew = function(info, x, y) {
		if(info.lewRate != null){
			
			this.drawText(TS_Function.getLanguage('StatusLewd'), x-20, y, 200);
			
			var heart_f_bitmap = ImageManager.loadSystem('status_heart_full');
			var heart_h_bitmap = ImageManager.loadSystem('status_heart_half');
			var heart_n_bitmap = ImageManager.loadSystem('status_heart_non');
			
			var vw = heart_f_bitmap.width;
			var vh = heart_f_bitmap.height;
			
			var pos_x = 100;
			var pos_y = -10;
			var add_x = 50;
			var lew_rate = info.lewRate;
			
			var h_num = Math.floor(lew_rate / 20);
			h_num += Math.floor((lew_rate % 20) / 10) / 2;
			
			for(var i=0; i<5; i++){
				var bitmap = null;
				var line = i+1;
				if( line <= h_num ){
					bitmap = heart_f_bitmap;
				}else{
					if( i*2 < h_num*2 ){
						bitmap = heart_h_bitmap;
					}else{
						bitmap = heart_n_bitmap;
					}
				}
				
				this.contents.blt(bitmap, 0, 0, vw, vh, x + pos_x, y + pos_y);
				pos_x += add_x;
			}
		}
	};
	
	Window_SavefileList.prototype.drawCurrencyValue = function(value, unit, wx, wy, ww) {
		this.resetTextColor();
		var cx = this.textWidth(unit);
		var text = Yanfly.Util.toGroup(value);
		if (this.textWidth(text) > ww - cx) {
			text = Yanfly.Param.GoldOverlap;
		}
		this.drawText(text, wx, wy, ww - cx - 4, 'right');
		this.drawText(unit, wx, wy, ww, 'right');
		this.resetFontSettings();
	};
	
	Window_SavefileList.prototype.drawHorzLine = function(y) {
		var lineY = y + this.lineHeight() / 2 - 1;
		this.contents.paintOpacity = 255;
		this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
		this.contents.paintOpacity = 255;
	};

	
	
	//****************************************************************************
	// マップオブジェクトに関数追加
	//****************************************************************************
	Game_Map.prototype.note = function() {
		return $dataMap.note;
	};
})();
