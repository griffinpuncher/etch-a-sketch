document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");
    const submit = document.getElementById("submit-button");
    const input = document.getElementById("input");
    let lastGrid = 0;
    let isMouseDown = false;
    let isMouseOver = false;
    let isMouseMoving = false;
    
    //initial state
    createGrid(16);
    
    submit.addEventListener("click", () => {getInputValue();});
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {getInputValue();}
    })
    
    
    
    function getInputValue() {
        let side = input.value;
        if (side <= 100 && side > 0) {
            deleteGrid();
            side *= side;
            createGrid(side);
        }
        else if (input.value === "") {
            deleteGrid();
            side = lastGrid;
            createGrid(side);
        }
        else {
            alert("Please enter a valid number (1-100)");
        }
        input.value = "";
    }
    
    function createGrid(size) {
        for (let i = 0; i < size; i++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            gridContainer.appendChild(grid);
        }
        const grid = Array.from(document.querySelectorAll(".grid"));
        grid.forEach(function(square) {
            const sideLength = 100/Math.sqrt(size) + "%";
            square.style.flexBasis = sideLength;
            square.style.height = sideLength;
        });
        grid.forEach((e) => {
            e.addEventListener("mousemove", () => {
                isMouseMoving = true;
                if(isMouseDown && isMouseOver) {
                    setTimeout(() => {
                        changeColor(e);
                    }, 10);
                };
            });
            e.addEventListener("mousedown", () => {
                isMouseDown = true;
                if(isMouseOver) {
                    setTimeout(() => {
                        changeColor(e);
                    }, 10);};
            });
            e.addEventListener("mouseover", () => {
                isMouseOver = true;
                if(isMouseDown) {
                    setTimeout(() => {
                        changeColor(e);
                    }, 10);};
            });
            document.addEventListener("mouseup", () => {isMouseDown=false});
        });
        lastGrid = size;
    }

    function deleteGrid() {
        oldGrid = document.querySelectorAll(".grid");
        oldGrid.forEach(e => {e.remove();});
    }

    function changeColor(e) {
        const r = Math.floor(Math.random()*(256 - (parseInt(e.id)||0)*25.6));
        const g = Math.floor(Math.random()*(256 - (parseInt(e.id)||0)*25.6));
        const b = Math.floor(Math.random()*(256 - (parseInt(e.id)||0)*25.6));
        const newColor = "#"+r.toString(16)+g.toString(16)+b.toString(16);
        e.style.backgroundColor = newColor;
        if ((parseInt(e.id)||0) < 10) {e.id = `${(parseInt(e.id)||0)+1}`;};
        isMouseOver = false;
    }
});