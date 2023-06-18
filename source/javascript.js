/* Variables */
/*********************************************************************/
/** @type {HTMLDivElement} */
const BACKGROUND_SIZE = 600; //px
const eraseButton = document.querySelector('.eraseButton');
const setGridSizeButton = document.querySelector('.changeSizeButton');


let gridSize = 16;
let isMouseDown = false;
/*********************************************************************/

/* main */
/*********************************************************************/
// Draw initial grid 16x16
drawGrid();

// Add event listeners to squares / grid
addGridListeners();

// Erase button functionality
eraseButton.addEventListener('click', () => {
    eraseGrid();
    drawGrid();
    addGridListeners();
});

// Grid re-size button functionality
/*********************************************************************/
setGridSizeButton.addEventListener('click', () => {
    eraseGrid();
    resizeGrid();
    drawGrid();
    addGridListeners();
});

/* functions */
/*********************************************************************/

// drawGrid function will create the specified amount of squares on 
// the grid space. Intend to call this once at page load and again
// when the grid size is changed.

function drawGrid() {
    // get the empty gridRow element
    // set the size
    const gridRow = document.createElement("div")
    gridRow.classList.add("gridRow");
    gridRow.style.cssText = "height:" + BACKGROUND_SIZE/gridSize + "px;"

    // create correct number of squares as children
    for(let ii = 0; ii < gridSize; ii++) {
        const square = document.createElement("div");
        square.classList.add("square");
        gridRow.appendChild(square);
    }

    // clone it correct number of times
    // append to the background element
    for(let ii = 0; ii < gridSize; ii++) {
        const newRow = gridRow.cloneNode(true);
        document.querySelector(".gridBackground").appendChild(newRow);
    }
}

// Delete all of the rows and squares and re-generate them
function eraseGrid() {
    const toDelete = document.querySelectorAll(".square, .gridRow")
    toDelete.forEach((e) => {
        e.parentElement.removeChild(e);
    });
}

function resizeGrid() {
   let newSize = prompt("Enter the desired grid size (NxN)\nN:", gridSize);
   if(+newSize != NaN & +newSize < 100 & +newSize > 0) {
        gridSize = Math.round(newSize);
   }
   else {
    alert("Invalid Input - Try Again");
    resizeGrid();
   }
}

function addGridListeners() {
    // Add event listener to the grid space for mousedown
    // will set the mouseDown variable such that the next block
    // knows if it should highlight the square
    const grid = document.querySelector("body")
    grid.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        e.preventDefault(); // Prevents Chrome from trying to drag/drop
    });
    grid.addEventListener("mouseleave", () => {
        isMouseDown = false;
    });
    grid.addEventListener("mouseup", () => {
        isMouseDown = false;
    });

    // Add event listener to the squares to know when to change color 
    // confirm mouse is down before changing color
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            square.style.cssText = "background-color: black";
        });

        square.addEventListener('mouseenter', () => {
            if(isMouseDown) {
                square.style.cssText = "background-color: black";
            }
        });
    });
}
/*********************************************************************/