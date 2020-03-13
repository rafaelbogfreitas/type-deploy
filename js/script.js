class Console{constructor(){this.console=document.querySelector(".message-console .console-text"),this.instructions=["t!pe the name of the shape you see on the left of the screen and hit Enter","If right you get 50 points for a piece and 150 for clearing the queue","don't let the queue flood with pieces or you will LOSE! Hit the space bar!"],this.positiveSentences=["Well Done!","Not enough, but you will get there!","That's my boy!","Wicked!"],this.negativeSentences=["You are a joke...","Oh boy...","An eleven years old types faster than you...","Jesus!","What's wrong with you!"]}type(e){let t="";e.split("").forEach((a,s)=>{setTimeout(function(){gameConsole.console.innerHTML=t+=a,s==e.split("").length-1&&(gameState.introduction=!0)},50*s)})}renderInstructions(){this.type(this.instructions.join("</br>> "))}getGoodMessage(){return this.console.style.color="green",this.positiveSentences[Math.floor(Math.random()*this.positiveSentences.length)]}getBadMessage(){return this.console.style.color="red",this.negativeSentences[Math.floor(Math.random()*this.negativeSentences.length)]}}const gameConsole=new Console;class PiecesQueue{constructor(){this.piecesQueue=[],this.correctPieces=[],this.piecesSrc=[["./images/dark-ball.svg","./images/gray-ball.svg","./images/light-ball.svg","./images/orange-ball.svg","./images/striped-ball.svg","./images/gray-striped-ball.svg"],["./images/dark-triangle.svg","./images/gray-triangle.svg","./images/light-triangle.svg","./images/orange-triangle.svg","./images/striped-triangle.svg","./images/gray-striped-triangle.svg"],["./images/dark-square.svg","./images/gray-square.svg","./images/light-square.svg","./images/orange-square.svg","./images/striped-square.svg","./images/gray-striped-square.svg"],["./images/dark-rectangle.svg","./images/gray-rectangle.svg","./images/light-rectangle.svg","./images/orange-rectangle.svg","./images/striped-rectangle.svg","./images/gray-striped-rectangle.svg"],["./images/dark-hexagon.svg","./images/gray-hexagon.svg","./images/light-hexagon.svg","./images/orange-hexagon.svg","./images/striped-hexagon.svg","./images/gray-striped-hexagon.svg"],["./images/dark-trapeze.svg","./images/gray-trapeze.svg","./images/light-trapeze.svg","./images/orange-trapeze.svg","./images/striped-trapeze.svg","./images/gray-striped-trapeze.svg"]],this.piecesNames=["circle","triangle","square","rectangle","hexagon","trapeze"],this.container=document.querySelector(".pieces-container"),this.mainContainer=document.querySelector(".main-piece-container"),this.imgContainer=document.querySelector(".container-img")}createRandomPieceObj(){let e=Math.floor(Math.random()*this.piecesNames.length),t=Math.floor(Math.random()*this.piecesSrc[e].length),a={id:Math.floor(1e3*Math.random()),name:this.piecesNames[e],src:this.piecesSrc[e][t]};return this.piecesQueue.push(a),this.piecesQueue.length>7?this.container.classList.add("warning"):this.container.classList.remove("warning"),a}createPiece(){let e=this.createRandomPieceObj(),t=new Image;return t.src=e.src,t.classList.add("slideIn"),t.alt=e.name,t.setAttribute("data-piece",e.name),t}renderPiece(){let e=this.createPiece();1==this.piecesQueue.length?this.mainContainer.appendChild(e):this.container.appendChild(e)}renderManualScreen(){let e=document.createElement("div");e.classList.add("manual-screen"),this.piecesNames.map((t,a)=>{let s=document.createElement("div");s.classList.add("manual-screen-wrap");let n=document.createElement("div");n.classList.add("manual-screen-name"),n.innerHTML=this.piecesNames[a];let i=new Image;i.classList.add("manual-screen-img"),i.src=this.piecesSrc[a][a],s.appendChild(i),s.appendChild(n),e.appendChild(s)}),this.mainContainer.appendChild(e)}renderFirstPiece(){let e=this.createPiece();this.mainContainer.innerHTML="",this.mainContainer.appendChild(e),console.log(this.piecesQueue)}pushNewPiece(e){this.piecesQueue.push(e)}shiftPiece(){let e=document.querySelector(".main-piece-container img"),t=document.querySelector(".pieces-container img:first-child");this.correctPieces.push(this.piecesQueue[0]),this.piecesQueue.shift(),this.piecesQueue.length>=1&&(t.classList.remove("slideIn"),this.container.removeChild(t),this.mainContainer.appendChild(t)),this.mainContainer.removeChild(e)}clearQueue(){this.mainContainer.innerHTML="",this.container.innerHTML="",this.piecesQueue=[]}renderCorrectPieces(){this.correctPieces.forEach(e=>{let t=new Image;t.src=e.src,this.imgContainer.appendChild(t)})}clearCorrectPiecesContainer(){this.correctPieces=[],this.imgContainer.innerHTML=""}info(){console.log(`\n        Queue lenght: ${this.getQueueLength()}\n        Pieces Sources length: ${this.piecesSrc.length}\n        Pieces on Queue: ${JSON.stringify(this.piecesQueue)}\n        `)}getQueueLength(){return this.piecesQueue.length}}const pieces=new PiecesQueue,createAudio=e=>{let t=new Audio;return t.src=e,t};let audio={theme:createAudio("./audio/dafunk.mp3")},gameState={gameSpeed:3e3,interval:null,score:0,scoreBoard:document.querySelector(".score"),bonusBoard:document.querySelector(".points-scored"),introduction:!1,start:!1,themePlaying:!1,renderBonus(){0==pieces.piecesQueue.length?this.bonusBoard.innerHTML="+150":this.bonusBoard.innerHTML="+50",this.bonusBoard.classList.add("foldUp"),this.bonusBoard.addEventListener("animationend",function(){gameState.bonusBoard.classList.remove("foldUp")})},renderScore(){this.scoreBoard.innerHTML=this.score},updateScore(){0==pieces.piecesQueue.length?this.score+=150:this.score+=50,this.renderScore()},updateSpeed(){console.log(gameState.speed),clearInterval(gameState.interval),gameState.gameSpeed=gameState.gameSpeed-100,gameState.interval=setInterval(function(){pieces.renderPiece(),gameState.checkGameOver()},gameState.gameSpeed),console.log(gameState.gameSpeed)},clearScore(){this.score=0},createInterval(){clearInterval(this.interval),this.interval=setInterval(function(){pieces.renderPiece(),gameState.checkGameOver()},this.gameSpeed)},checkGameOver(){pieces.piecesQueue.length>=11?gameOver():console.log("Game still on!")}},startBtn=document.querySelector(".start-btn"),startScreen=document.querySelector(".start-screen"),gameInput=document.querySelector(".game-input"),endScreen=document.querySelector(".final-screen"),endScreenScore=document.querySelector(".stats-score"),piece=document.querySelector(".pieces-container img"),playAgainBtn=document.querySelector(".play-again-btn");const liftStartScreen=()=>{startScreen.style.transform="translateY(-110vh)",gameState.renderScore(),pieces.renderManualScreen(),gameInput.focus(),gameConsole.renderInstructions(),audio.theme.play(),gameState.themePlaying=!0};startBtn.addEventListener("click",liftStartScreen,!1),gameInput.addEventListener("keydown",function({which:e}){13==e?checkAnswer()&&gameState.start?(gameConsole.type(gameConsole.getGoodMessage()),gameInput.classList.add("correct"),pieces.shiftPiece(),gameState.renderBonus(),gameState.updateScore(),gameState.gameSpeed>1e3&&(console.log("fez update!"),gameState.updateSpeed()),gameInput.value=""):!checkAnswer()&&gameState.start&&(pieces.renderPiece(),gameConsole.type(gameConsole.getBadMessage()),gameInput.classList.add("incorrect")):32==e&&gameState.introduction&&gameStart()},!1);const gameStart=()=>{gameState.start=!0,0==gameState.themePlaying&&audio.theme.play(),gameConsole.console.style.color="white",gameConsole.type("T!PE"),endScreen.style.transform="translateX(-110vw)",gameInput.focus(),gameInput.value="",gameState.gameSpeed=3e3,pieces.clearCorrectPiecesContainer(),0==pieces.piecesQueue.length&&pieces.renderFirstPiece(),gameState.renderScore(),gameState.interval=setInterval(function(){pieces.renderPiece(),gameState.checkGameOver()},gameState.gameSpeed)},checkAnswer=()=>{let e=document.querySelector(".main-piece-container img");return gameInput.value.toLowerCase().trim()==e.getAttribute("data-piece")},gameOver=()=>{pieces.renderCorrectPieces(),endScreenScore.innerHTML=gameState.score,endScreen.style.transform="translateX(0)",gameState.gameSpeed=5e3,pieces.clearQueue(),gameState.clearScore(),clearInterval(gameState.interval),pieces.container.classList.remove("warning"),audio.theme.pause(),audio.theme.currentTime=0,gameState.themePlaying=!1};playAgainBtn.addEventListener("click",gameStart,!1),gameInput.addEventListener("animationend",function(){gameInput.classList.remove("incorrect"),gameInput.classList.remove("correct")});