var rows = 3;
var columns = 3;

var curTile;
var otherTile;

var turns = 0;

var correctOrder = ["9", "8", "7", "6", "5", "4", "3", "2", "1"];
var imgOrder = ["8", "5", "1", "4", "3", "7", "2", "6", "9"];
window.onload = function () {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = document.createElement("img");
            tile.id = i.toString() + "-" + j.toString();
            tile.src = imgOrder.shift() + ".jpg";
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragleave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Add touch event listeners
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            document.getElementById("board").appendChild(tile);
        }
    }
}
function dragStart() {
    curTile = this;
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}

function dragleave(e) {
    e.preventDefault();
}
function dragDrop() {
    otherTile = this;
}
function dragEnd() {
    let currImg = curTile.src;
    let otherImg = otherTile.src;

    curTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    if (checkOrder()) {
        setTimeout(() => {
            alert("Congratulations! You solved the puzzle.");
        }, 100);
    }

}
function touchStart(e) {
    e.preventDefault();
    curTile = e.target;
}

function touchMove(e) {
    e.preventDefault();
    let touch = e.touches[0];
    otherTile = document.elementFromPoint(touch.clientX, touch.clientY);
}

function touchEnd(e) {
    if (curTile && otherTile && curTile !== otherTile) {
        let currImg = curTile.src;
        let otherImg = otherTile.src;

        curTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        // Check if the current order matches the correct order
        if (checkOrder()) {
            setTimeout(() => {
                alert("Congratulations! You solved the puzzle.");
            }, 100);
        }
    }
}

function checkOrder() {
    let currentOrder = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let src = tile.src.split("/").pop().split(".")[0]; // Get the image number
            currentOrder.push(src);
        }
    }
    return JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
}