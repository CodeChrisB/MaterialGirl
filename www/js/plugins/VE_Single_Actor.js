//=============================================================================
// One-Actor Menu Version 1.05
//=============================================================================
 
/*:
 * @plugindesc One-Actor's menu. This plugin is made for one playable actor only.
 * @author Ventiqu - 2017
 *
 * @param Level Number x Distance
 * @desc Set 'level' -number x distance from the text.
 * default: 50
 * @default 50
 *
 * @param Class text x Distance
 * @desc Set 'Class' -text's x distance.
 * default: 160
 * @default 160
 *
 * @param ExptoLvl text x Distance
 * @desc Set 'ExpToLvl' -numbers x distance.
 * default: 160
 * @default 160
 *
 * @param Status Window Width
 * @desc Set Status window's width. You might need to change other
 * parameters as well. Default: 325
 * @default 325
 *
 * @help
 * -Update #4 25.1.2017-
 *
 * Remember to turn off Formation! Go to Database - System - Menu Commands and turn off Formation.
 * This changes menu to look like its meant for one actor only.
 *
 * --Using ACTOR NOTES--
 * Go to Database (f9) and to Actors. Then there you can set a note to that actor.
 *
 * <avatar:filename> set actor's different picture.
 * put file at img/pictures and use same file name as parameter.
 *
 * example: <avatar:Bust_test>
 * Case sensetive.
 *
 * -------------
 * --Changelog--
 * -------------
 * 1.05 - 25.1.2017 - Actor note added so you can add a bust picture of the actor. Plugin commands added.
 * 1.04 - 20.11.2016 - Modified script.
 * 1.03 - 25.6.2016 - Minor fixes.
 * 1.02 - 11.6.2016 - Fixed black screen bug.
 * 1.01 - 1.12.2015 - Skill-, Equip- and Status menu will open for actor 1 only so no more need to press OK before you can jump to new window.
 */
 
(function() {

	function Scene_Base() {
		this.initialize.apply(this, arguments);
	}

	var parameters  = PluginManager.parameters('VE_Single_Actor');
	var xdistance	= Number(parameters['Level Number x Distance'] || 50);
	var xclass	  = Number(parameters['Class text x Distance'] || 160);
	var xexptolvl	= Number(parameters['ExptoLvl text x Distance'] || 160);
	var windowwidth = Number(parameters['Status Window Width'] || 325);
	
	var argPaddingW = 143;
	var argPaddingH = 132;


// this will create menus like status- and gold window
	var _Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
		_Scene_Menu_create.call(this);
		this._statusWindow.x = this._commandWindow.x + this._commandWindow.width;
		this._statusWindow.y = this._commandWindow.y;
		this._goldWindow.x = argPaddingW;
		this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height - argPaddingH;
	};
// this will create commandwindow
	Scene_Menu.prototype.createCommandWindow = function() {
		this._commandWindow = new Window_MenuCommand(argPaddingW, argPaddingH); //Position for menu x and y
		this._commandWindow.setHandler('item',	  this.commandItem.bind(this));
		this._commandWindow.setHandler('skill',	 this.commandPersonal.bind(this));
		this._commandWindow.setHandler('equip',	 this.commandPersonal.bind(this));
		this._commandWindow.setHandler('status',	this.commandPersonal.bind(this));
		this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
		this._commandWindow.setHandler('options',	this.commandOptions.bind(this));
		this._commandWindow.setHandler('save',	  this.commandSave.bind(this));
		this._commandWindow.setHandler('gameEnd',	this.commandGameEnd.bind(this));
		this._commandWindow.setHandler('cancel',	this.popScene.bind(this));
		this.addWindow(this._commandWindow);
	};

// this will push skill, equip or status depends on which you selected.
	Scene_Menu.prototype.commandPersonal = function() {
		this._statusWindow.setFormationMode(false);
		switch (this._commandWindow.currentSymbol()) {
		case 'skill':
			SceneManager.push(Scene_Skill);
			break;
		case 'equip':
			SceneManager.push(Scene_Equip);
			break;
		case 'status':
			SceneManager.push(Scene_Status);
			break;
		  }
	};

	Scene_ItemBase.prototype.showSubWindow = function(window) {
		window.x = this.isCursorLeft() ? Graphics.boxWidth - window.width : 0;
		window.show();
		window.activate();
	};

// removed text from this so this wont mess around
	Scene_Menu.prototype.onPersonalOk = function() {
	};

// Rows for menucommands
	Window_MenuCommand.prototype.numVisibleRows = function() {
		return 8;
	};

// height for goldwindow
	Window_Gold.prototype.windowHeight = function() {
		return this.fittingHeight(1);
	};

// width for menustatus
	Window_MenuStatus.prototype.windowWidth = function() {
		return windowwidth;
	};
// height for windowstatus
	Window_MenuStatus.prototype.windowHeight = function() {
		var h1 = this.fittingHeight(1);
		var h2 = this.fittingHeight(2);
		return Graphics.boxHeight - h1 - h2 - 85;
	};
// maxCols is for max party members shown. This is set to 1, because this is single-player menu.
// do not change this unless you know what you are doing.
	Window_MenuStatus.prototype.maxCols = function() {
		return 1;
	};
// just like maxCols, but this is rows. This is set to 1, because this is single-player menu.
// do not change this unless you know what you are doing.
	Window_MenuStatus.prototype.numVisibleRows = function() {
		return 1;
	};
 
// draws actor face.
	Window_MenuStatus.prototype.drawItemImage = function(index) {
		var actor = $gameParty.members()[index];
		var rect = this.itemRectForText(index);
		// load stand_picture
		var bitmapName = $dataActors[actor.actorId()].meta.avatar;
		var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null; // ? on ternary operator.
		var w = Math.min(rect.width, (bitmapName ? bitmap.width : 144));
		var h = Math.min(rect.height, (bitmapName ? bitmap.height : 144));
		var lineHeight = this.lineHeight();
		this.changePaintOpacity(actor.isBattleMember());
		// if actor has note <actor: filename> then do this.
		if ( bitmap ) {
			var sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0;
			var sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0;
			var dx = (bitmap.width > rect.width) ? rect.x :
				rect.x + (rect.width - bitmap.width) / 2;
			var dy = (bitmap.height > rect.height) ? rect.y :
				rect.y + (rect.height - bitmap.height) / 2;
			this.contents.blt(bitmap, sx, sy, w, h, dx, dy);
		} else { // if there is not a note or its invalid, do the normal setting.
			this.drawActorFace(actor, rect.x + 150, rect.y + lineHeight * 2.0, w, h);
		}
		this.changePaintOpacity(true);
	};
// draws actor name, level, class, hp, mp and status icons.
	Window_MenuStatus.prototype.drawItemStatus = function(index) {
		var actor = $gameParty.members()[index];
		var rect = this.itemRectForText(index);
		var x = rect.x;
		var y = rect.y;
		var width = rect.width;
		var bottom = y + rect.height;
		var lineHeight = this.lineHeight();
		
		var heart_f_bitmap = ImageManager.loadSystem('status_heart_full');
		var heart_h_bitmap = ImageManager.loadSystem('status_heart_half');
		var heart_n_bitmap = ImageManager.loadSystem('status_heart_non');
		// 画像が読み込めてない
		if(!heart_f_bitmap.isReady()
		|| !heart_h_bitmap.isReady()
		|| !heart_n_bitmap.isReady()
		){
			this._reload = true;
			return;
		}
		
		// 画像表示
		x += 80;
		this.drawActorName(actor, x, y + lineHeight * 0, width);
		this.drawActorNickname(actor, x + xclass, y + lineHeight * 0, width);
		
		// ステータス表示
		
		// 淫乱度
		
		// 表情変化
		actor.changeFaceIndex();
		
		var dx = x - 30;
		var dy = y + (lineHeight * 7);
		this.drawText(TS_Function.getLanguage('StatusLewd'), dx, dy, width);
		var vw = 46;
		var vh = 46;
		var lew_rate = actor.getLewdRate() * 100;
		var pos_x = dx + 25;
		var pos_y = dy - 15;
		var add_x = 50;
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
		
		// バイトの稼ぎ先
		dy += lineHeight * 1;
		//this.drawText(TS_Function.getLanguage('StatusShop'), dx + 140, dy, width);
		this.drawText(TS_Function.getLanguage('StatusShop'), 0, dy, width,'center');
		
		dy += lineHeight * 1;
		var work_rect = new Rectangle();
		work_rect.x = dx - 50;
		work_rect.y = dy;
		work_rect.width = 145;
		work_rect.height = lineHeight;
		
		// 稼ぎ先のリスト
		var array = TS_GameConfig.WorkList;
		var work_list = actor._mWork;
		$gameMessage.debug(work_list)
		var col = 3;
		var add_x = work_rect.width + 10;
		var add_y = 45;
		for(var i=0; i<array.length; i++){
			var work = array[i];
			var name = '　？？？？　';
			var visible = true;
			if(work_list[work]){
				// バイト経験済み
				//name = work;
				var swi_id = TS_GameConfig.WorkSwiId[name]
				name = TS_Function.getLanguage('StatusShop'+i);
				if( swi_id ){
					if( $gameSwitches.value(swi_id) ){
						visible = false;
					}
				}
			}else{
				// 未経験
				visible = false;
			}
			this.changePaintOpacity(visible);
			this.drawText(name, work_rect.x, work_rect.y, work_rect.width);
			this.resetTextColor();
			if(i % col == col - 1){
				// 次の行に移動
				work_rect.x -= add_x * (col -1);
				work_rect.y += add_y;
			}else{
				// 次の列に移動
				work_rect.x += add_x;
			}
			
		}
		
		//this.drawActorLevel(actor, x, y + lineHeight * 1, width);
		//this.drawActorHp(actor, x, bottom - lineHeight * 3.1, width);
		//this.drawActorMp(actor, x, bottom - lineHeight * 2.1, width);
		//this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
		// Thanks to thalesgal's friend who did this 'to Level' text!
		//var toLevel = actor.nextRequiredExp() +  actor.currentExp();
		//this.drawText(actor.currentExp() + "/ " + toLevel, x + xexptolvl, y + lineHeight * 1, width);
	};
	
	var _Window_MenuStatus_update = Window_MenuStatus.prototype.update;
	Window_MenuStatus.prototype.update = function() {
		_Window_MenuStatus_update.apply(this, arguments);
		if(this._reload){
			this._reload = false;
			this.refresh();
		}
	};
	


// Draws actor's level number.
	Window_Base.prototype.drawActorLevel = function(actor, x, y) {
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.levelA, x, y, 48);
		this.resetTextColor();
		this.drawText(actor.level, x + xdistance, y, 36, 'left');
	};

Game_System.prototype.winCount = function() {
	return this._winCount;
};

})();
