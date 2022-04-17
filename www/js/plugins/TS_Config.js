//=========================================================
// Config
//=========================================================

/*:ja
 * @plugindesc
 * システム設定
 */

var TS_GameConfig = TS_GameConfig || {};



TS_GameConfig.HeroineName = 'サクラ';
TS_GameConfig.FaceIndexList = [
	30,
	60,
	100
];


// 立ち絵切り替え用の正規表現
TS_GameConfig.NoteLibidoReg = /LB: (.*) (.*)/i;


// スイッチ

//TS_GameConfig.SwitchBattleTutorial2 = 93;
//TS_GameConfig.SwitchBattleTutorial2View = 94;

// 回想用
TS_GameConfig.argRpModeSwi = 11;
TS_GameConfig.argRpVirginSwi = 12;

// 処女用のスイッチ
// ONなら破瓜済み
TS_GameConfig.argVirginSwi = 61;

// 変数

// 言語用
// 0：日本語　1：英語　2：中国語
TS_GameConfig.LanguageVal = 11;

TS_GameConfig.VariableEventLevel = 46;
TS_GameConfig.VariableEventEnemy = 48;
TS_GameConfig.SexNumVal = 38;
TS_GameConfig.Spoint = 39;
TS_GameConfig.Mpoint = 40;

// アルバイト先一覧
TS_GameConfig.WorkList = [
	'コンビニ',
	'パン屋',
	'パンスト',
	'おっぱいパブ',
	'VR体験',
	'オカ研',
	'売春_フェラ',
	'売春_本番',
	'ブルセラ',
];

TS_GameConfig.WorkSwiId = {
	'コンビニ':45,
	'パン屋':44,
	'パンスト':42,
	'おっぱいパブ':47,
	'VR体験':46,
	'オカ研':46,
};


TS_GameConfig.CosList = [
	'私服',
	'制服',
	'体操着',
	'パン屋制服',
	'コンビニ制服',
	'バニー',
	'ゴージャス',
	'下着',
	'裸',
];

TS_GameConfig.CosSwiId = {
	'私服'         : 91,
	'制服'         : 92,
	'体操着'       : 93,
	'パン屋制服'   : 94,
	'コンビニ制服' : 95,
	'バニー'       : 96,
	'ゴージャス'   : 97,
	'下着'         : 98,
	'裸'           : 99,
};

TS_GameConfig.CosDbId = {
	'私服'         : 2,
	'制服'         : 3,
	'体操着'       : 6,
	'パン屋制服'   : 5,
	'コンビニ制服' : 7,
	'バニー'       : 8,
	'ゴージャス'   : 9,
	'下着'         : 10,
	'裸'           : 12,
};

// ニックネームとプロフィール

TS_GameConfig.ProfileList = {
	'N':{
		'nickname' : '貧乏女子校生',
		'profile' : '',
		'image': '01',
	},
	/*
	'S1':{
		'nickname' : 'いじめっ娘',
		'profile' : '',
		'image': '02',
	},
	'S2':{
		'nickname' : '夜の女王様',
		'profile' : '',
		'image': '03',
	},
	'M1':{
		'nickname' : 'いじめられっ娘',
		'profile' : '',
		'image': '04',
	},
	'M2':{
		'nickname' : '逆らえない身体',
		'profile' : '',
		'image': '05',
	},
	*/
};

TS_GameConfig.ProfileChange = [
	30,
	70,
	100,
];

// 装飾が付けれる服装
TS_GameConfig.CheckDecCos = [
	'制服',
	'私服',
	'体操着',
	'パン屋制服',
	'コンビニ制服',
	'ゴージャス',
];
	

// 変換言語
TS_GameConfig.LanguageList = {
	Shutdown : [
		'シャットダウン',
		'shutdown',
		'结束',
	],
	
	Dash : [
		'常時ダッシュ',
		'shutdown',
		'常用设置',
	],
	
	
	FullScreen : [
		'フルスクリーンで起動',
		'shutdown',
		'全屏启动',
	],
	
	KeyConfig : [
		'キーコンフィグ',
		'shutdown',
		'按键配置',
	],
	
	Animation : [
		'アニメーション再生',
		'shutdown',
		'播放动画',
	],
	
	KeyConfigDefault : [
		'デフォルトレイアウト',
		'shutdown',
		'播放动画',
	],
	
	KeyConfigDefaultHepl : [
		'キーボード設定をデフォルトに戻します',
		'shutdown',
		'播放动画',
	],
	
	KeyConfigLayout : [
		'WASDレイアウト',
		'shutdown',
		'播放动画',
	],
	
	KeyConfigLayoutHepl : [
		'キーボードをWASDレイアウトに変更します',
		'shutdown',
		'播放动画',
	],
	
	KeyConfigFinish : [
		'コンフィグを完了',
		'shutdown',
		'播放动画',
	],
	
	KeyConfigFinishHelp : [
		'キーボードのコンフィグを完了しますか？',
		'shutdown',
		'播放动画',
	],
	KeyConfigHelp : [
		'このキーのコンフィグを変更しますか？',
		'shutdown',
		'播放动画',
	],
	
	
	EquipFinish : [
		'戻る',
		'shutdown',
		'返回',
	],
	
	EquipEmpty : [
		'＜空き＞',
		'shutdown',
		'＜空＞',
	],
}

//TS_Function.getLanguage('FullScreen')

