console.log("ticatactoe.js");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startGame") {
        const extensionContainer = document.createElement("div");
        extensionContainer.setAttribute("class", "extension-container");
        extensionContainer.innerHTML = `<div class="title-container">
                                            <h1>Tic-Tac-Toe</h1>
                                        </div>
                                        <div id="board" class="game-container">
                                            <div class="row1">
                                                <button></button>
                                                <button></button>
                                                <button></button>
                                            </div>

                                            <div class="row2">
                                                <button></button>
                                                <button></button>
                                                <button></button>
                                            </div>

                                            <div class="row3">
                                                <button></button>
                                                <button></button>
                                                <button></button>
                                            </div>
                                        </div>`;
                        
        document.body.appendChild(extensionContainer);

        window.player = "x";
        window.computer = "o";

        window.winner = "";
        window.board = null;

        window.board = document.getElementById("board");
        playGame(window.board);

        function resetBoard(board) {
            const rows = board.children;

            let cols = null;
            for (let row of rows) {
                cols = row.children;

                for (let col of cols) {
                    col.innerText = "";
                }
            }  
        }

        function playGame(board) {
            const rows = board.children;

            let i = 1;
            let cols = null;
            for (let row of rows) {
                cols = row.children;

                for (let col of cols) {
                    col.id = i;
                    col.innerText = "";

                    col.addEventListener("click", () => {
                        if (checkWinner()) {
                            return;
                        }

                        if (col.innerText === "") {
                            col.innerText = window.player;
                            if (checkWinner() || !checkSlot(board)) {
                                displayWinner();
                                return;
                            }
                        }
                        else {
                            return;
                        }

                        let n = 0;                
                        let slot = null;

                        if (!checkSlot(board)) {
                            return;
                        }
                        
                        while (true) {
                            if (checkWinner()) {
                                displayWinner();
                            }

                            n = Math.floor(Math.random() * 9) + 1;
                            slot = document.getElementById(String(n));

                            if (slot.innerText === "") {
                                slot.innerText = window.computer;

                                if (checkWinner() || !checkSlot(board)) {
                                    displayWinner();
                                }

                                break;  
                            }
                        }
                    });            
                    
                    i++;
                }
            }
        }

        function checkSlot(board) {
            const rows = board.children;

            let cols = null;
            for (let row of rows) {
                cols = row.children;

                for (let col of cols) {
                    if (col.innerText === "") {
                        return true;
                    }
                }
            }  

            return false;
        }

        function checkWinner() {
            for (let i = 1; i <= 7; i += 3) {
                let a = document.getElementById(i);
                let b = document.getElementById(String(i+1));
                let c = document.getElementById(String(i+2));

                if (a.innerText === b.innerText && a.innerText === c.innerText && a.innerText !== "") {
                    window.winner = a.innerText;
                    return true;
                }
            }

            for (let i = 1; i <= 3; i++) {
                let a = document.getElementById(i);
                let b = document.getElementById(String(i+3));
                let c = document.getElementById(String(i+6));

                if (a.innerText === b.innerText && a.innerText === c.innerText && a.innerText !== "") {
                    window.winner = a.innerText;
                    return true;
                }
            }

            const a = document.getElementById("5");
            const top = ["1", "3"];
            const bottom = ["9", "7"];

            for (let i = 0; i < 2; i++) {
                let b = document.getElementById(top[i]);
                let c = document.getElementById(bottom[i]);

                if (a.innerText === b.innerText && a.innerText === c.innerText && a.innerText !== "") {
                    window.winner = a.innerText;
                    return true;
                }
            }

            return false
        }

        function displayWinner() {
            let message = window.winner === "" ? "Draw" : `${window.winner.toUpperCase()} wins`;

            let messageContainer = document.createElement("div");
            messageContainer.id = "message-container";
            messageContainer.setAttribute("class", "message-container");
            messageContainer.innerHTML = `<h1>${message}</h1>
                                        <p>Do you want to again?</p>
                                        <div class="option-container">
                                                <button id="yes-button">yes</button>
                                                <button id="no-button">no</button>
                                        </div>
                                        `
            extensionContainer.appendChild(messageContainer);

            const yesButton = document.getElementById("yes-button");
            const noButton = document.getElementById("no-button");

            yesButton.addEventListener("click", () => {
                window.winner = "";
                resetBoard(window.board);
                playGame(window.board);
                messageContainer.style.animation = "hide-message 0.3s ease-in-out";

                setTimeout(() => removeElement(messageContainer), 250);
            })

            noButton.addEventListener("click", () => {
                messageContainer.style.animation = "hide-message 0.3s ease-in-out";
                extensionContainer.style.animation = "hide-message 0.3s ease-in-out";
                setTimeout(() => {
                    extensionContainer.remove();
                }, 250);
            });
        }

        function removeElement(element) {
            element.remove()
        }
    }
});