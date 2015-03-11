/* Write JavaScript here */// カラー画像をグレースケール画像に変換
function colorToGray(color, gray) {
  for (var i = 0; i < color.length; i += 4) {
    gray[i/4] = 0.299*color[i+0] + 0.587*color[i+1] + 0.114*color[i+2];    // グレースケール値を計算
  }
}
 
// グレースケール画像を描画
function drawGrayImg(im, gray, ctx){
  var n = gray.length*4;
  var color = new Uint8ClampedArray(n);
  // グレースケールからカラーに変換
  for (var i = 0; i < n; i += 4){
    color[i+0] = gray[i/4];
    color[i+1] = gray[i/4];
    color[i+2] = gray[i/4];
    color[i+3] = 255;
  }
  im.data.set(color);                           // imgDataに結果を設定する
  ctx.putImageData(im, 0, 0);               // 画像の描画
}
 
// カメラ映像の描画
function showVideo(){
  // 変数の定義
  var cvs = document.getElementById("cv");
  var ctx = cvs.getContext("2d");
  var btn = document.getElementById("btn");　        //ボタンハンドラ
  var video = document.getElementById("video");  //ビデオハンドラ
  var w = cvs.width;                                   // canvusの幅
  var h = cvs.height;                                  // canvusの高さ
  var gray = new Uint8ClampedArray(w*h);    // グレースケール画像格納
  var btnflag = true;                                   // ボタンの判定
 
  // Videoタグ
  navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  navigator.getMedia ({ video:true, audio:true }, function(stream) { video.src = window.URL.createObjectURL(stream); }, function(err){console.log(err);});
 
  //ボタンイベント処理
  btn.onclick = function(){
    if (btnflag) {
      video.play();                                     // ビデオ再生
      requestAnimationFrame(onFrame);   // カメラ映像の表示開始
      btnflag = false;
    }
  };
 
  // 繰り返し行う処理    
  var onFrame = function () {   
    ctx.drawImage(video, 0, 0, w, h);           // 動画のフレームをcanvusに描画
    var im = ctx.getImageData(0, 0, w, h);  // canvusから画像データを取得
    colorToGray(im.data, gray);                 // カラー画像をグレースケールに変換
    requestAnimationFrame(onFrame);         // 再帰
    drawGrayImg(im, gray, ctx);                 // グレースケール画像を描画 
  };
}