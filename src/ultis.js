import firebase from "firebase";

const updateTurn = (curTurn, maxPlayers) =>
    curTurn === maxPlayers - 1 ? 0 : curTurn + 1;

function updateFireStore(docId, updateField) {
    firebase.firestore().collection("rooms").doc(docId).update(updateField);
}
function findWinner(board, boardSize) {
    let winner = [];
    let winnerPlayer = "";
    const winPattern = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [20, 16, 12, 8, 4],
    ];
    for (let i = 0; i < boardSize - 4; i++) {
        if (winner.length > 0) {
            break;
        }
        for (let j = 0; j < boardSize - 4; j++) {
            const miniBoard = [];
            for (let m = 0; m < 5; m++) {
                for (let n = 0; n < 5; n++) {
                    miniBoard.push(board[(i + m) * boardSize + (j + n)]);
                }
            }
            winner = winPattern.filter((win) =>
                win.every(
                    (pos) =>
                        miniBoard[pos] === miniBoard[win[0]] &&
                        miniBoard[win[0]] !== ""
                )
            );
            if (winner.length > 0) {
                winnerPlayer = board[winner[0][0]];
                break;
            }
        }
    }
    return [winner[0], winnerPlayer];
}
export { updateFireStore, updateTurn, findWinner };
