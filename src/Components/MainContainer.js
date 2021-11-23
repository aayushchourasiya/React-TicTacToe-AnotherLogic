import React, { useState, useEffect } from "react";
import { Block } from "./Block";
import { Button } from "react-bootstrap";

function MainContainer() {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [runCheck, setRunCheck] = useState(false);
  const [resetButton, setResetButton] = useState(false);
  const [text, setText] = useState({
    xTurn: "X Turn",
    oTurn: "O Turn",
  });
  const [boxes, setBoxes] = useState({
    box1: "",
    box2: "",
    box3: "",
    box4: "",
    box5: "",
    box6: "",
    box7: "",
    box8: "",
    box9: "",
  });

  const [color, setColor] = useState({
    Xback: "blue",
    Oback: "",
    Xfont: "white",
    Ofont: "",
  });

  const [arrX, setArrX] = useState([]);
  const [winX, setWinX] = useState(false);
  const [arrO, setArrO] = useState([]);
  var [winO, setWinO] = useState(false);

  const winner = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [4, 5, 6],
    [7, 8, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
  ];
  const [winValues, setWinValues] = useState([]);
  const winCheck = () => {
    let checker = (arr, target) => target.every((v) => arr.includes(v));
    winner.map((item) => {
      if (checker(arrX, item)) {
        setWinX(true);
        setWinValues(item);
      } else if (checker(arrO, item)) {
        setWinO(true);
        setWinValues(item);
      }
      return item;
    });
  };

  useEffect(() => {
    if (winX) {
      setColor({
        Xback: "blue",
        Xfont: "white",
        Oback: "white",
        Ofont: "black",
      });
      setText({ xTurn: "X Win", oTurn: "O Lose" });
    } else if (winO) {
      setColor({
        Oback: "blue",
        Ofont: "white",
        Xback: "white",
        Xfont: "black",
      });
      setText({ xTurn: "X Lose", oTurn: "O Win" });
    }
  }, [winX, winO]);

  useEffect(() => {
    winCheck();
    if (playerTurn) {
      setColor({
        Xback: "blue",
        Xfont: "white",
        Oback: "white",
        Ofont: "black",
      });
    } else {
      setColor({
        Oback: "blue",
        Ofont: "white",
        Xback: "white",
        Xfont: "black",
      });
    }
    //eslint-disable-next-line
  }, [runCheck]);

  useEffect(() => {
    setArrO([]);
    setArrX([]);
    setWinValues([]);
    setWinX(false);
    setWinO(false);
    setBoxes({
      box1: "",
      box2: "",
      box3: "",
      box4: "",
      box5: "",
      box6: "",
      box7: "",
      box8: "",
      box9: "",
    });
    setText({ xTurn: "X Turn", oTurn: "O Turn" });
    setColor({ Xback: "blue", Oback: "", Xfont: "white", Ofont: "" });
    setPlayerTurn(true);
  }, [resetButton]);

  const setLetter = (box) => {
    if (winX || winO) {
      return;
    }
    if (boxes[box] === "") {
      const num = box.slice(3, 4);
      if (playerTurn) {
        setArrX([...arrX, Number(num)]);
        setBoxes({ ...boxes, [box]: "X" });
        setPlayerTurn((prev) => !prev);
      } else {
        setArrO([...arrO, Number(num)]);
        setBoxes({ ...boxes, [box]: "O" });
        setPlayerTurn((prev) => !prev);
      }
    }
    setRunCheck((prev) => !prev);
  };

  const resetButtonFunc = () => {
    setResetButton((prev) => !prev);
  };
  return (
    <>
      <div className="my-5">
        <h1>Welcome to TicTacToe!</h1>
        <div className="mainClass">
          <Block
            clickButton={() => setLetter("box1")}
            value={boxes.box1}
            noLeftBorder
            noTopBorder
            isBackgroundColor={winValues.includes(1)}
            isColor={winValues.includes(1)}
          />
          <Block
            clickButton={() => setLetter("box2")}
            value={boxes.box2}
            noTopBorder
            isBackgroundColor={winValues.includes(2)}
            isColor={winValues.includes(2)}
          />
          <Block
            clickButton={() => setLetter("box3")}
            value={boxes.box3}
            noRightBorder
            noTopBorder
            isBackgroundColor={winValues.includes(3)}
            isColor={winValues.includes(3)}
          />
        </div>
        <div className="mainClass">
          <Block
            clickButton={() => setLetter("box4")}
            value={boxes.box4}
            noLeftBorder
            isBackgroundColor={winValues.includes(4)}
            isColor={winValues.includes(4)}
          />
          <Block
            clickButton={() => setLetter("box5")}
            value={boxes.box5}
            isBackgroundColor={winValues.includes(5)}
            isColor={winValues.includes(5)}
          />
          <Block
            clickButton={() => setLetter("box6")}
            value={boxes.box6}
            noRightBorder
            isBackgroundColor={winValues.includes(6)}
            isColor={winValues.includes(6)}
          />
        </div>
        <div className="mainClass">
          <Block
            clickButton={() => setLetter("box7")}
            value={boxes.box7}
            noLeftBorder
            noBottomBorder
            isBackgroundColor={winValues.includes(7)}
            isColor={winValues.includes(7)}
          />
          <Block
            clickButton={() => setLetter("box8")}
            value={boxes.box8}
            noBottomBorder
            isBackgroundColor={winValues.includes(8)}
            isColor={winValues.includes(8)}
          />
          <Block
            clickButton={() => setLetter("box9")}
            value={boxes.box9}
            isBackgroundColor={winValues.includes(9)}
            isColor={winValues.includes(9)}
            noBottomBorder
            noRightBorder
          />
        </div>
        <div className="mainClass my-5">
          <h3
            className="mx-5"
            style={{ backgroundColor: color.Xback, color: color.Xfont }}
          >
            {text.xTurn}
          </h3>
          <Button variant="dark" onClick={resetButtonFunc}>
            Reset
          </Button>
          <h3
            className="mx-5"
            style={{ backgroundColor: color.Oback, color: color.Ofont }}
          >
            {text.oTurn}
          </h3>
        </div>
      </div>
    </>
  );
}

export default MainContainer;