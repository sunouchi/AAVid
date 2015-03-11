// URL http://jsdo.it/demouth/jb8w
// forked from demouth's "ASCII Art" http://jsdo.it/demouth/dxX2
setTimeout(function(){
  
  var img = document.createElement("img");
  
  img.onload = function(e){
    
    var aa = new AA();
    aa.init(img);
    aa.random = false;
    setInterval(function(){
      
      var master = [
        ["$","M","@"],
        ["M","W"],
        ["%","#"],
        ["8","9"],
        ["D","S","Q"],
        ["Z","V","E"],
        ["U","O","C"],
        ["b","d","k"],
        ["+","t","y"],
        ["(","/",")"],
        ["[","]"],
        ["i","l"],
        ["^","~"],
        ["`"],
        [" "]
      ];
      var p= Math.sin(new Date().getTime()*0.0015)*0.5+0.5;
      var i = 0, l = master.length;
      var max = ~~(l * p)+1;
      var list = [];
      for(;i<max;i++){
        
        list.push( AA.prototype._pickRandom(master[i+(l-max)]) );
        
      }
      AADot.prototype.stringList = list;
      
      
      
      AALine.prototype.toString = function(){
        
        var i = 0,
          l = this.dots.length,
          str = "";
        
        for(;i<l;i++){
          if(i<p*l){
          str += this.dots[i].toString();
          }else{
          str += (p<i/l-Math.random()*0.4) ? " " : this.dots[i].toString();
          }
        }
        
        
        str += '\r\n';
        
        return str;
        
      };
      
      var str = aa.getString();
      
      document.getElementById("target").textContent  = str;
      
    },100);
  };
  
  img.src = "data:image/jpeg;base64,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";
  
},0);


var AA = function(){
  
  this.image;
  this.lines = [];
  this.random = true;
  
};

AA.prototype = {
  
  init : function(image){
    
    var imageData = this._convertToImageData(image);
    var data = imageData.data;
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
  getString : function() {
    if(this.random) this._changeStringList();
    var i = 0,
      l = this.lines.length,
      str = "";
    for(;i<l;i++) str += this.lines[i].toString();
    return str;
  },
  getHtmlString : function() {
    if(this.random) this._changeStringList();
    var i = 0,
      l = this.lines.length,
      str = "";
    for(;i<l;i++) str += this.lines[i].toHtmlString();
    return str;
  },
  _convertToImageData : function(image){
    
    var c = document.createElement("canvas");
    c.width  = image.width;
    c.height = image.height;
    var cx = c.getContext("2d");
    var w = image.width,
      h = image.height;
    cx.drawImage(image,0,0,w,h);
    var imageData = cx.getImageData(0,0,w,h);
    
    return imageData;
    
  },
  _changeStringList : function(){
    
    var master = [
      ["$","M","@"],
      ["M","W"],
      ["%","#"],
      ["8","9"],
      ["D","S","Q"],
      ["Z","V","E"],
      ["U","O","C"],
      ["b","d","k"],
      ["+","t","y"],
      ["(","/",")"],
      ["[","]"],
      ["i","l"],
      ["^","~"],
      ["`"],
      [" "]
    ];
    
    var i = 0, l = master.length;
    var list = [];
    for(;i<l;i++){
      
      list.push( this._pickRandom(master[i]) );
      
    }
    
    AADot.prototype.stringList = list;
    
  },
  _pickRandom : function(array){
    
    var l = array.length;
    
    return array[ ~~(Math.random() * l) ];
    
  },
  _canvasPixelArrayToArray : function(cpa) {
    
    var i = 0, l = cpa.length;
    var r = [];
    for(;i<l;i++) r.push(cpa[i]);
    return r;
    
  }
  
  
};


var AALine = function (imageData) {
  
  this.dots;
  if(imageData) this.init(imageData);
  
};

AALine.prototype = {
  
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
  toString : function(){
    
    var i = 0,
      l = this.dots.length,
      str = '';
    
    for(;i<l;i++) str += this.dots[i].toString();
    
    return str + '\r\n';
    
  },
  toHtmlString : function(){
    
    var i = 0,
      l = this.dots.length,
      str = '';
    
    for(;i<l;i++) str += this.dots[i].toHtmlString();
    
    return str + '<br>';
    
  }
  
};


var AADot = function(r,g,b,a){
  
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  
};

AADot.prototype = {
  stringList : ["$","M","%","8","D","Z","U","b","+","(","[","i","^","`"],
  toString : function(){
    
    var l = this.stringList.length;
    var b = this.getBrightness();
    var s = this.stringList[~~(b*(l-1)+0.5)];
    
    return s;
    
  },
  toHtmlString : function(){
    
    var s = '<span style="color:rgb(' + this.r + ',' + this.g +',' + this.b + ');">' + this.toString() + "</span>";
    
    return s;
    
  },
  getBrightness : function(){
    
    var t = this.r + this.g + this.b;
    
    return t / 765;
    
  }
};