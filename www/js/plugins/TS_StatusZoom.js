//=========================================================
// TS_StatusZoom
//=========================================================

/*:ja
 * @plugindesc
 * ステータスにズーム画像表示追加
 */




(function() {
	
	
	var argPictId = 1;
	
	//-----------------------------------------------------------------------------
	// Scene_Status

	//-----------------------------------------------------------------------------
	// Scene_Status
	var _TS_StatusZoom_Scene_Status_create = Scene_Status.prototype.create;
	Scene_Status.prototype.create = function(){
		_TS_StatusZoom_Scene_Status_create.apply(this, arguments);

		this._spritzoombg = this._spritzoombg || new Sprite();
		this._spritzoombg.bitmap = ImageManager.loadSystem('status_back');
		this._spritzoombg.visible = false;
		this.addChild(this._spritzoombg);
		
		
		this._zoomView = false;
		this._spritzoom = this._spritzoom || new Sprite();
		this._spritzoom.visible = false;
		this.addChild(this._spritzoom);
		
		
	};
	
	// ズーム画像の追加
	Scene_Status.prototype.setZoomSprite = function(name){
		this._spritzoom.bitmap = ImageManager.loadSystem(name);
		this._spritzoom.y = 0;
		this._spritzoom.visible = true;
		this._spritzoombg.visible = true;
		this.setViewZoom(true);
	};
	
	Scene_Status.prototype.zoomClear = function(){
		this._spritzoom.bitmap = null
		this._spritzoom.visible = false;
		this._spritzoombg.visible = false;
		this.setViewZoom(false);
	};
	
	Scene_Status.prototype.zoomMove = function(dir){
		var move = 1;
		var min = -1 * (this._spritzoom.bitmap.height - Graphics.boxHeight);
		this._spritzoom.y += 50 * dir;
		
		this._spritzoom.y = Math.max(this._spritzoom.y, min);
		this._spritzoom.y = Math.min(this._spritzoom.y, 0);
	};
	
	Scene_Status.prototype.setViewZoom = function(view){
		this._zoomView = view;
	};
	Scene_Status.prototype.viewZoom = function(){
		return this._zoomView;
	};
	
	
	
	
	// 入力処理
	var _TS_StatusZoom_Scene_Status_sceneInput = Scene_Status.prototype.sceneInput;
	Scene_Status.prototype.sceneInput = function(){
		_TS_StatusZoom_Scene_Status_sceneInput.apply(this,arguments);
		if(this.viewZoom()){
			// ズーム時
			
			if (TouchInput.isCancelled()){
				this._statusWindow.zoomEnd(true);
			}else if (Input.isTriggered('cancel')){
				this._statusWindow.zoomEnd(false);
			}
			
			if (Input.isPressed('up')){
				this.zoomMove(1);
			}else if (Input.isPressed('down')){
				this.zoomMove(-1);
			}
			
			
		}
	};
	
	var _TS_StatusZoom_Scene_Status_popScene = Scene_Status.prototype.popScene;
	Scene_Status.prototype.popScene = function() {
		if(this._zoomView){
			// ズーム解除
			this.zoomClear();
			this._statusWindow.activate();
		}else{
			_TS_StatusZoom_Scene_Status_popScene.apply(this,arguments);
		}
	};

})();
