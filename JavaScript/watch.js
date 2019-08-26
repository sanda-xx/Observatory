//PHPから配信者のIDを取得する
function GetStreamDataBase(){
	var res="";
	//httpリクエストを送る
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://sanda-lab1.sakura.ne.jp/php/StreamerData.php", true);
	xhr.responseType = "json";
	//リクエスト受け取り
	xhr.onload = function(){
		var js = this.response;
		console.log(js);
		//ユーザーIDと人数を取得
		res = js.ID;
		var userNames = res;
		var member = res.length;
		var i=0;
		//配信エリア生成
		/*
		var Area = document.getElementById("View-Area");
		var spaceTitle;
		var spaceSum;
		
		for(i=1; i<member+1; i++) {
			//配信エリア生成
			spaceTitle = "<div id=\"title"+i+"\"> </div>";
			spaceSum = "<div id=\"sum"+i+"\"> </div>";
			Area.innerHTML += "<div id=\"stream"+i+"\">" + spaceTitle + spaceSum + "</div>";
		}
		*/
		
		for(i=0; i<member; i++) {
			//stream配信を表示
			StreamView(userNames[i],i+1);
		}
	};
	//エラー処理
	xhr.onerror = function(error){
		console.log(error.target.status);
		alert("エラー:" + error.target.status);
	};
	xhr.send();
}
//配信者のIDを元にツィッチから配信情報を取得して表示する
function StreamView(userName,num){
	//httpリクエストを送る
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.twitch.tv/helix/streams?user_login="+userName, true);
	xhr.responseType = "json";
	xhr.setRequestHeader("Client-ID", "yehfe1m6x9l4n2431ewq9e1i3092qp");
	//リクエスト受け取り
	xhr.onload = function(){
		var title_ID = document.getElementById("title"+num);
		var sum_ID = document.getElementById("sum"+num);
		var json = this.response;
		//オフラインか判断
		if(json.data[0] == null){
			var url_data = "../image/offline.png?";
			title_ID.innerHTML = "<p1>"+userName+"</p1>"+"<p2>OFFLINE</p2>"
			
			sum_ID.innerHTML =  "<a href="+"https://www.twitch.tv/"+userName+">"+"<img src="+ url_data + ">"+"</a>";
			
		}else{
			console.log(json);
			//タイトルとURL取得
			var title_data = json.data[0].title;
			var url_data = json.data[0].thumbnail_url;
			title_ID.innerHTML = "<p1>"+userName+"</p1>"+"<p3>"+title_data+"</p3>";
			//大きさ指定
			url_data = url_data.replace("{width}","250");
			url_data = url_data.replace("{height}","190");
			sum_ID.innerHTML =  "<a href="+"https://www.twitch.tv/"+userName+">"+"<img src="+ url_data + ">"+"</a>";
		}
	};
	//エラー処理
	xhr.onerror = function(error){
		console.log(error.target.status);
		alert("エラー:" + error.target.status);
	};
	xhr.send();
}
