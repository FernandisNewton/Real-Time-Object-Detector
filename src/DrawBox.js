export const drawBox = (detections, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const font = "20px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];
    const score = (prediction["score"] * 100).toFixed(2);
    ctx.strokeStyle = "#0088cc";
    ctx.lineWidth = 7;
    ctx.strokeRect(x, y, width, height);

    ctx.fillStyle = "#0088cc";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    ctx.fillRect(x, y, textWidth + 6, textHeight + 6);
    const textWidth2 = ctx.measureText(score + "%").width;
    ctx.fillRect(x + width - textWidth2, y, textWidth2 + 6, textHeight + 6);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(prediction.class, x, y);

    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "end";
    ctx.fillText(score + "%", x + width, y);
  });
};
