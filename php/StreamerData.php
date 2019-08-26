
<?php

	//MySQLへの接続
	$host = "";
	$username = "";
	$passwd = "";
	$dbname = "";
	$arry;
	$count = 0;

	//接続処理
	$link = mysqli_connect($host,$username,$passwd);
	if (!$link) {
		die('接続失敗'.mysqli_error());
	}
	//print('<p>接続成功</p>');
	$db_selected = mysqli_select_db( $link,$dbname);
	if (!$db_selected){
		die('データベース接続失敗'.mysqli_error());
	}
	//print('<p>データベース接続成功</p>');

	//UTF8指定
	mysqli_set_charset('utf8');
	// MySQLの処理
	$result = mysqli_query($link ,"SELECT id from StreameData");
	if (!$result) {
		die('クエリーが失敗しました。'.mysqli_error());
	}

	while ($row = mysqli_fetch_assoc($result)) {
		//IDを取得する
		//print('<p>');
		//print('id='.$row["id"]);
		//print('</p>');
		$arry[$count] = $row["id"];
		$count++;
	}
	//$json["ID" => $arry];
	//$json = array("ID"=>array($arry));
	$json = array("ID"=>$arry);

	//切断処理
	$close_flag = mysqli_close($link);
	if ($close_flag){
		//print('<p>切断</p>');
	}
	header("Access-Control-Allow-Origin: *");
	//header('Content-Type: application/json');
	//配列を返す
	echo json_encode($json);