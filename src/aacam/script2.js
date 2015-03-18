window.onload = function() {
  var camBtn = document.getElementById('cam_btn');
  var grayBtn = document.getElementById('gray_btn');
  var aacam = new AACAM();

  camBtn.addEventListener('click', function(e) {
    aacam.showVideo();
    e.preventDefault();
    return false;
  });
};

// カメラクラスの作成
var AACAM = function() {
    this.cvs = document.getElementById("cv");
    this.ctx = this.cvs.getContext("2d");
    this.btn = document.getElementById("btn");　        //ボタンハンドラ
    this.video = document.getElementById("video");  //ビデオハンドラ
    this.w = this.cvs.width;                                   // canvusの幅
    this.h = this.cvs.height;                                  // canvusの高さ
    this.gray = new Uint8ClampedArray( this.w * this.h );    // グレースケール画像格納
    this.btnflag = true;                                   // ボタンの判定
    this.aa = new AA(); // AAの初期化
    this.aaflag = true;
};

// カメラクラスの設定
AACAM.prototype = {

  // カラー画像をグレースケール画像に変換
  colorToGray : function(color, gray){
    for (var i = 0; i < color.length; i += 4) {
      gray[i/4] = 0.299*color[i+0] + 0.587*color[i+1] + 0.114*color[i+2];    // グレースケール値を計算
    }
  },

  // グレースケール画像を描画
  drawGrayImg : function(im, gray, ctx){
    var n = gray.length*4;
    var color = new Uint8ClampedArray(n);
    // グレースケールからカラーに変換
    for (var i = 0; i < n; i += 4){
      color[i+0] = gray[i/4];
      color[i+1] = gray[i/4];
      color[i+2] = gray[i/4];
      color[i+3] = 255;
    }
    im.data.set(color); // imgDataに結果を設定する
    ctx.putImageData(im, 0, 0); // 画像の描画
  },

  // カメラ映像の描画
  showVideo : function(){
    var _self = this;
   
    // Videoタグ
    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getMedia ({ video:true, audio:true }, function(stream) { this.video.src = window.URL.createObjectURL(stream); }, function(err){console.log(err);});
   
    //ボタンイベント処理
    this.btn.onclick = function(){
      if (_self.btnflag) {
        _self.video.play(); // ビデオ再生
        requestAnimationFrame(function() {
          _self.onFrame(); // カメラ映像の表示開始
        });
        _self.btnflag = false;
      }
    };
  },

  // グレースケール画像を再帰的に出力する
  onFrame : function() {
//     var _self = this;
//     this.ctx.drawImage(this.video, 0, 0, this.w, this.h); // 動画のフレームをcanvusに描画
//     var im = this.ctx.getImageData(0, 0, this.w, this.h); // canvasから画像データを取得
//     this.colorToGray(im.data, this.gray);                 // カラー画像をグレースケールに変換
//     requestAnimationFrame(function() {
//       _self.onFrame(); // 再帰
//     });
//     this.drawGrayImg(im, this.gray, this.ctx);            // グレースケール画像を描画     
    if(this.aaflag) this.drawAA();
  },

  drawAA : function() {
    var _self = this;
    console.log('hello');
    setInterval(function() {
      _self.aa.init(_self.video);
      var _str = _self.aa.getHtmlString();
      document.getElementById("target").innerHTML  = _str;
    }, 300);
    if(this.aaflag) this.aaflag = false;
  }
};













setTimeout(function(){
  
  var img = document.createElement("img");
  
  img.src = "data:image/jpeg;base64,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";
  
},0);


// AAクラスの作成
var AA = function(){
  
  this.image;
  this.lines = [];
  this.random = true;
  
};

// AAクラスの設定
AA.prototype = {

  // 初期化  
  init : function(video){
    
    var imageData = this._convertToImageData(video);
    var data = imageData.data; // RGBA情報を配列で取得する
    var i = 0,
      l = h,
      w = imageData.width,
      h = imageData.height;
    var lines = [],
      line;

    data = this._canvasPixelArrayToArray(data);
    
    for(;i<h;i++){
      line = new AALine( data.splice(0,4*w) );
      lines.push(line);
    }
    
    this.lines = lines;
  },

  // // 初期化  
  // init : function(image){
  //   var imageData = this._convertToImageData(image);
  //   var data = imageData.data; // RGBA情報を配列で取得する
  //   var i = 0,
  //     l = h,
  //     w = imageData.width,
  //     h = imageData.height;
  //   var lines = [],
  //     line;
    
  //   data = this._canvasPixelArrayToArray(data);
    
  //   for(;i<h;i++){
  //     line = new AALine( data.splice(0,4*w) );
  //     lines.push(line);
  //   }
    
  //   this.lines = lines;
  // },

  // 
  getString : function() {
    if(this.random) this._changeStringList();
    var i = 0,
      l = this.lines.length,
      str = "";
    for(;i<l;i++) str += this.lines[i].toString();
    return str;
  },

  // 
  getHtmlString : function() {
    if(this.random) this._changeStringList();
    var i = 0,
      l = this.lines.length,
      str = "";
    for(;i<l;i++) str += this.lines[i].toHtmlString();
    return str;
  },

  // キャンバスの描画
  _convertToImageData : function(video){
    // var video = document.getElementById('v');
    var c = document.createElement("canvas");
    c.width  = video.width;
    c.height = video.height;
    var cx = c.getContext("2d");
    var w = video.width,
      h = video.height;
    // cx.drawImage(image,0,0,w,h);
    cx.drawImage(video,0,0,w,h);
    // console.log(video);
    var imageData = cx.getImageData(0,0,w,h);
    console.log(imageData);
    return imageData;
  },

  // // キャンバスの描画
  // _convertToImageData : function(image){
  //   var c = document.createElement("canvas");
  //   c.width  = image.width;
  //   c.height = image.height;
  //   var cx = c.getContext("2d");
  //   var w = image.width,
  //     h = image.height;
  //   cx.drawImage(image,0,0,w,h);
  //   var imageData = cx.getImageData(0,0,w,h);
  //   return imageData;
  // },

  // アスキーアートにする文字列を入れ替える
  _changeStringList : function(){
    var master = [
      [")",">","*"],
      ["c"],
      ["?"],
      ["+"],
      ["[","]","\\"],
      ["!","|"],
      [";",":"],
      [",","-"],
      ["."],
      ["'","`"]
    ];
//     var master = [
//       ["$","M","@"],
//       ["M","W"],
//       ["%","#"],
//       ["8","9"],
//       ["D","S","Q"],
//       ["Z","V","E"],
//       ["U","O","C"],
//       ["b","d","k"],
//       ["+","t","y"],
//       ["(","/",")"],
//       ["[","]"],
//       ["i","l"],
//       ["^","~"],
//       ["`"],
// //      [" "]
//     ];
    var i = 0, l = master.length;
    var list = [];
    for(;i<l;i++){      
      list.push( this._pickRandom(master[i]) );
    }
    AADot.prototype.stringList = list;
  },

  // ランダムの値を返す
  _pickRandom : function(array){
    var l = array.length;
    return array[ ~~(Math.random() * l) ];
  },

  // キャンバスRGBA情報の配列データひとつを配列に格納する
  _canvasPixelArrayToArray : function(cpa) {    
    var i = 0, l = cpa.length;
    var r = [];
    for(;i<l;i++) r.push(cpa[i]);
    return r;
  }
  
  
};

// AALineクラスの初期化
var AALine = function (imageData) {
  
  this.dots;
  if(imageData) this.init(imageData);
  
};

// AALineクラスの設定
AALine.prototype = {
  
  // 初期化
  init : function(imageData){
    
    var i = 0,
      l = imageData.length;
    
    var dots = [];
    
    for(;i<l;i+=4){
      
      var dot = new AADot(imageData[i],imageData[i+1],imageData[i+2],imageData[i+3]);
      dots.push(dot);
    }
    
    this.dots = dots;
    
  },

  // 配列をひとつの文字列に結合して返す
  toString : function(){
    
    var i = 0,
      l = this.dots.length,
      str = '';
    
    for(;i<l;i++) str += this.dots[i].toString();
    
    return str + '\r\n';
    
  },

  // AADotクラスで出力されるHTMLを、1列分結合する
  toHtmlString : function(){
    
    var i = 0,
      l = this.dots.length,
      str = '';
    
    // HTMLコードを結合する
    for(;i<l;i++) str += this.dots[i].toHtmlString(); // AADotクラスのtoHtmlStringメソッドを呼び出す
    
    return str + '<br>';
    
  }
  
};


// AADotクラスの初期化
var AADot = function(r,g,b,a){
  
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  
};

// AADotクラスの設定
AADot.prototype = {
  stringList : ["$","M","%","8","D","Z","U","b","+","(","[","i","^","`"],

  // 文字列に変換する
  toString : function(){
    
    var l = this.stringList.length;
    var b = this.getBrightness();
    // Math.floor((明度 * stringListの配列数) + 明度を上げるための定数)
    var s = this.stringList[~~(b*(l-1)+0.5)];
    
    return s;
    
  },

  // 色を指定したHTMLを出力する
  toHtmlString : function(){

    // var s = '<span style="color:rgb(' + this.r + ',' + this.g +',' + this.b + ');">' + this.toString() + "</span>";

    var brightness = this.getBrightness();    
    var s = '<span style="color:rgb(' + brightness + ',' + brightness +',' + brightness + ');">' + this.toString() + "</span>";
    
    return s;
    
  },

  // 明度を求める
  getBrightness : function(){
    
    var t = this.r + this.g + this.b;
    
    return t / 765;
    
  },
};