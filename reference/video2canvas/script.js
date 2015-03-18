function copyFrame() {
    var cEle = document.getElementById('c');
    var cCtx = cEle.getContext('2d');
    var vEle = document.getElementById('v');

    cEle.width  = vEle.videoWidth;
    cEle.height = vEle.videoHeight;

    cCtx.drawImage(vEle, 0, 0);
    // var imageData = cCtx.getImageData(0,0,cEle.width,cEle.height);
    // console.log(imageData);

    // ここから下を追加
    var imgdata = cCtx.getImageData(0, 0, vEle.videoWidth, vEle.videoHeight);  // pixelデータを取得
    for (var i=0; i<imgdata.data.length; i+=4) {  // imgdata.data: [R,G,B,alpha,R,G,B,alpha...]
        var gray = (imgdata.data[i] + imgdata.data[i+1] + imgdata.data[i+2]) / 3;  // グレースケール値計算
        imgdata.data[i] = imgdata.data[i+1] = imgdata.data[i+2] = gray;  // RGB
        imgdata.data[i+3] = 255;  // alpha
    }
    cCtx.putImageData(imgdata, 0, 0);  // 描画

    var imgdata = cCtx.getImageData(0, 0, 30, 30);  // pixelデータを取得
    console.log(imgdata);
} 

function start() {
  setInterval(function() {
    copyFrame();
  }, 500);
}

window.onload = function() {
  start();
};