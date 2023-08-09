import { useEffect, useState } from "react";
import "./app.css";
import queenWhite from "./Images/queenWhite.svg";
import queenBlack from "./Images/queenBlack.svg";

const chessSquares = [
    "h8",
    "g8",
    "f8",
    "e8",
    "d8",
    "c8",
    "b8",
    "a8",
    "h7",
    "g7",
    "f7",
    "e7",
    "d7",
    "c7",
    "b7",
    "a7",
    "h6",
    "g6",
    "f6",
    "e6",
    "d6",
    "c6",
    "b6",
    "a6",
    "h5",
    "g5",
    "f5",
    "e5",
    "d5",
    "c5",
    "b5",
    "a5",
    "h4",
    "g4",
    "f4",
    "e4",
    "d4",
    "c4",
    "b4",
    "a4",
    "h3",
    "g3",
    "f3",
    "e3",
    "d3",
    "c3",
    "b3",
    "a3",
    "h2",
    "g2",
    "f2",
    "e2",
    "d2",
    "c2",
    "b2",
    "a2",
    "h1",
    "g1",
    "f1",
    "e1",
    "d1",
    "c1",
    "b1",
    "a1",
];
const chessSquaresWithLetters = [
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
];

const chessSquaresWithNumbers = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
];

const whiteSquares = [
    "b1",
    "d1",
    "f1",
    "h1",
    "a2",
    "c2",
    "e2",
    "g2",
    "b3",
    "d3",
    "f3",
    "h3",
    "a4",
    "c4",
    "e4",
    "g4",
    "b5",
    "d5",
    "f5",
    "h5",
    "a6",
    "c6",
    "e6",
    "g6",
    "b7",
    "d7",
    "f7",
    "h7",
    "a8",
    "c8",
    "e8",
    "g8",
];

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

function checkIsSave(board, row, col) {
    for (let i = 0; i < 8; i++) {
        if (board[row][i] === 1) {
            return false;
        }
    }
    for (let i = 0; i < 8; i++) {
        if (board[i][col] === 1) {
            return false;
        }
    }
    for (let i = 0; i < 8; i++) {
        if (board[i][col] === 1) {
            return false;
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row - i >= 0 && col - i >= 0) {
            if (board[row - i][col - i] === 1) {
                return false;
            }
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row - i >= 0 && col + i < 8) {
            if (board[row - i][col + i] === 1) {
                return false;
            }
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row + i < 8 && col + i < 8) {
            if (board[row + i][col + i] === 1) {
                return false;
            }
        }
    }
    for (let i = 0; i < 8; i++) {
        if (row + i < 8 && col - i >= 0) {
            if (board[row + i][col - i] === 1) {
                return false;
            }
        }
    }
    return true;
}

function findQueens(board, row, combinations) {
    if (row === 8) {
        combinations.push([...board.map((row) => row.join(""))]);
        return;
    }
    for (let col = 0; col < 8; col++) {
        if (checkIsSave(board, row, col)) {
            board[row][col] = 1;
            findQueens(board, row + 1, combinations);
            board[row][col] = 0;
        }
    }
}

function App() {
    const [allCombinations, setAllCombinations] = useState([]);
    const [combinationsCode, setCombinationsCode] = useState("");
    const [cordinates, setCordinates] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [circlePos, setCirclePos] = useState([]);
    const [colorWhite, setColorWhite] = useState("#f0d9b5");
    const [colorBlack, setColorBlack] = useState("#b58863");
    const [queenColor, setQueenColor] = useState("white");
    useEffect(() => {
        makeCombinations();
    }, [allCombinations]);

    function handleQueenChange(e) {
        setQueenColor(e.target.dataset.color);
    }

    function handleChangeColor(e) {
        setColorWhite(e.target.parentElement.dataset.color1);
        setColorBlack(e.target.parentElement.dataset.color2);
    }

    function handleQueenClick(e) {
        let allPositions = [];
        let col =
            letters.indexOf(e.target.parentElement.id.slice("0", "1")) + 1;
        let row = e.target.parentElement.id.slice("1") * 1;
        const initialCol = col;
        const initialRow = row;

        for (let i = 7; i >= col; i--) {
            allPositions.push(`${letters[i]}${row}`);
        }
        for (let i = 0; i < col - 1; i++) {
            allPositions.push(`${letters[i]}${row}`);
        }
        for (let i = 1; i < row; i++) {
            allPositions.push(`${letters[col - 1]}${i}`);
        }
        for (let i = 8; i > row; i--) {
            allPositions.push(`${letters[col - 1]}${i}`);
        }
        while (row < 8 && col < 8) {
            allPositions.push(`${letters[col]}${row + 1}`);
            col++;
            row++;
        }
        col = initialCol;
        row = initialRow;
        while (row < 8 && col > 1) {
            allPositions.push(`${letters[col - 2]}${row + 1}`);
            col--;
            row++;
        }
        col = initialCol;
        row = initialRow;
        while (row > 1 && col < 8) {
            allPositions.push(`${letters[col]}${row - 1}`);
            col++;
            row--;
        }
        col = initialCol;
        row = initialRow;
        while (row > 1 && col > 1) {
            allPositions.push(`${letters[col - 2]}${row - 1}`);
            col--;
            row--;
        }
        setCirclePos(allPositions);
    }

    function putQueens(e) {
        setCirclePos([]);
        setCordinates(
            e.target.textContent.split(",").map((square) => square.trim())
        );
    }

    function makeCombinations() {
        const codeForCombinations = allCombinations.map((comb, key) => {
            let data = [];
            comb.map((item, index) => {
                return data.push(`${letters[item.indexOf(1)]}${index + 1}`);
            });
            return (
                <div
                    className="combination"
                    key={key}
                    onClick={(e) => putQueens(e)}
                >
                    {data.join(", ")}
                </div>
            );
        });
        setCombinationsCode(codeForCombinations);
    }

    function getCombinations() {
        const board = Array.from({ length: 8 }, () => Array(8).fill(0));
        const combinations = [];
        findQueens(board, 0, combinations);
        setAllCombinations(combinations);
        setClicked(true);
        return combinations;
    }
    return (
        <div className="mainWrapper">
            <div className="combinationGeneratorWrapper">
                <div className="chessTable">
                    {chessSquares.map((id) => {
                        return (
                            <div
                                id={id}
                                className={`chessSquare ${
                                    whiteSquares.includes(id)
                                        ? "white"
                                        : "black"
                                }`}
                                style={{
                                    backgroundColor: whiteSquares.includes(id)
                                        ? colorWhite
                                        : colorBlack,
                                }}
                                key={id}
                            >
                                {chessSquaresWithLetters.includes(id) && (
                                    <p className="squareLetter">
                                        {id.slice(0, 1)}
                                    </p>
                                )}
                                {chessSquaresWithNumbers.includes(id) && (
                                    <p className="squareNumber">
                                        {id.slice(1)}
                                    </p>
                                )}
                                {cordinates.includes(id) && (
                                    <img
                                        src={
                                            queenColor === "white"
                                                ? queenWhite
                                                : queenBlack
                                        }
                                        className="queen"
                                        onClick={(e) => handleQueenClick(e)}
                                    />
                                )}
                                {circlePos.includes(id) && (
                                    <div className="circle"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <button
                    className="combinationGeneratorButton"
                    onClick={() => getCombinations()}
                    disabled={clicked}
                >
                    {clicked ? "Generated" : "Generate combinations"}
                </button>
            </div>
            <div className="combinationsWrapper">
                <h2>Combinations</h2>
                <div className="combinations">{combinationsCode}</div>
            </div>
            <div className="settingsWrapper">
                <h2>Settings</h2>
                <div class="settingsContent">
                    <p>Change board color:</p>
                    <div className="boardColors">
                        <div
                            data-color1="#f0d9b5"
                            data-color2="#b58863"
                            onClick={(e) => handleChangeColor(e)}
                        >
                            <div className="firstColor1"></div>
                            <div className="secondColor1"></div>
                            <div className="secondColor1"></div>
                            <div className="firstColor1"></div>
                        </div>
                        <div
                            data-color1="#ebecd0"
                            data-color2="#779556"
                            onClick={(e) => handleChangeColor(e)}
                        >
                            <div className="firstColor2"></div>
                            <div className="secondColor2"></div>
                            <div className="secondColor2"></div>
                            <div className="firstColor2"></div>
                        </div>
                        <div
                            data-color1="#dae9f2"
                            data-color2="#6e99c0"
                            onClick={(e) => handleChangeColor(e)}
                        >
                            <div className="firstColor3"></div>
                            <div className="secondColor3"></div>
                            <div className="secondColor3"></div>
                            <div className="firstColor3"></div>
                        </div>
                        <div
                            data-color1="#fbe9a7"
                            data-color2="#145f4c"
                            onClick={(e) => handleChangeColor(e)}
                        >
                            <div className="firstColor4"></div>
                            <div className="secondColor4"></div>
                            <div className="secondColor4"></div>
                            <div className="firstColor4"></div>
                        </div>
                    </div>
                    <p>Change queen color:</p>
                    <div className="queenColors">
                        <img
                            src={queenWhite}
                            alt=""
                            data-color="white"
                            onClick={(e) => handleQueenChange(e)}
                        />
                        <img
                            src={queenBlack}
                            alt=""
                            data-color="black"
                            onClick={(e) => handleQueenChange(e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
