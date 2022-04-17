//=========================================================
// TS_StatusCustomize
//=========================================================

/*:ja
 * @plugindesc
 * ステータスの表示改良
 */




(function() {
	
	
	var parameters = PluginManager.parameters('TS_StatusCustomize');

	var argNoSchoolValId = 37;
	
	//****************************************************************************
	// ステータス画面拡張
	//****************************************************************************
	
	//---------------------------------
	// Window_Statusの変更
	//---------------------------------
	var _TS_StatusCustomize_Window_Status_initialize = Window_Status.prototype.initialize;
	Window_Status.prototype.initialize = function() {
		_TS_StatusCustomize_Window_Status_initialize.apply(this, arguments);
		this._currentPage = 0;
		this._reload = false;
	};
	
	Window_Status.prototype.standardPadding = function() {
		return 0;
	};
	
	Window_Status.prototype.loadWindowskin = function() {
		this.windowskin = ImageManager.loadSystem('Window2');
	};
	
	var _TS_StatusCustomize_Window_Status_update = Window_Status.prototype.update;
	Window_Status.prototype.update = function() {
		_TS_StatusCustomize_Window_Status_update.apply(this, arguments);
		if(this._reload){
			this._reload = false;
			this.refresh();
		}
	};

	
	
	// ページ切り替え
	Window_Status.prototype.movePage = function(move){
		var pageCount = this.getPageCount();
		move %= pageCount;
		this.showPage((this._currentPage + move + pageCount) % pageCount);
		this.refresh();
	};
	
	
	Window_Status.prototype.getPageCount = function(){
		return 2;
	};
	
	Window_Status.prototype.showPage = function(pageIndex){
		if (pageIndex < 0 || pageIndex >= this.getPageCount()){
			return;
		}
		this._currentPage = pageIndex;
	};
	
	// 再描画
	Window_Status.prototype.refresh = function(){
		this.contents.clear();
		if (this._actor){
        	this.drawStand();
			this.drawPage();
		}
	};
	
	// 立ち絵表示
	Window_Status.prototype.drawStand = function(){
		
		// 現在の立ち絵画像
		var hair_name = TS_Function.getActor(TS_GameConfig.HeroineName).getHairName();
		var cos_name = $advSystem.getBodyCos(this._actor.name(),false);
		var body_name = TS_GameConfig.HeroineName + '_' + cos_name + hair_name;
		var face_name = TS_GameConfig.HeroineName + '@' + '無表情' + hair_name;
		
		// 立ち絵表示
		width = 1024;
		height = 768;
		
		var b_bitmap = ImageManager.loadPicture(body_name);
		var f_bitmap = ImageManager.loadPicture(face_name);
		
		// 画像が読み込めてない
		if(!b_bitmap.isReady() || !f_bitmap.isReady()){
			this._reload = true;
			return;
		}
		
		var pw = this.contentsWidth() / 2;
		var ph = this.contentsHeight();
		var sw = Math.min(width, pw);
		var sh = Math.min(height, ph);
		var dx = 0;
		var dy = 0;
		var sx = Math.floor(Math.max(width - pw, 0) / 2);
		var sy = Math.floor(Math.max(height - ph, 0) / 2);
		this.contents.blt(b_bitmap, sx, sy, sw, sh, dx, dy);
		this.contents.blt(f_bitmap, sx, sy, sw, sh, dx, dy);
		
	};

	// 指定ページの描画
	Window_Status.prototype.drawPage = function(){
		var pageIndex = this._currentPage;
		var dx = this.contentsWidth() / 2;
		
		// 右側を消す
		this.contents.clearRect(dx, 0, dx, this.contentsHeight());

		switch (pageIndex){
			case 0:
				this.drawNormalParameter(dx,0);
				break;
			case 1:
				this.drawEventParameter(dx,0);
				break;
		}
	};
	
	// 通常パラメーター表示
	Window_Status.prototype.drawNormalParameter = function(x,y){
		
		// 必要なビットマップ画像読み込み
		var actor = this._actor;
		var nickname_id = actor._mSMid;
		var nickname_img = TS_GameConfig.ProfileList[nickname_id].image;
		
		// 翻訳用追加
		var add_lan = TS_Function.getLanguageNameAdd();
		
		// 処女判定
		var virgin_name = $gameSwitches.value(TS_GameConfig.argVirginSwi) ? 'status_virgin_non' + add_lan : 'status_virgin' + add_lan;
		
		var base_bitmap = ImageManager.loadSystem('status_window' + add_lan);
		var nick_bitmap = ImageManager.loadSystem('status_class' + nickname_img + add_lan);
		var num_bitmap = ImageManager.loadSystem('status_num');
		var num_mini_bitmap = ImageManager.loadSystem('status_num_mini');
		var num_dot_bitmap = ImageManager.loadSystem('status_num_dot');
		var zoom_bitmap = ImageManager.loadSystem('status_zoom_button');
		var virgin_bitmap = ImageManager.loadSystem(virgin_name);
		
		var arrow_bitmap = ImageManager.loadSystem('status_page_' + this._currentPage + add_lan);
		
		// バイト：ビットマップチェック
		var array = TS_GameConfig.WorkList;
		var work_list = actor._mWork;
		var f_name = 'status_work_';
		for(var i=0; i<array.length; i++){
			var work = array[i];
			var name = 'no';
			if(work_list[work]){
				// バイト経験済み
				name = TS_FileLoad.get(work) + add_lan;
			}
			
			var bitmap = ImageManager.loadSystem(f_name + name);
			if(!bitmap.isReady()){
				this._reload = true;
			}
		}
		
		// 服装リスト
		var hair_name = TS_Function.getActor(TS_GameConfig.HeroineName).getHairName();
		var array = TS_GameConfig.CosList;
		var hash = TS_GameConfig.CosDbId;
		var f_name = 'status_dot_';
		for(var i=0; i<array.length; i++){
			var cos = array[i];
			var b_name = 'no';
			if( $gameParty.hasItem($dataArmors[ hash[cos] ], true) ){
				// アイテムを所持している
				b_name = cos + hair_name;
			}
			var bitmap = ImageManager.loadSystem(f_name + b_name);
			if(!bitmap.isReady()){
				this._reload = true;
			}
			
		}
		
		// 画像が読み込めてない
		if(!base_bitmap.isReady() 
		|| !nick_bitmap.isReady()
		|| !num_bitmap.isReady()
		|| !num_mini_bitmap.isReady()
		|| !num_dot_bitmap.isReady()
		|| !virgin_bitmap.isReady()
		|| !arrow_bitmap.isReady()
		
		){
			this._reload = true;
			
		}
		
		if(this._reload){
			return;
		}
		
		
		// 枠表示
		var vw = this.contentsWidth();
		var vh = this.contentsHeight();
		this.contents.blt(base_bitmap, 0, 0, vw, vh, x - this.contentsWidth()/2, y);
		
		// 矢印表示
		var vw = arrow_bitmap.width;
		var vh = arrow_bitmap.height;
		var pos_x = this.contentsWidth() - (vw + 20);
		var pos_y = this.contentsHeight() - (vh + 20);
		this.contents.blt(arrow_bitmap, 0, 0, vw, vh, pos_x, pos_y);
		
		// 処女表記
		var vw = 146;
		var vh = 35;
		this.contents.blt(virgin_bitmap, 0, 0, vw, vh, x-75, y+25);
		
		// ニックネーム
		var vw = 563;
		var vh = 128;
		this.contents.blt(nick_bitmap, 0, 0, vw, vh, x-75, y+50);
		
		// 所持金
		var money = $gameParty.gold();
		TS_Function.viewNumber( this.contents, money, x + 410, y + 195, num_bitmap, 1, 2, num_dot_bitmap );
		
		// サボり日数
		var no_school = $gameVariables.value(argNoSchoolValId);
		TS_Function.viewNumber( this.contents, no_school, x + 125, y + 250, num_bitmap, 2, 2 );
		
		// ズームボタン
		var vw = 41;
		var vh = 58;
		this.contents.blt(zoom_bitmap, 0, 0, vw, vh, x-100, y+700);
		
		// 数字表示
		//TS_Function.viewNumber( this.contents, 123, x + 10, y + 10, num_bitmap, 1, 2, num_dot_bitmap );
		//TS_Function.viewNumber( this.contents, 1234, x + 10, y + 10 + 50, num_bitmap, 1, 2 );
		//TS_Function.viewNumber( this.contents, 12345, x + 10, y + 10 + 100, num_bitmap, 1, 2, num_dot_bitmap  );
		
		// 稼ぎ先のリスト
		var array = TS_GameConfig.WorkList;
		var work_list = actor._mWork;
		var f_name = 'status_work_';
		
		var vw = 210;
		var vh = 38;
		
		var col = 3;
		var pos_x = -100;
		var pos_y = 400;
		var add_x = 210;
		var add_y = 45;
		for(var i=0; i<array.length; i++){
			var work = array[i];
			var name = 'no';
			if(work_list[work]){
				// バイト経験済み
				name = TS_FileLoad.get(work) + add_lan;
			}
			
			var bitmap = ImageManager.loadSystem(f_name + name);
			this.contents.blt(bitmap, 0, 0, vw, vh, x+pos_x, y+pos_y);
			
			if(i % col == col - 1){
				// 次の行に移動
				pos_x -= add_x * (col -1);
				pos_y += add_y;
			}else{
				// 次の列に移動
				pos_x += add_x;
			}
			
		}
		
		// 服装表示
		var hair_name = TS_Function.getActor(TS_GameConfig.HeroineName).getHairName();
		var array = TS_GameConfig.CosList;
		var hash = TS_GameConfig.CosDbId;
		var vw = 96;
		var vh = 96;
		
		var col = 5;
		var pos_x = -50;
		var pos_y = 550;
		var add_x = 100;
		var add_y = 100;
		var f_name = 'status_dot_';
		for(var i=0; i<array.length; i++){
			var cos = array[i];
			var b_name = 'no';
			if( $gameParty.hasItem($dataArmors[ hash[cos] ], true) ){
				// アイテムを所持している
				b_name = cos + hair_name;
			}
			
			
			var bitmap = ImageManager.loadSystem(f_name + b_name);
			this.contents.blt(bitmap, 0, 0, vw, vh, x+pos_x, y+pos_y);
			
			if(i % col == col - 1){
				// 次の行に移動
				pos_x -= add_x * (col -  1.5);
				pos_y += add_y;
			}else{
				// 次の列に移動
				pos_x += add_x;
			}
			
		}
	};
	
	
	// イベントパラメーター表示
	Window_Status.prototype.drawEventParameter = function(x,y){
		
		// 必要なビットマップ画像読み込み
		var actor = this._actor;
		
		// 翻訳用追加
		var add_lan = TS_Function.getLanguageNameAdd();
		
		
		var base_bitmap = ImageManager.loadSystem('status_window2' + add_lan);
		var num_bitmap = ImageManager.loadSystem('status_num_mini');
		
		var heart_f_bitmap = ImageManager.loadSystem('status_heart_full');
		var heart_h_bitmap = ImageManager.loadSystem('status_heart_half');
		var heart_n_bitmap = ImageManager.loadSystem('status_heart_non');
		
		var human_f_bitmap = ImageManager.loadSystem('status_human_full');
		var human_n_bitmap = ImageManager.loadSystem('status_human_non');
		
		var heart0_bitmap = ImageManager.loadSystem('status_heart0');
		var heart1_bitmap = ImageManager.loadSystem('status_heart1');
		var heart2_bitmap = ImageManager.loadSystem('status_heart2');
		var heart3_bitmap = ImageManager.loadSystem('status_heart3');
		var heart4_bitmap = ImageManager.loadSystem('status_heart4');
		
		var mouth1_bitmap = ImageManager.loadSystem('status_mouth1');
		var mouth2_bitmap = ImageManager.loadSystem('status_mouth2');
		var breast1_bitmap = ImageManager.loadSystem('status_breast1');
		var breast2_bitmap = ImageManager.loadSystem('status_breast2');
		var hip1_bitmap = ImageManager.loadSystem('status_hip1');
		var hip2_bitmap = ImageManager.loadSystem('status_hip2');
		
		var arrow_bitmap = ImageManager.loadSystem('status_page_' + this._currentPage + add_lan);
		
		if(!this.windowskin.isReady() ){
			this._reload = true;
			return;
		}
		
		// 画像が読み込めてない
		if(!base_bitmap.isReady() 
		|| !heart_f_bitmap.isReady()
		|| !heart_h_bitmap.isReady()
		|| !heart_n_bitmap.isReady()
		|| !heart0_bitmap.isReady()
		|| !heart1_bitmap.isReady()
		|| !heart2_bitmap.isReady()
		|| !heart3_bitmap.isReady()
		|| !heart4_bitmap.isReady()
		|| !mouth1_bitmap.isReady()
		|| !mouth2_bitmap.isReady()
		|| !breast1_bitmap.isReady()
		|| !breast2_bitmap.isReady()
		|| !hip1_bitmap.isReady()
		|| !hip2_bitmap.isReady()
		|| !arrow_bitmap.isReady()
		){
			this._reload = true;
			return;
		}
		
		// 枠表示
		var vw = this.contentsWidth();
		var vh = this.contentsHeight();
		this.contents.blt(base_bitmap, 0, 0, vw, vh, x - this.contentsWidth()/2, y);
		
		// 矢印表示
		var vw = arrow_bitmap.width;
		var vh = arrow_bitmap.height;
		var pos_x = this.contentsWidth() - (vw + 20);
		var pos_y = this.contentsHeight() - (vh + 20);
		this.contents.blt(arrow_bitmap, 0, 0, vw, vh, pos_x, pos_y);
		
		// 淫乱度
		var vw = 46;
		var vh = 46;
		var lew_rate = actor.getLewdRate() * 100;
		var pos_x = 75;
		var pos_y = 40;
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
		
		// 知名度
		var vw = 30;
		var vh = 46;
		var rate = actor.getPolyRate() * 100;
		var pos_x = 75 + 8;
		var pos_y = 95;
		var add_x = 50;
		var h_num = Math.floor(rate / 20);
		
		for(var i=0; i<5; i++){
			var bitmap = null;
			var line = i;
			if( line < h_num ){
				bitmap = human_f_bitmap;
			}else{
				bitmap = human_n_bitmap;
			}
			
			this.contents.blt(bitmap, 0, 0, vw, vh, x + pos_x, y + pos_y);
			pos_x += add_x;
		}
		
		// 各部位の情報表示
		var heart_bitmap_list = [
			heart0_bitmap,
			heart1_bitmap,
			heart2_bitmap,
			heart3_bitmap,
			heart4_bitmap,
		];
		
		
		var thum_w = 139;
		var thum_h = 139;
		var heart_w = 134;
		var heart_h = 32;
		//var heart_x = 350;
		var heart_x = 400;
		var heart_y = -5;
		//var num_x = 450;
		var num_x = 375;
		var num_y = 110;
		var name_first = {
			x:360,
			y:70,
		};
		var name_last = {
			x:360,
			y:30,
		};
		
		
		//************************************************************************
		// 口
		var data = actor._mMouth;
		var dx = 441;
		var dy = 187;
		var rate = Math.floor(data.val / 25);
		rate = Math.min(rate,4);
		var num = data.num;
		var bitmap1 = rate >= 2 ? mouth2_bitmap : mouth1_bitmap;
		var bitmap2 = heart_bitmap_list[rate];
		
		
		
		// サムネ
		this.contents.blt(bitmap1, 0, 0, thum_w, thum_h, dx, dy);
		// 開発度
		this.contents.blt(bitmap2, 0, 0, heart_w, heart_h, dx + heart_x, dy + heart_y);
		// 数
		TS_Function.viewNumber( this.contents, num, dx + num_x, dy + num_y, num_bitmap, 1, 2 );
		
		// 相手の名前
		var name = TS_Function.changeLanguage(data.first);
		if(name == '') name = '？？？';
		this.drawText(name, dx + name_first.x, dy + name_first.y, 160);
		
		var name = TS_Function.changeLanguage(data.last);
		if(name == '') name = '？？？';
		this.drawText(name, dx + name_last.x, dy + name_last.y, 160);
		
		//************************************************************************
		// 胸
		var data = actor._mBreast;
		var dx = 441;
		var dy = 380;
		var rate = Math.floor(data.val / 25);
		rate = Math.min(rate,4);
		var num = data.num;
		var bitmap1 = rate >= 2 ? breast2_bitmap : breast1_bitmap;
		var bitmap2 = heart_bitmap_list[rate];
		
		// サムネ
		this.contents.blt(bitmap1, 0, 0, thum_w, thum_h, dx, dy);
		// 開発度
		this.contents.blt(bitmap2, 0, 0, heart_w, heart_h, dx + heart_x, dy + heart_y);
		// 数
		TS_Function.viewNumber( this.contents, num, dx + num_x, dy + num_y, num_bitmap, 1, 2 );
		
		// 相手の名前
		var name = TS_Function.changeLanguage(data.first);
		if(name == '') name = '？？？';
		this.drawText(name, dx + name_first.x, dy + name_first.y, 160);
		
		var name = TS_Function.changeLanguage(data.last);
		if(name == '') name = '？？？';
		this.drawText(name, dx + name_last.x, dy + name_last.y, 160);
		
		//************************************************************************
		// 股間
		var data = actor._mHip;
		var dx = 441;
		var dy = 572;
		var rate = Math.floor(data.val / 25);
		rate = Math.min(rate,4);
		var num = data.num;
		var bitmap1 = rate >= 2 ? hip2_bitmap : hip1_bitmap;
		var bitmap2 = heart_bitmap_list[rate];
		
		// サムネ
		this.contents.blt(bitmap1, 0, 0, thum_w, thum_h, dx, dy);
		// 開発度
		this.contents.blt(bitmap2, 0, 0, heart_w, heart_h, dx + heart_x, dy + heart_y);
		// 数
		TS_Function.viewNumber( this.contents, num, dx + num_x, dy + num_y, num_bitmap, 1, 2 );
		
		// 相手の名前
		var name = TS_Function.changeLanguage(data.first);
		if(name == '') name = '？？？';
		this.drawText(name, dx + name_first.x, dy + name_first.y, 160);
		
		var name = TS_Function.changeLanguage(data.last);
		if(name == '') name = '？？？';
		this.drawText(name, dx + name_last.x, dy + name_last.y, 160);
		
		
	};
	
	// ズームボタンの判定
	Window_Status.prototype.zoomStart = function(mouse){
		
		// 1ページ目のみ
		if(this._currentPage != 0) return;
		
		if(mouse){
			// マウスの場合は座標チェック
			var x = TouchInput.x;
			var y = TouchInput.y;
			
			var dx = this.contentsWidth() / 2 - 100;
			var dy = 700;
			var vw = 41;
			var vh = 58;
			
			if( !(dx <= x && x <= dx+vw && dy <= y && y <= dy+vh) ){
				return;
			}
			
		}
		
		// ズームが押された
		var hair_name = TS_Function.getActor(TS_GameConfig.HeroineName).getHairName();
		//var name = this._actor.name();
		var name = 'サクラ';
		var cos_name = $advSystem.getBodyCos(name,false);
		var body_name = TS_FileLoad.get(name) + '@' + cos_name;
		
		var bitmap_name = 'status_' + body_name + '_all' + hair_name;
		SceneManager._scene.setZoomSprite(bitmap_name);
	};
	
	// クリック判定
	Window_Status.prototype.clickCheck = function(){
		
		// マウスの場合は座標チェック
		var x = TouchInput.x;
		var y = TouchInput.y;
		
		var arrow_bitmap = ImageManager.loadSystem('status_page_' + this._currentPage);
		var vw = arrow_bitmap.width;
		var vh = arrow_bitmap.height;
		var dx = this.contentsWidth() - (vw + 20);
		var dy = this.contentsHeight() - (vh + 20);
		
		
		if( !(dx <= x && x <= dx+vw && dy <= y && y <= dy+vh) ){
			return;
		}
		
		SoundManager.playCursor();
		this.movePage(1);
	};
	
	// ズームボタンの判定
	Window_Status.prototype.zoomEnd = function(mouse){
		
		// 1ページ目のみ
		if(this._currentPage != 0) return;
		
		if(mouse){
			// マウスの場合は座標チェック
			var x = TouchInput.x;
			var y = TouchInput.y;
			
			var dx = this.contentsWidth() / 2 - 100;
			var dy = 700;
			var vw = 41;
			var vh = 58;
			
			if( !(dx <= x && x <= dx+vw && dy <= y && y <= dy+vh) ){
				return;
			}
			
		}
		
		// ズーム終了
		SceneManager._scene.zoomClear();
	};
	
	//-----------------------------------------------------------------------------
	// Scene_Status


	var _TS_StatusCustomize_Scene_Status_update = Scene_Status.prototype.update;
	Scene_Status.prototype.update = function(){
		_TS_StatusCustomize_Scene_Status_update.apply(this, arguments);

		this.sceneInput();
	};
	
	// ページの切り替え判定
	Scene_Status.prototype.sceneInput = function(){
		if(!this.viewZoom()){
			// 非ズーム時
			if (Input.isTriggered('left')){
				SoundManager.playCursor();
				this._statusWindow.movePage(-1);
			}else if (Input.isTriggered('right')){
				SoundManager.playCursor();
				this._statusWindow.movePage(1);
			}
			
			// クリック判定
			if (TouchInput.isTriggered()){
				this._statusWindow.clickCheck();
			}
			
			
			// ズームボタン判定
			if (TouchInput.isTriggered()){
				this._statusWindow.zoomStart(true);
			}else if (Input.isTriggered('ok')){
				this._statusWindow.zoomStart(false);
			}
		}
	};
	
	var _TS_StatusCustomize_Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function(fileName) {
		_TS_StatusCustomize_Game_System_initialize.apply(this,arguments)
		ImageManager.loadSystem('Window2');
	};

})();
