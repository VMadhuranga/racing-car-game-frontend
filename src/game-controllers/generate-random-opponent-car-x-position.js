function generateRandomOpponentCarXPosition(
  canvasWidth,
  trackLimitWidth,
  carWidth,
) {
  return (
    (carWidth *
      Math.floor(
        Math.random() *
          Math.floor((canvasWidth - trackLimitWidth * 2) / (carWidth / 2)),
      )) /
    2
  );
}

export default generateRandomOpponentCarXPosition;
