onload = function() {
  draw();
};
function draw() {
  var canvas = document.getElementById('c1');
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  /* グラデーション領域をセット */
  var grad  = ctx.createLinearGradient(0,0, 0,140);
  /* グラデーション終点のオフセットと色をセット */
  grad.addColorStop(0,'rgb(192, 80, 77)');    // 赤
  grad.addColorStop(0.5,'rgb(155, 187, 89)'); // 緑
  grad.addColorStop(1,'rgb(128, 100, 162)');  // 紫
  /* グラデーションをfillStyleプロパティにセット */
  ctx.fillStyle = grad;
  /* 矩形を描画 */
  ctx.rect(0,0, 140,140);
  ctx.fill();
}