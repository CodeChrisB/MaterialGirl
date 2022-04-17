//=========================================================
// TS_RandomWordSelect
//=========================================================

/*:ja
 * @plugindesc
 * ランダムで台詞選択
 */


var TS_RandomWordSelect = {};

TS_RandomWordSelect.WordList = [
	{
		// v(36) <= 4 //　変数：現在の曜日の値が4以下
		'word':[
			'[サクラ]「今日は\\C[2]学校\\C[0]に行こうかな……\\C[2]須東のセクハラ\\C[0]には気をつけないと」',
			"[SAKURA]「Should I go to\\C[2]school\\C[0]today?……don't really like the\\C[2]sexual harassment from Sudo.\\C[0]」",
			'[小櫻]「今天要不要去\\C[2]學校\\C[0]呢……\\C[2]須東那傢伙總是對我性騷擾……\\C[0]」',
		],
		'eval':'v(36) <= 4',
	},
	{
		// v(43) <= 0 //　変数：パンスト舐め：進行度の値が0以下
		'word':[
			'[サクラ]「……そういえば朝彦にもらった\\C[2]パンスト\\C[0]どうしよう？　\\C[2]履いて会ってみる\\C[0]のも良いかもね…」',
			"[SAKURA]「What should I do whit the\\C[2]pantyhose\\C[0]that Asahiko gave to me, maybe it's good to\\C[2]wear it during the date...\\C[0]」",
			'[小櫻]「要怎麼處理朝彦給我的這個\\C[2]絲襪\\C[0]呢……？　\\C[2]穿著去見他\\C[0]說不定不錯呢~…」',
		],
		'eval':'v(43) <= 0 && v(36) <= 4',
	},
	{
		// v(46) <= 0 //　変数：コンビニ：進行度の値が0以下
		'word':[
			'[サクラ]「バイト……探さないと。コンビニとかってどうなのかな…？　\\C[2]チラシ\\C[0]が街に貼ってあるかも…」',
			'[SAKURA]「I need to get a part time job. Might convenience store be a good choice? I should go look for \\C[2]flyers\\C[0]on the street.」',
			'[小櫻]「要找一份兼職才行……便利店好像不錯，去街上找找看\\C[2]傳單\\C[0]吧~…」',
		],
		'eval':'v(46) <= 0',
	},
	{
		// 条件なし
		'word':[
			'[サクラ]「パン屋のバイト……行ってみようかな」',
			'[SAKURA]「Should I try the part-time of a bakery?」',
			'[小櫻]「要不要……去麵包店打工呢……」',
		],
		'eval':'v(36) != 2',
	},
	{
		// 条件なし
		'word':[
			'[サクラ]「パン屋のバイト……行こうかな。まだ慣れてないし、\\C[2]失敗\\C[0]しないようにしないと」',
			"[SAKURA]「Should I try the part-time of a bakery? I'm still new there, just try not to \\C[2]fail.\\C[0]」",
			'[小櫻]「要不要……去麵包店打工呢……我還是新人，盡量不要\\C[2]犯錯誤……\\C[0]」',
		],
		'eval':'v(36) != 2',
	},
	{
		// s(204) == 0 //　スイッチ：科学部長の話がＯＦＦ
		'word':[
			'[サクラ]「……今日は学校に行こうかな。……そういえば、\\C[2]化学室\\C[0]の前に男子生徒がいた気が……」',
			'[SAKURA]「Should I go to school today?...was there a student in front of the \\C[2]lab?\\C[0]」',
			'[小櫻]「今天去學校好了， 話說……\\C[2]化學室\\C[0]前面是不是有個男生站在那裡………」',
		],
		'eval':'s(204) == 0 && v(36) <= 4',
	},
	{
		// v(81) <= 0 //　変数：催眠の値が0以下
		'word':[
			'[サクラ]「そういえば……学校の\\C[2]準備室\\C[0]で何か怪しいことをしている人がいるとか聞いた気が……」',
			'[SAKURA]「I heard something about people are doing weird stuff in the \\C[2]preparation room.\\C[0]」',
			'[小櫻]「有聽說學校的\\C[2]準備室\\C[0]有奇怪的人出入呢……」',
		],
		'eval':'v(81) <= 0 && v(36) <= 4',
	},
	{
		// v(47) <= 0 //　変数：ＶＲ：進行度の値が0以下
		'word':[
			'[サクラ]「今日は、歓楽街に行ってみようかな。\\C[2]奥の方の小道\\C[0]にゲーム会社があるらしいけど…本当かな？」',
			'[SAKURA]「Should I go to red light district today? There is a game company\\C[2]Path to the back\\C[0], is that true?」',
			'[小櫻]「今天要不要去紅燈區呢？\\C[2]後面小巷裡面\\C[0]好像有家遊戲公司啊……是不是真的？」',
		],
		'eval':'v(47) <= 0',
	},
	{
		// 条件なし
		'word':[
			'[サクラ]「……今日は公園に行ってみようかな。\\C[2]昼間\\C[0]は子供達が遊んでいるんだよね……」',
			'[SAKURA]「Should I go to Park today? Kids are playing there\\C[2]during day time.\\C[0]」',
			'[小櫻]「今天去公園看看吧，\\C[2]白天\\C[0]小孩子都會在那裡玩……」',
		],
		'eval':'true',
	},
	{
		// v(36) <= 4 //　変数：現在の曜日の値が4以下
		'word':[
			'[サクラ]「学校に行かなきゃ……そういえば、学校の階段を降りてる時って、たまに人がいるんだよね。下着が見えたりしてないか少し不安……」',
			'[SAKURA]「I must go to School now! .......I realize when I get down to the stairs, someone is there, did he saw my panty...?」',
			'[小櫻]「今天要去學校才行…………在學校下樓梯的時候下面的人能看到內褲嗎……？」',
		],
		'eval':'v(36) == 2',
	},
	
	{
		// v(44) <= 3 //　変数：司イジメ：進行度の値が3以下
		'word':[
			'[サクラ]「\\C[2]校舎裏\\C[0]たまに、声が聞こえる気がする……」',
			'[SAKURA]「Sometimes I can hear voices from the\\C[2]back of school building.\\C[0]」',
			'[小櫻]「\\C[2]學校後面\\C[0]時不時能聽到奇怪的聲音呢……」',
		],
		'eval':'v(44) <= 3 && v(36) <= 4',
	},
	{
		// s(210) == 0 //　スイッチ：ナンパされるの値がＯＦＦ
		'word':[
			'[サクラ]「\\C[2]歓楽街\\C[0]で、たまにいい匂いがする……あれがお酒の匂い……なのかな？」',
			'[SAKURA]「there is the good smell coming from the\\C[2]red light district\\C[0], is that the smell of the alcohol?」',
			'[小櫻]「\\C[2]紅燈區\\C[0]總有香味飄出來……那是酒的味道嗎……？」',
		],
		'eval':'s(210) == 0',
	},
	{
		// v(36) <= 2 //　変数：現在の曜日の値が2以下
		'word':[
			'[サクラ]「\\C[2]公園のトイレ\\C[0]たまに変な声が聞こえる気がする……」',
			'[SAKURA]「Sometimes I can hear voices from the\\C[2]toilet of the park.\\C[0]」',
			'[小櫻]「感覺\\C[2]公園的廁所\\C[0]時不時有奇怪的聲音傳出來……」',
		],
		'eval':'v(36) <= 2',
	},
	{
		// s(267) == 0 //　スイッチ：髪染所見の値がＯＦＦ
		'word':[
			'[サクラ]「\\C[2]美容院\\C[0]で髪の毛の色を染めるのも気分転換になるかな……」',
			"[SAKURA]「Let's do the hair coloring in the\\C[2]Beauty Salon\\C[0], it can help me adjust mood.」",
			'[小櫻]「去\\C[2]美容院\\C[0]染個頭髮吧……說不定能轉換一下心情。」',
		],
		'eval':'s(267) == 0 && v(32) >= 30',
	},
	{
		// v(49) == 0 //　変数：ホスト進行度の値が0以下
		'word':[
			'[サクラ]「\\C[2]歓楽街の北の方\\C[0]に何かお店があるみたい……だけど、ちょっとあの辺りは行き辛いかな」',
			"[SAKURA]「 there is a small shop located at \\C[2]North of the red light district\\C[0].....but I shouldn't go there....」",
			'[小櫻]「\\C[2]紅燈區的北邊\\C[0]好像是有一家什麼小店吧……但是一個人去好像很危險呢」',
		],
		'eval':'v(49) == 0',
	},
	{
		// s(206) == 0 //　スイッチ：おっぱぶ認知の値がＯＦＦ
		'word':[
			'[サクラ]「\\C[2]歓楽街\\C[0]のとこ、たまにバニーの恰好をした人を見るけど、よく人前であんな恥ずかしい恰好ができるよね？」',
			'[SAKURA]「\\C[2]In the red light district\\C[0], some people wear the bunny custom, looking at them makes me feel embarrassing.」',
			'[小櫻]「\\C[2]紅燈區\\C[0]有人穿著兔女郎的衣服……看上去好難為情啊……」',
		],
		'eval':'s(206) == 0',
	},
	{
		// s(215) == 0 //　スイッチ：高額バイト認知の値がＯＦＦ
		'word':[
			'[サクラ]「\\C[2]歓楽街の奥\\C[0]、大きなお屋敷があるみたい……どんな人が住んでるんだろう？」',
			'[SAKURA]「There is a big mansion\\C[2]back of the red light district\\C[0].....I wonder who is living there.」',
			'[小櫻]「\\C[2]紅燈區的後面\\C[0]有間大房子，很好奇誰會住在裡面呢。」',
		],
		'eval':'s(215) == 0',
	},
	{
		// v(32) >= 15 //　変数：淫乱度の値が15以上
		'word':[
			'[サクラ]「そういえば\\C[2]夜の校門前\\C[0]に不審者が出るって噂が…本当かな？」',
			'[SAKURA]「Some stranger were wandering\\C[2]in front of school gate at night,\\C[0]is that true.....?」',
			'[小櫻]「傳說會有人在\\C[2]晚上學校的門口\\C[0]徘徊……是真的嗎？」',
		],
		'eval':'v(32) >= 15',
	},
	{
		// v(36) <= 4 //　変数：現在の曜日の値が4以下
		'word':[
			'[サクラ]「学校の屋上には変な人たちがよくいるらしいけど…」',
			'[SAKURA]「Always have some stranger on the school roof.」',
			'[小櫻]「學校屋頂好像總是聚集了一些奇怪的人呢。」',
		],
		'eval':'v(36) <= 4',
	},
	{
		// 条件なし
		'word':[
			'[サクラ]「商店街は車の通りが多いから、急いでいる時は気を付けないと…」',
			'[SAKURA]「There are many cars in the shopping street, gonna be careful.」',
			'[小櫻]「商店街來往的車很多，要小心一點才行。」',
		],
		'eval':'true',
	},
	{
		// 条件なし
		'word':[
			'[サクラ]「そういえば\\C[2]ラブホテル\\C[0]の横にいつも立っているおじさんがいるとか…不審者？」',
			'[SAKURA]「There is always a man standing in front of the\\C[2]love hotel,\\C[0]how is he?」',
			'[小櫻]「話說\\C[2]汽車旅館\\C[0]前面一直站著的大叔他是誰……？危險人物？」',
		],
		'eval':'true',
	},
	{
		// v(32) >= 15 //　変数：淫乱度の値が15以上
		'word':[
			'[サクラ]「公園のトイレって襲われることが多いらしいし…気を付けないと」',
			'[SAKURA]「many people were attacked in the toilet of the park....gonna be careful.」',
			'[小櫻]「聽說好多人在公園的廁所被襲擊了。。。要小心點才行。」',
		],
		'eval':'v(32) >= 15',
	},
];



TS_RandomWordSelect.create = function() {
	// 表示するテキスト
	this.word = null;
	
	// 配列
	this.list = [];
	
	var reg_s = /s\(/g;
	var reg_g = /v\(/g;
	
	for(var i=0; i<this.WordList.length;i++){
		var data = this.WordList[i];
		
		data.eval = data.eval.replace(reg_s,'$gameSwitches.value(');
		data.eval = data.eval.replace(reg_g,'$gameVariables.value(');
		
		if( eval(data.eval) ){
			// テキスト追加
			var word = data.word[ConfigManager.langSelect];
			this.list.push(word);
		}
	}
	
	this.word = TS_Function.getRandomArray(this.list);
	
}

TS_RandomWordSelect.get = function() {
	return this.word;
}

TS_RandomWordSelect.view = function() {
	$gameMessage.add( $advSystem.viewMesAdjust(this.word) );
}

