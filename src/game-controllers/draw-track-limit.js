function drawTrackLimit(ctx, trackLimitXPosition, trackLimitWidth) {
  ctx.beginPath();
  ctx.rect(trackLimitXPosition, 0, trackLimitWidth, ctx.canvas.height);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

export default drawTrackLimit;
