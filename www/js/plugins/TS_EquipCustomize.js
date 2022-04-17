//=========================================================
// TS_EquipCustomize
//=========================================================

/*:ja
 * @plugindesc
 * 装備の表示改良
 * @hepl
 * 「YEP_EquipCore」を改良
 */




(function() {
	
	var argPaddingW = 143;
	var argPaddingH = 132;
	
	//=============================================================================
	// Window_EquipCommand
	//=============================================================================

	Window_EquipCommand.prototype.makeCommandList = function() {
		this.addCommand(TextManager.equip2,   'equip');
		this.addFinishCommand();
	};


	//=============================================================================
	// Window_EquipSlot
	//=============================================================================

	//=============================================================================
	// Window_EquipItem
	//=============================================================================


	//=============================================================================
	// Scene_Equip
	//=============================================================================

	Scene_Equip.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createHelpWindow();
		this.createCommandWindow();
		this.createStatusWindow();
		this.createSlotWindow();
		this.createItemWindow();
		this.createCompareWindow();
		this.refreshActor();
	};

	var _TS_EquipCustomize_Scene_Equip_createHelpWindow = Scene_Equip.prototype.createHelpWindow;
	Scene_Equip.prototype.createHelpWindow = function() {
		_TS_EquipCustomize_Scene_Equip_createHelpWindow.apply(this, arguments);
		
		var padding_w = 143;
		var x = argPaddingW;
		var y = argPaddingH;
		var w =Graphics.boxWidth - (argPaddingW*2);
		var h =this._helpWindow.height;
		
		this._helpWindow.move(x,y,w,h);
	};

	Scene_Equip.prototype.createCommandWindow = function() {
		var wx = argPaddingW;
		var wy = argPaddingH + this._helpWindow.height;
		this._commandWindow = new Window_EquipCommand(wx, wy, 240);
		this._commandWindow.setHelpWindow(this._helpWindow);
		this._commandWindow.setHandler('equip', this.commandEquip.bind(this));
		this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
		this._commandWindow.setHandler('clear', this.commandClear.bind(this));
		this._commandWindow.setHandler('cancel', this.popScene.bind(this));
		this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
		this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
		this.addWindow(this._commandWindow);
	};

	Scene_Equip.prototype.createStatusWindow = function() {
		var wx = this._commandWindow.width;
		var wy = this._helpWindow.height;
		var ww = Graphics.boxWidth - wx;
		var wh = this._commandWindow.height;
		this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
		this.addWindow(this._statusWindow);
		
		// セットはするが表示はしない
		this._statusWindow.hide();
	};

	Scene_Equip.prototype.createSlotWindow = function() {
		var wx = argPaddingW + this._commandWindow.width;
		var wy = argPaddingH + this._helpWindow.height;
		var ww = Graphics.boxWidth - wx - argPaddingW;
		var wh = Graphics.boxHeight - wy - argPaddingH;
		this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
		this._slotWindow.setHelpWindow(this._helpWindow);
		this._slotWindow.setHandler('ok',	   this.onSlotOk.bind(this));
		this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
		this.addWindow(this._slotWindow);
	};

	Scene_Equip.prototype.createItemWindow = function() {
		var wx = this._slotWindow.x;
		var wy = this._slotWindow.y;
		var ww = this._slotWindow.width;
		var wh = this._slotWindow.height;
		this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
		this._itemWindow.setHelpWindow(this._helpWindow);
		this._itemWindow.setHandler('ok',	 this.onItemOk.bind(this));
		this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
		this._slotWindow.setItemWindow(this._itemWindow);
		this.addWindow(this._itemWindow);
		this._itemWindow.hide();
	};

	Scene_Equip.prototype.createCompareWindow = function() {
		var wx = this._itemWindow.width;
			var wy = this._itemWindow.y;
			var ww = Graphics.boxWidth - wx;
			var wh = Graphics.boxHeight - wy;
			this._compareWindow = new Window_StatCompare(wx, wy, ww, wh);
		this._slotWindow.setStatusWindow(this._compareWindow);
			this._itemWindow.setStatusWindow(this._compareWindow);
		this.addWindow(this._compareWindow);
		
		// セットはするが表示はしない
		this._compareWindow.hide();
	};



})();
