function detectCollision(
  playerCarXPosition,
  playerCarYPosition,
  opponentCarXPosition,
  opponentCarYPosition,
  carXPositionInImage,
  carYPositionInImage,
  carWidth,
  carHeight,
  carSpeed,
) {
  return (
    ((opponentCarXPosition + carXPositionInImage >=
      playerCarXPosition + carXPositionInImage &&
      opponentCarXPosition + carXPositionInImage <=
        playerCarXPosition + carWidth - carXPositionInImage) ||
      (opponentCarXPosition + carWidth - carXPositionInImage >=
        playerCarXPosition + carXPositionInImage &&
        opponentCarXPosition + carWidth - carXPositionInImage <=
          playerCarXPosition + carWidth - carXPositionInImage)) &&
    ((opponentCarYPosition + carYPositionInImage >=
      playerCarYPosition + carYPositionInImage &&
      opponentCarYPosition + carYPositionInImage <=
        playerCarYPosition + carHeight - carYPositionInImage) ||
      (opponentCarYPosition + carHeight - carSpeed - carYPositionInImage >=
        playerCarYPosition + carYPositionInImage &&
        opponentCarYPosition + carHeight - carSpeed - carYPositionInImage <=
          playerCarYPosition + carHeight - carYPositionInImage))
  );
}

export default detectCollision;
