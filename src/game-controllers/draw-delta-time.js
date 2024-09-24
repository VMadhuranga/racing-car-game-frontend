import formatTimeToMinSecMil from "../utils/format-time-to-min-sec-mil";

function drawDeltaTime(ctx, canvasWidth, deltaTime) {
  const fillText = formatTimeToMinSecMil(deltaTime);
  ctx.font = "bold 20px sans";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";

  ctx.fillText(fillText, (canvasWidth - fillText.length) / 2, 20);
}

export default drawDeltaTime;
