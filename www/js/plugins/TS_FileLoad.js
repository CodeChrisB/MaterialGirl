//=========================================================
// TS_FileLoad
//=========================================================

/*:ja
 * @plugindesc
 * 日本語名からファイルを呼び出す
 */

var TS_FileLoad = TS_FileLoad || {};

TS_FileLoad.NOT = /.*[^\x01-\x7E].*$/;

TS_FileLoad.AdvPictChange = function(name){
	
	if(name == '') return name;
	
	var list = TS_FileLoad.AdvPictList;
	for(var i=0, len=list.length; i<len; i++){
		
		if(!name.match(this.NOT)) break;
		
		var rep = list[i];
		name = name.replace(rep[0],rep[1]);
	}
	
	return name;
}

TS_FileLoad.SeChange = function(name){
	var new_name = this.SeFileList[name.name];
	if(new_name){
		name.f = new_name;
		name.name = new_name;
	}
	return name;
}

TS_FileLoad.get = function(name){
	var output = this.FileList[name] || name;
	return output;
}

// ファイルを呼び出す時に変換

var _TS_FileLoad_ImageManager_loadPicture = ImageManager.loadPicture;
ImageManager.loadPicture = function(filename, hue) {
	filename = TS_FileLoad.AdvPictChange(filename);
	return _TS_FileLoad_ImageManager_loadPicture.apply(this, arguments);
};

var _TS_FileLoad_ImageManager_loadSystem = ImageManager.loadSystem;
ImageManager.loadSystem = function(filename, hue) {
	filename = TS_FileLoad.AdvPictChange(filename);
	return _TS_FileLoad_ImageManager_loadSystem.apply(this, arguments);
};

var _TS_FileLoad_ImageManager_loadCharacter = ImageManager.loadCharacter;
ImageManager.loadCharacter = function(filename, hue) {
	filename = TS_FileLoad.AdvPictChange(filename);
	return _TS_FileLoad_ImageManager_loadCharacter.apply(this, arguments);
};

var _TS_FileLoad_ImageManager_loadFace = ImageManager.loadFace;
ImageManager.loadFace = function(filename, hue) {
    filename = TS_FileLoad.AdvPictChange(filename);
	return _TS_FileLoad_ImageManager_loadFace.apply(this, arguments);
};

var _TS_FileLoad_AudioManager_playSe = AudioManager.playSe;
AudioManager.playSe = function(se) {
	se = TS_FileLoad.SeChange(se);
	_TS_FileLoad_AudioManager_playSe.apply(this, arguments);
};





// 変換言語
TS_FileLoad.FileList = {
	'サクラ' : 'sakura',
	
	'コンビニ':'job0',
	'パン屋':'job1',
	'パンスト':'job2',
	'おっぱいパブ':'job3',
	'VR体験':'job4',
	'オカ研':'job5',
	'売春_フェラ':'job6',
	'売春_本番':'job7',
	'ブルセラ':'job8',
	
	'コンビニ制服':'conveni',
	'パン屋制服':'bakery',
	'体操着':'gym',
	'下着':'under',
	'裸':'naked',
	'バニー':'bunny',
	'ゴージャス':'high',
	'私服':'normal',
	'制服':'school',
	'パジャマ':'pajama',

}

TS_FileLoad.AdvPictList = [
	['サクラ','sakura'],
	
	['コンビニ制服','conveni'],
	['パン屋制服','bakery'],
	['体操着','gym'],
	
	['VR男','vr'],
	['おっぱいパブオーナー','owner'],
	['おっパブ男','man'],
	['ダンディーなおじさん','mister2'],
	['おじさん','mister'],
	['オーナー','owner2'],
	['ナイスガイ','man2'],
	['オカ研・部長','occult'],
	['ナンパ男2','man4'],
	['ナンパ男','man3'],
	['パン屋','manager'],
	['コンビニ店長','manager2'],
	['サラリーマン','worker'],
	['モブ男１','man5'],
	['学校_プレート','plate'],
	['客','customer'],
	
	['黒田','kuroda'],
	['佐竹','satake'],
	['司_体操服','tukasa2'],
	['司_母','tukasa_mother'],
	['司','tukasa'],
	['女教師','teacher2'],
	['教師','teacher'],
	['女子学生01_体操服','student3'],
	['女子学生01','student2'],
	['女子学生02_体操服','student4'],
	['女子学生03_体操服','student5'],
	['女生徒','student6'],
	['新婚の会社員','worker2'],
	['須東','sudou'],
	['青木','aoki'],
	['前田','maeda'],
	['男子学生01_体操服','student8'],
	['男子学生01','student7'],
	['男子学生02_体操服','student9'],
	['男子学生03_体操服','student10'],
	['学生01','student'],
	['朝彦','asahiko'],
	['白衣の男','researcher'],
	['白沢','shirosawa'],
	['不良A','yankeeA'],
	['不良B','yankeeB'],
	['服屋店主','cloth'],
	['牧岡_全裸','makioka2'],
	['牧岡','makioka'],
	
	
	['下着','under'],
	['バニー','bunny'],
	['ゴージャス','high'],
	['私服','normal'],
	['制服','school'],
	['パジャマ','pajama'],
	['裸','naked'],
	
	['パンスト','panty'],
	
	['胸','breast'],
	['全体','all'],
	
	['哀しみ','sad'],
	['悔しい','regre'],
	['驚き','surprise'],
	['考え中','think'],
	['笑み','smile'],
	['怒り','anger'],
	['微笑','usually'],
	['無表情','express'],
	['羞恥','shame'],
	
	['催眠','saimin'],
	
	['頬','h'],
	
	['ビックリ','huki1'],
	['ハテナ','huki2'],
	['音符','huki3'],
	['赤面','huki4'],
	['汗','huki6'],
	['困惑','huki7'],
	['拒否','huki8'],
	['電球','huki9'],
	
	['ピンク','pink'],
	
	['格子','gate'],

];


// SE用
TS_FileLoad.SeFileList = {
	
	'「ウィーン」という機械音':'se0001',
	'「ドクンッ」という心音':'se0002',
	'「ドンッ」と突き飛ばす音':'se0003',
	'「ピチャピチャ」という水音':'se0004',
	'「ピッ」という電子音':'se0005',
	'「プシュー」という噴出音':'se0006',
	'おしっこが流れ出る音':'se0007',
	'お腹がなる音':'se0008',
	'お腹がなる音_重複':'se0009',
	'エアブロック':'se0010',
	'エラー':'se0011',
	'カーテン':'se0012',
	'キスループ':'se0013',
	'ゴング_1回':'se0014',
	'ゴング_複数回':'se0015',
	'ゴング＋歓声':'se0016',
	'シャッター音1':'se0017',
	'シャッター音2':'se0018',
	'シャッター音3':'se0019',
	'シャッター音4':'se0020',
	'シャッター音_連続':'se0021',
	'シャワー':'se0022',
	'スイッチ_テレビ':'se0023',
	'チャイム':'se0024',
	'チャックを下ろす音':'se0025',
	'チャックを下ろす音２':'se0026',
	'チャプチャプという水の音':'se0027',
	'チャージ':'se0028',
	'ティッシュ音':'se0029',
	'テレビ壊れる':'se0030',
	'ドアが開閉する音_教室':'se0031',
	'ドアが開閉する音_近い':'se0032',
	'ドアが開閉する音_遠い':'se0033',
	'ドアの開く音1':'se0034',
	'ドアの開く音2':'se0035',
	'ドアの開く音3':'se0036',
	'ドアの開く音_教室':'se0037',
	'ドアの開く音_鉄':'se0038',
	'ドアを叩く':'se0039',
	'ドアを激しく開く':'se0040',
	'ドアを閉める音':'se0041',
	'ドアを閉める音_教室':'se0042',
	'ドアを閉める音_鉄':'se0043',
	'ノック':'se0044',
	'バイブ':'se0045',
	'バイブ＋ピストン':'se0046',
	'バイブ＋高速ピストン':'se0047',
	'パイズリ・手コキ１':'se0048',
	'パイズリ・手コキ２':'se0049',
	'パイズリ・手コキ３':'se0050',
	'パトカー':'se0051',
	'パンストを破る':'se0052',
	'パンチ1':'se0053',
	'パンチ2':'se0054',
	'パンチ3':'se0055',
	'ビリオンショット':'se0056',
	'ビリオンハンド振り':'se0057',
	'ビリオンハンド攻':'se0058',
	'ビリオンハンド滅':'se0059',
	'ビリオンハンド起動':'se0060',
	'ビリオンハンド防':'se0061',
	'ビンタ1':'se0062',
	'ビンタ2':'se0063',
	'ビームライフル':'se0064',
	'ピストン':'se0065',
	'ピストン_水音なし':'se0066',
	'ピストン_激しい':'se0067',
	'ピストン_高速':'se0068',
	'ピストン（高速10秒）':'se0069',
	'ピンポン':'se0070',
	'フィニッシュ':'se0071',
	'ヘリ':'se0072',
	'ベッドがきしむ音':'se0073',
	'ベッドのきしみ3回':'se0074',
	'マシンガン':'se0075',
	'ミスター波':'se0076',
	'ミスターＺｏｗ':'se0077',
	'メール音':'se0078',
	'モニター_入':'se0079',
	'ルル起動':'se0080',
	'レーザーナイフ':'se0081',
	'レーザー銃':'se0082',
	'ローリング':'se0083',
	'ワープ':'se0084',
	'ワープアウト':'se0085',
	'人間射精':'se0086',
	'催眠最大':'se0087',
	'催眠行使':'se0088',
	'催眠魔法1発動の音':'se0089',
	'催眠魔法2発動の音':'se0090',
	'催眠魔法3発動の音':'se0091',
	'催眠魔法4発動の音':'se0092',
	'催眠魔法5発動の音':'se0093',
	'全絶頂':'se0094',
	'分子消滅':'se0095',
	'刺す':'se0096',
	'剛風':'se0097',
	'剣が弾かれる音':'se0098',
	'剣と剣がぶつかる音':'se0099',
	'剣構え01':'se0100',
	'呼び出し音':'se0101',
	'呼び出し音_終わり':'se0102',
	'喧騒':'se0103',
	'噴射':'se0104',
	'噴射_小':'se0105',
	'地鳴りの音':'se0106',
	'壁に「ドンッ」':'se0107',
	'壁当たり':'se0108',
	'学校チャイム':'se0109',
	'射精音':'se0110',
	'射精音2':'se0111',
	'射精音_3発':'se0112',
	'射精音_複数':'se0113',
	'射精音＋尿':'se0114',
	'射精音＋潮吹き':'se0115',
	'尻触り':'se0116',
	'尿':'se0117',
	'床にドサッ':'se0118',
	'強風の音':'se0119',
	'愛液1':'se0120',
	'愛液2':'se0121',
	'愛液3':'se0122',
	'愛液_ループ':'se0123',
	'愛液_電話':'se0124',
	'愛液３分':'se0125',
	'手を叩く':'se0126',
	'手コキ_低速':'se0127',
	'手マン':'se0128',
	'手マン_1':'se0129',
	'手マン_2':'se0130',
	'手マン_ループ':'se0131',
	'打撃音1':'se0132',
	'打撃音2':'se0133',
	'打撃音3':'se0134',
	'打撃音4':'se0135',
	'打撃音5':'se0136',
	'拍手':'se0137',
	'拍手喝采':'se0138',
	'拍手＋口笛':'se0139',
	'指挿入':'se0140',
	'挿入音':'se0141',
	'挿入音2':'se0142',
	'挿入音_複数':'se0143',
	'排泄1':'se0144',
	'排泄2':'se0145',
	'排泄3':'se0146',
	'排泄4':'se0147',
	'排泄5':'se0148',
	'排泄6':'se0149',
	'排泄7':'se0150',
	'携帯バイブ':'se0151',
	'携帯電話を切る1':'se0152',
	'携帯電話を切る2':'se0153',
	'携帯電話操作音':'se0154',
	'教室ドア閉':'se0155',
	'教室ドア開':'se0156',
	'斬る音':'se0157',
	'時空移動':'se0158',
	'暴れる音':'se0159',
	'最終確認':'se0160',
	'服を脱ぐ音':'se0161',
	'服を脱ぐ音1':'se0162',
	'服を脱ぐ音2':'se0163',
	'服を脱ぐ音3':'se0164',
	'本を開く':'se0165',
	'机にぶつかる音':'se0166',
	'校舎チャイム':'se0167',
	'歓声':'se0168',
	'歩く_近':'se0169',
	'歩く_遠':'se0170',
	'歩く・遠ざかる（室内・板）':'se0171',
	'歩く（革靴・アスファルト）':'se0172',
	'消火器':'se0173',
	'淫唇を開く音':'se0174',
	'湯のみを置く':'se0175',
	'潮吹き':'se0176',
	'潮吹き_電話':'se0177',
	'潮吹き＋尿':'se0178',
	'潰れる':'se0179',
	'激水音':'se0180',
	'炎が燃える音':'se0181',
	'炎が燃える音2':'se0182',
	'爆発1':'se0183',
	'爆発2':'se0184',
	'爆発3':'se0185',
	'爆発4':'se0186',
	'爆発5':'se0187',
	'玄関チャイムの音':'se0188',
	'王子登場':'se0189',
	'生徒たちの喧噪':'se0190',
	'産まれる':'se0191',
	'男子生徒たちの歓声':'se0192',
	'皿の割れる音':'se0193',
	'着信音1':'se0194',
	'着信音2':'se0195',
	'着信音3':'se0196',
	'着信音4':'se0197',
	'着地':'se0198',
	'締め付ける':'se0199',
	'自動車の走行音':'se0200',
	'街の喧騒':'se0201',
	'衣擦れの音':'se0202',
	'衣擦れの音1':'se0203',
	'衣擦れの音2':'se0204',
	'衣擦れの音3':'se0205',
	'衣擦れの音4':'se0206',
	'触手がうごめく音':'se0207',
	'触手射精':'se0208',
	'認証':'se0209',
	'警報':'se0210',
	'貞操帯を付ける':'se0211',
	'走る_コンクリート':'se0212',
	'走る_室内_板':'se0213',
	'走る_砂利':'se0214',
	'走る_近':'se0215',
	'走る_遠':'se0216',
	'走る_鉄板':'se0217',
	'走る_雪':'se0218',
	'起動音':'se0219',
	'蹴り1':'se0220',
	'蹴り2':'se0221',
	'逆噴射':'se0222',
	'逆噴射＋放尿':'se0223',
	'這いずり':'se0224',
	'速射':'se0225',
	'連打音':'se0226',
	'遠ざかる足音':'se0227',
	'選択肢決定':'se0228',
	'選択肢選択':'se0229',
	'銃声1':'se0230',
	'銃声2':'se0231',
	'銃声_ショットガン':'se0232',
	'銃声_連弾':'se0233',
	'銃構え':'se0234',
	'鋼鉄・叩きつけ':'se0235',
	'鎖1':'se0236',
	'鎖2':'se0237',
	'鎖3':'se0238',
	'鎖4':'se0239',
	'隔壁封鎖':'se0240',
	'雷の落ちる音':'se0241',
	'電マ':'se0242',
	'電子音1':'se0243',
	'電子音2':'se0244',
	'電子音3':'se0245',
	'電子音4':'se0246',
	'電撃1':'se0247',
	'電撃2':'se0248',
	'電話が切れるときの「ブツッ」1':'se0249',
	'電話が切れるときの「ブツッ」2':'se0250',
	'電話に出る':'se0251',
	'電車':'se0252',
	'非常ベル':'se0253',
	'風切り音1':'se0254',
	'風切り音2':'se0255',
	'風切音':'se0256',
	'骨の折れる音':'se0257',
	'高速回転':'se0258',
	'魔法起動':'se0259',
	

}
