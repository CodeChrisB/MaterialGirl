//=========================================================
// PictureSpriteSheetEx
//=========================================================

/*:ja
 * @plugindesc
 * ピクチャスプライトシート拡張

*/

(function() {

	var _TS_PictureSpriteSheetEx_Game_Picture_update = Game_Picture.prototype.update;
	Game_Picture.prototype.update = function() {
		_TS_PictureSpriteSheetEx_Game_Picture_update.apply(this, arguments);
		if(this._sheetFrame){
			this._sheetCnt++;
			if(this._sheetCnt >= this._sheetFrame){
				this._sheetCnt = 0;
				this.addSheetCellIndex();
			}
		}
	};
	
	var _TS_PictureSpriteSheetEx_Game_Picture_show = Game_Picture.prototype.show;
	Game_Picture.prototype.show = function(name, origin, x, y, scaleX,scaleY, opacity, blendMode) {
		_TS_PictureSpriteSheetEx_Game_Picture_show.apply(this, arguments);
		this._sheetFrame = null;
		this._sheetCnt = 0;
	};
	
	// フレームセット
	Game_Picture.prototype.setFrameRate = function(fps) {
		this._sheetFrame = fps;
	};
	
})();

