//=========================================================
// TS_MenuCustomize
//=========================================================

/*:ja
 * @plugindesc
 * メニューの表示改良
 */




(function() {
	
	
	
	//****************************************************************************
	// ステータス画面拡張
	//****************************************************************************
	
	//---------------------------------
	// Window_ItemCategoryの変更
	//---------------------------------
	
	// 大事な物削除
	Window_ItemCategory.prototype.makeCommandList = function() {
		this.addCommand(TextManager.item,    'item');
		this.addCommand(TextManager.weapon,  'weapon');
		this.addCommand(TextManager.armor,   'armor');
		//this.addCommand(TextManager.keyItem, 'keyItem');
	};
	Window_ItemCategory.prototype.maxCols = function() {
		return 3;
	};

})();
