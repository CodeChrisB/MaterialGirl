//=========================================================
// ExtensionStatus
//=========================================================

/*:ja
 * @plugindesc
 * 特殊なステータス表記追加
 */

/*:
 * 
 *
*/

(function () {


	var argActorLewdVal = {
		'サクラ': 32,
	};


	// 各値の最大値
	var argLewdMax = 100;
	var argPolyMax = 100;
	var argPointlMax = 100;

	var argParamMax = {
		'MOUTH': 100,
		'BREAST': 100,
		'SEX': 100,
	};

	var argValList = {
		'SEX': TS_GameConfig.SexNumVal,
		'SPOINT': TS_GameConfig.Spoint,
		'MPOINT': TS_GameConfig.Mpoint,
	};

	//****************************************************************************
	// ステータス追加
	//****************************************************************************
	var _TS_ExtStatus_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function () {
		_TS_ExtStatus_Game_Actor_initMembers.call(this);

		this._mLewd = 0;		// 淫乱度
		this._mPoly = 0;		// 知名度
		this._mSpoint = 0;		// S度
		this._mMpoint = 0;		// M度
		this._mSMid = 'N';			// SM度のID

		// 各部位の開発度、相手
		this._mMouth = {
			'val': 0,
			'first': '',
			'last': '',
			'num': 0,
		};

		this._mBreast = {
			'val': 0,
			'first': '',
			'last': '',
			'num': 0,
		};

		this._mHip = {
			'val': 0,
			'first': '',
			'last': '',
			'num': 0,
		};

		// 稼ぎ先のリスト
		this._mWork = {};
		var array = TS_GameConfig.WorkList;
		for (var i = 0; i < array.length; i++) {
			var work = array[i];
			this._mWork[work] = false;
		}

		//this._mFinish  = 0;		// 射精された回数
		//this._mSperm   = 0;		// 射精された精液量
		//this._mFirst   = '';	// 処女を奪った相手
		//this._mDevelop = 0;		// 開発度
		//this._mVegina  = 0;		// 股間の状態
	};

	Game_Actor.prototype.Lewd = function () {
		return this._mLewd;
	};


	Game_Actor.prototype.addLewd = function (val) {


		this._mLewd += val;

		// 範囲内に収める
		var max_val = argLewdMax;
		this._mLewd = Math.min(this._mLewd, max_val);
		this._mLewd = Math.max(this._mLewd, 0);

		// 変数に保存
		//var val_id = argActorLewdVal[this.name()];
		var val_id = 32;
		if (val_id != null) {
			$gameVariables.setValue(val_id, this._mLewd);

		}
	};

	Game_Actor.prototype.addPoly = function (val) {
		this._mPoly += val;

		// 範囲内に収める
		var max_val = argPolyMax;
		this._mPoly = Math.min(this._mPoly, max_val);
		this._mPoly = Math.max(this._mPoly, 0);

		// 変数に保存
		/*
		var val_id = argActorLewdVal[this.name()];
		if(val_id != null){
			$gameVariables.setValue(val_id, this._mPoly);
			
		}
		*/
	};

	Game_Actor.prototype.addPoint = function (type, val) {

		type = type.toUpperCase();

		var new_val = 0;
		var max_val = argPointlMax;

		switch (type) {
			case 'SPOINT':
				new_val = this._mSpoint;
				break;
			case 'MPOINT':
				new_val = this._mMpoint;
				break;
		}
		new_val += val;

		// 範囲内に収める
		new_val = Math.min(new_val, max_val);
		new_val = Math.max(new_val, 0);

		switch (type) {
			case 'SPOINT':
				this._mSpoint = new_val;
				break;
			case 'MPOINT':
				this._mMpoint = new_val;
				break;
		}

		/*
		var key = null;
		if(this._mSpoint > this._mMpoint){
			var num = TS_Function.lineCheckArray(TS_GameConfig.ProfileChange,this._mSpoint);
			if(num > 0){
				key = 'S' + num;
			}
		}else if(this._mSpoint < this._mMpoint){
			var num = TS_Function.lineCheckArray(TS_GameConfig.ProfileChange,this._mMpoint);
			if(num > 0){
				key = 'M' + num;
			}
		}
		
		if(key){
			this.setProfileData(key);
		}
		*/

		// 変数に保存
		var val_id = argValList[type];
		if (val_id != null) {
			$gameVariables.setValue(val_id, new_val);
		}
	};

	Game_Actor.prototype.addParam = function (type, val, name, num) {

		num = num || 0;
		name = name || '';

		var param = null;
		type = type.toUpperCase();
		switch (type) {
			case 'MOUTH':
				param = this._mMouth;
				break;
			case 'BREAST':
				param = this._mBreast;
				break;
			case 'SEX':
				param = this._mHip;
				break;
		}



		// 範囲内に収める
		param.val += val;
		var max_val = argParamMax[type];
		param.val = Math.min(param.val, max_val);
		param.val = Math.max(param.val, 0);

		// 回数追加
		param.num += num;

		// 相手の名前を入れる
		if (name != '' && name != '無し') {
			if (param.first == '') {
				param.first = name;
			}
			param.last = name;

			// SEXの場合は処女判定追加
			if (type == 'SEX') {
				if (!$gameSwitches.value(TS_GameConfig.argVirginSwi)) {
					$gameSwitches.setValue(TS_GameConfig.argVirginSwi, true);
				}

				// SEXの回数は変数に入れる
				$gameVariables.setValue(TS_GameConfig.SexNumVal, param.num);
			}
		}
		// 変数に保存
		/*
		var val_id = argActorLewdVal[this.name()];
		if(val_id != null){
			$gameVariables.setValue(val_id, this._mPoly);
			
		}
		*/
	};

	Game_Actor.prototype.maxParam = function () {
	 	$gameVariables.setValue(TS_GameConfig.SexNumVal, 999);
		$gameVariables.setValue(TS_GameConfig.Spoint, 999);
		$gameVariables.setValue(TS_GameConfig.Mpoint, 999);

	};

	Game_Actor.prototype.getLewdRate = function () {
		return this._mLewd / argLewdMax;
	};
	Game_Actor.prototype.getPolyRate = function () {
		return this._mPoly / argPolyMax;
	};

	Game_Actor.prototype.setProfileData = function (type) {
		if (this._mSMid == type) return;

		this._mSMid = type;
		var data = TS_GameConfig.ProfileList[type];
		if (data) {
			this.setNickname(data.nickname);
			this.setProfile(data.profile);
		}

	}

	//****************************************************************************
	// ステータス画面変更
	//****************************************************************************


	// ○プラグインコマンド拡張
	var _TS_ExtStatus_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_TS_ExtStatus_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'ExpStatus') {

			var actor = $gameActors.actor(1);

			if (!actor) {
				console.log('No Data:' + args[0]);
				return;
			}

			switch (args[1].toUpperCase()) {
				case 'LEWD':
					// 淫乱度
					actor.addLewd(parseInt(args[2]));
					break;
				case 'POLY':
					// 知名度
					actor.addPoly(parseInt(args[2]));
					break;
				case 'NORMAL':
					// 知名度
					actor.addNormal(parseInt(args[2]));
					break;
				case 'SPOINT':
				case 'MPOINT':
					// SM度
					actor.addPoint(args[1], parseInt(args[2]));
					break;
				case 'MOUTH':
				case 'BREAST':
				case 'SEX':
					// H用パラメーター
	
					actor.addParam(args[1], parseInt(args[2]), args[3], parseInt(args[4]));
					break;

				case 'WORK':
					// 仕事発見
					actor._mWork[args[2]] = true;
					break;
			}
		}
	};


})();
