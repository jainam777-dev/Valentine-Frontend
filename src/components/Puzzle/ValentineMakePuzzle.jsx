import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Puzzle.css";

const PUZZLE_SIZE = 3; // 3x3 grid

const PuzzlePiece = ({ piece, index, movePiece }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PUZZLE_PIECE",
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: "PUZZLE_PIECE",
    drop: (draggedItem) => movePiece(draggedItem.index, index),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="border p-1"
      style={{
        width: "100px",
        height: "100px",
        opacity: isDragging ? 0.5 : 1,
        backgroundImage: `url(${piece.image})`,
        backgroundPosition: piece.position,
        backgroundSize: "300px 300px",
      }}
    ></div>
  );
};

const ValentineMakePuzzle = () => {
  const [image, setImage] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedPuzzle = params.get("puzzleImage");

    if (sharedPuzzle) {
      const sharedImageUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/uploads/${sharedPuzzle}`;
      setImage(sharedImageUrl);
      setIsShared(true);
      createPuzzlePieces(sharedImageUrl);
      startTimer();
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const startTimer = () => {
    setTimer(0);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedImageUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/${
        response.data.imageUrl
      }`;
      setUniqueId(response.data.imageUrl);
      setImage(uploadedImageUrl);
      createPuzzlePieces(uploadedImageUrl);
      startTimer();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const createPuzzlePieces = (imgUrl) => {
    let newPieces = [];
    for (let row = 0; row < PUZZLE_SIZE; row++) {
      for (let col = 0; col < PUZZLE_SIZE; col++) {
        newPieces.push({
          id: row * PUZZLE_SIZE + col,
          image: imgUrl,
          position: `-${col * 100}px -${row * 100}px`,
          correctIndex: row * PUZZLE_SIZE + col,
        });
      }
    }
    setPieces(shuffleArray(newPieces));
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const movePiece = (fromIndex, toIndex) => {
    let updatedPieces = [...pieces];
    [updatedPieces[fromIndex], updatedPieces[toIndex]] = [
      updatedPieces[toIndex],
      updatedPieces[fromIndex],
    ];
    setPieces(updatedPieces);
    checkCompletion(updatedPieces);
  };

  const checkCompletion = (updatedPieces) => {
    const isSolved = updatedPieces.every(
      (piece, index) => piece.correctIndex === index
    );
    if (isSolved) {
      stopTimer();
      setIsCompleted(true);
    }
  };

  const sharePuzzle = () => {
    if (!image) return;
    const shareableURL = `${window.location.origin}${
      window.location.pathname
    }?puzzleImage=${encodeURIComponent(uniqueId)}`;
    navigator.clipboard.writeText(shareableURL);
    alert("Puzzle link copied! Share it with your partner.");
  };

  return (
    <>
      <img src="/right.png" className="rightImg" />
      <img src="/left.png" className="leftImg" />
      <DndProvider backend={HTML5Backend}>
        <div className="container text-center mt-4 mybox mb-4">
          <h1 className="myline">Jigsaw Puzzle</h1>

          {/* Timer Always Visible */}
          <h2 className="mt-2">
            Timer: {timer} sec {isCompleted && "✅"}
          </h2>

          {/* File Upload (Hidden for Shared Puzzles) */}
          {!isShared && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control mt-3"
            />
          )}

          {image && (
            <>
              {/* Puzzle Grid */}
              <div
                className={`d-flex flex-wrap mt-3 justify-content-center ${
                  isCompleted ? "puzzle-complete-animation" : ""
                }`}
                style={{ width: "300px" }}
              >
                {pieces.map((piece, index) => (
                  <PuzzlePiece
                    key={piece.id}
                    piece={piece}
                    index={index}
                    movePiece={movePiece}
                  />
                ))}
              </div>

              {/* Share Button (Hidden for Shared Puzzles) */}
              {!isShared && (
                <button className="mt-3" onClick={sharePuzzle}>
                  Share Puzzle
                </button>
              )}

              {/* Completion Message with Animation */}
              {isCompleted && (
                <div className="completion-message">
                  🎉 Puzzle Solved in {timer} seconds! 🎉
                </div>
              )}
            </>
          )}
        </div>
      </DndProvider>

      <style>
        {`
          .puzzle-complete-animation {
            animation: zoomIn 1s ease-in-out;
          }

          .completion-message {
            font-size: 24px;
            font-weight: bold;
            color: green;
            margin-top: 20px;
            animation: fadeIn 1s ease-in-out;
          }

          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default ValentineMakePuzzle;
