import { useEffect, useRef, useState } from "react";
import { Counter } from "./Counter";
import { GameOver } from "./GameOver";
import racingCarImage from "../assets/racing-car.png";
import racingCarLeftImage from "../assets/racing-car-left.png";
import racingCarRightImage from "../assets/racing-car-right.png";
import setImage from "../game-controllers/set-image";
import generateRandomOpponentCarXPosition from "../game-controllers/generate-random-opponent-car-x-position";
import drawPlayerCar from "../game-controllers/draw-player-car";
import drawOpponentCar from "../game-controllers/draw-opponent-car";
import drawTrackLimit from "../game-controllers/draw-track-limit";
import drawDeltaTime from "../game-controllers/draw-delta-time";
import detectCollision from "../game-controllers/detect-collision";

export default function GamePlay() {
  const canvasRef = useRef(null);
  const deltaTimeRef = useRef(null);
  const [isCounting, setIsCounting] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [count, setCount] = useState(3);

  function restartGame() {
    setIsGameOver(false);
    setIsCounting(true);
    setCount(3);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count < 1) {
      clearInterval(intervalId);
      setIsCounting(() => false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const trackLimitWidth = 10;
    const carWidth = 64;
    const carHeight = 64;
    let carTurningSpeed = 1;

    let playerCarImage = setImage(racingCarImage);
    let opponentCarImage = setImage(racingCarImage);

    let playerCarXPosition = (canvas.width - carWidth) / 2;
    let playerCarYPosition = canvas.height - carHeight * 2;
    let opponentCarYPosition = -carHeight;
    let opponentCarXPosition = generateRandomOpponentCarXPosition(
      canvas.width,
      trackLimitWidth,
      carWidth,
    );
    let carSpeed = 1;
    const carXPositionInImage = 18;
    const carYPositionInImage = 8;

    let isRightArrowKeyPressed = false;
    let isLeftArrowKeyPressed = false;
    let isShiftKeyPressed = false;
    let isCanvasLeftSideTouched = false;
    let isCanvasRightSideTouched = false;

    const startTime = performance.now();
    let deltaTime = startTime;
    let intervalId;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawPlayerCar(
        ctx,
        playerCarImage,
        playerCarXPosition,
        playerCarYPosition,
      );

      drawOpponentCar(
        ctx,
        opponentCarImage,
        opponentCarXPosition,
        opponentCarYPosition,
      );

      drawTrackLimit(ctx, 0, trackLimitWidth);
      drawTrackLimit(ctx, canvas.width - trackLimitWidth, trackLimitWidth);

      drawDeltaTime(ctx, canvas.width, deltaTime);

      opponentCarYPosition += carSpeed;

      if (opponentCarYPosition >= canvas.height) {
        opponentCarYPosition = -carHeight;
        opponentCarXPosition = generateRandomOpponentCarXPosition(
          canvas.width,
          trackLimitWidth,
          carWidth,
        );
      }

      if (
        detectCollision(
          playerCarXPosition,
          playerCarYPosition,
          opponentCarXPosition,
          opponentCarYPosition,
          carXPositionInImage,
          carYPositionInImage,
          carWidth,
          carHeight,
          carSpeed,
        )
      ) {
        clearInterval(intervalId);
        deltaTimeRef.current = deltaTime;
        setIsGameOver(() => true);
      }

      deltaTime = performance.now() - startTime;

      if (Math.floor(deltaTime / 1000) % 5 === 0) {
        carSpeed += 0.001;
      }

      if (
        !isLeftArrowKeyPressed &&
        !isRightArrowKeyPressed &&
        !isCanvasLeftSideTouched &&
        !isCanvasRightSideTouched
      ) {
        playerCarImage = setImage(racingCarImage);
      }

      if (isLeftArrowKeyPressed || isCanvasLeftSideTouched) {
        playerCarXPosition = Math.max(playerCarXPosition - carTurningSpeed, 0);
        playerCarImage = setImage(racingCarLeftImage);
      }

      if (isRightArrowKeyPressed || isCanvasRightSideTouched) {
        playerCarXPosition = Math.min(
          playerCarXPosition + carTurningSpeed,
          canvas.width - playerCarImage.width,
        );
        playerCarImage = setImage(racingCarRightImage);
      }

      if (
        isShiftKeyPressed ||
        isCanvasLeftSideTouched ||
        isCanvasRightSideTouched
      ) {
        carTurningSpeed =
          Math.ceil(carSpeed / 2) === 0 ? 1 : Math.ceil(carSpeed / 2);
      } else {
        carTurningSpeed = 1;
      }
    }

    function handleKeyDownEvents(e) {
      if (e.key === "ArrowRight") {
        isRightArrowKeyPressed = true;
        isLeftArrowKeyPressed = false;
      }

      if (e.key === "ArrowLeft") {
        isLeftArrowKeyPressed = true;
        isRightArrowKeyPressed = false;
      }

      if (e.key === "Shift") {
        isShiftKeyPressed = true;
      }
    }

    function handleKeyUpEvents(e) {
      if (e.key === "ArrowRight") {
        isRightArrowKeyPressed = false;
      }

      if (e.key === "ArrowLeft") {
        isLeftArrowKeyPressed = false;
      }

      if (e.key === "Shift") {
        isShiftKeyPressed = false;
      }
    }

    function handleTouchStartEvents(e) {
      e.preventDefault();
      const middle = Math.floor(document.body.clientWidth / 2);
      const touchPoint = e.targetTouches[0].clientX;

      if (touchPoint < middle) {
        isCanvasLeftSideTouched = true;
        isCanvasRightSideTouched = false;
      }

      if (touchPoint >= middle) {
        isCanvasLeftSideTouched = false;
        isCanvasRightSideTouched = true;
      }
    }

    function handleTouchEndEvents(e) {
      e.preventDefault();
      isCanvasLeftSideTouched = false;
      isCanvasRightSideTouched = false;
    }

    document.addEventListener("keydown", handleKeyDownEvents, false);
    document.addEventListener("keyup", handleKeyUpEvents, false);

    canvas.addEventListener("touchstart", handleTouchStartEvents, false);
    canvas.addEventListener("touchend", handleTouchEndEvents, false);

    if (isCounting) {
      drawTrackLimit(ctx, 0, trackLimitWidth);
      drawTrackLimit(ctx, canvas.width - trackLimitWidth, trackLimitWidth);
    }

    if (!isCounting) {
      intervalId = setInterval(draw, 1);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvents, false);
      document.removeEventListener("keyup", handleKeyUpEvents, false);

      canvas.removeEventListener("touchstart", handleTouchStartEvents, false);
      canvas.removeEventListener("touchend", handleTouchEndEvents, false);

      clearInterval(intervalId);
    };
  }, [isCounting]);

  return (
    <>
      <canvas
        id="canvas"
        width={320}
        height={document.body.clientHeight}
        ref={canvasRef}
      ></canvas>
      {isCounting && <Counter count={count} />}
      {isGameOver && (
        <GameOver time={deltaTimeRef.current} handleRestart={restartGame} />
      )}
    </>
  );
}
