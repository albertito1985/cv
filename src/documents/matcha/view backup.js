import {start, gameState, ActualWordObjects, matchWords} from './controll.js';

let clickData = "";

window.loadGame = function (){
    //createCourtine();
    courtine.create();
    //loadGame();
    game.load();
};

let courtine = {
    object : document.getElementById("courtine"),
    changeMessage: function (message){
        let messageContainer = document.getElementById("messageContainer");
        messageContainer.textContent = message;
    },
    clickable: function (){
        this.object.addEventListener('click', courtine.lift);
    },
    create : function (){
        this.changeMessage("Click here to start");
        this.clickable();
    },
    move: function(movement,callback){
        let startBottomPosition = courtine.object.getBoundingClientRect().bottom;
        let courtineTopPosition = courtine.object.offsetTop;
        let speed = 5;
        let stopmeasure;
        let test;

        if(movement === "lift"){
            speed *= (-1);
            stopmeasure = (startBottomPosition*-1);
            test = ()=> courtineTopPosition <=  stopmeasure;
        }else{
            stopmeasure = 0;
            test = ()=>courtineTopPosition >=  stopmeasure;
        }

        var id = setInterval(frame, 5);

        function frame() {
            if (test()) {
                courtine.object.style.top = stopmeasure;
                clearInterval(id);
                if(movement === "lift"){
                    courtine.object.removeEventListener('click', courtine.lift);
                }else{
                    courtine.object.addEventListener('click', courtine.lift);
                }
                if(callback)callback();
                //el juego se reinicia antes de que se cierre la cortina
            } else {
                courtineTopPosition += speed;
                courtine.object.style.top = courtineTopPosition + 'px';
            }
        }
    },
    lift: function(){
        courtine.move("lift");
    },
}

let scoreBoard = {
    lifes : document.getElementById("lifes"),
    score: document.getElementById("score"),
    lifeChange: function (){
        if(gameState.lifes===0){
            this.lifes.innerText = gameState.lifes;
            scoreBoard.animate.minusLife();
            courtine.changeMessage("Play again");//cambiar el mensaje a un resumen de las palabras que faltan estudiar
            //moveCourtine("drop",()=>newGame());
            courtine.move("drop",()=>game.new());
        }else{
            if(parseInt(this.lifes.innerText) !== gameState.lifes){
                scoreBoard.animate.minusLife();
            }
            this.lifes.innerText = gameState.lifes;
        }
    },
    scoreChange: function(){
        this.score.innerText = gameState.correct;
        if(gameState.newRound === true){
            setTimeout(()=>game.new(),500);
            gameState.newRound = false;
        }
    },
    update: function (){
        scoreBoard.scoreChange();
        scoreBoard.lifeChange();
    },
    animate: {
        minusLife: function(){
            let lifes = scoreBoard.lifes;
            lifes.className += " lifeMinus";
            setTimeout(()=>delete_class(lifes,"lifeMinus"),100);
        },
    },
};

// function courtineClick(){
//     //moveCourtine("lift");
//     courtine.move("lift");
// }

// function moveCourtine(movement,callback){
//     let courtine = document.getElementById("courtine");
//     let startBottomPosition = courtine.getBoundingClientRect().bottom;
//     let courtineTopPosition = courtine.offsetTop;
//     let speed = 5;
//     let stopmeasure;
//     let test;

//     if(movement === "lift"){
//         speed *= (-1);
//         stopmeasure = (startBottomPosition*-1);
//         test = ()=> courtineTopPosition <=  stopmeasure;
//     }else{
//         stopmeasure = 0;
//         test = ()=>courtineTopPosition >=  stopmeasure;
//     }

//     var id = setInterval(frame, 5);

//     function frame() {
//         if (test()) {
//             courtine.style.top = stopmeasure;
//             clearInterval(id);
//             if(movement === "lift"){
//                 courtine.removeEventListener('click', courtineClick);
//             }else{
//                 courtine.addEventListener('click', courtineClick);
//             }
//             if(callback)callback();
//             //el juego se reinicia antes de que se cierre la cortina
//         } else {
//             courtineTopPosition += speed;
//             courtine.style.top = courtineTopPosition + 'px';
//         }
//     }
// }

// function courtineMessageChange(message){
//     let messageContainer = document.getElementById("messageContainer");
//     messageContainer.textContent = message;
// }


// function createCourtine(message="Click here to start"){//la cortina ta está creada,ésta functión solo le introduce el mensaje y el clicklistener
//     let messageContainer = document.getElementById("messageContainer");
//     messageContainer.textContent = message;
//     let courtine = document.getElementById("courtine");
//     courtine.addEventListener('click', courtineClick);
// }

let game = {
    column1: document.getElementById("column1"),
    column2: document.getElementById("column2"),
    load : function(){
        start();
        scoreBoard.update();
        //createAlternatives(ActualWordObjects);//aquí me quedé
        this.createAlternatives()
        let canvas = document.querySelector("canvas");
        canvas.height=document.getElementsByClassName("column1")[0].clientHeight;
        canvas.width=document.getElementsByClassName("canvasContainer")[0].clientWidth;
    },
    createAlternatives: function(){
        ActualWordObjects[Object.keys(ActualWordObjects)[0]]
            .forEach((value)=>{
                const alternativeDivs = new Alternative(value);
                this.column1.appendChild(alternativeDivs);
            });
            ActualWordObjects[Object.keys(ActualWordObjects)[1]]
            .forEach((value)=>{
                const alternativeDivs = new Alternative(value);
                this.column2.appendChild(alternativeDivs);
            });
        
        addBasicListeners(this.column1)
        this.column1.addEventListener('click',click);
        this.column1.addEventListener('mouseover', mouseOver);
        this.column1.addEventListener('mouseout', mouseOut);
        
        addBasicListeners(this.column2)
        this.column2.addEventListener('click',click);
        this.column2.addEventListener('mouseover', mouseOver);
        this.column2.addEventListener('mouseout', mouseOut);
    },
    new: function(){
        start();
        scoreBoard.update();
        let column1alternatives = this.column1.children;
        let column2alternatives = this.column2.children;
    
        ActualWordObjects[Object.keys(ActualWordObjects)[0]]
            .forEach((value,index)=>{
                Array.prototype
                    .slice
                        .call(column1alternatives[index].children)
                            .forEach((div)=>{
                                div.innerText = value.word;
                                div.object = value;
                                if(Array.prototype.slice.call(div.classList).includes("alternativeOn")){
                                    div.style.display = "flex";
                                }else{
                                    div.style.display = "none";
                                }
                            });
            });
            ActualWordObjects[Object.keys(ActualWordObjects)[1]]
            .forEach((value,index)=>{
                Array.prototype
                    .slice
                        .call(column2alternatives[index].children)
                            .forEach((div)=>{
                                div.innerText = value.word;
                                div.object = value;
                                if(Array.prototype.slice.call(div.classList).includes("alternativeOn")){
                                    div.style.display = "flex";
                                }else{
                                    div.style.display = "none";
                                }
                            });
            });
        let canvas = document.getElementsByTagName("canvas")[0];
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    },
    matchAlternatives: function(originDiv,targetDiv){
        if(matchWords(originDiv.object, targetDiv.object)){
            inactivateDiv(originDiv);
            inactivateDiv(targetDiv);
            joint_line(originDiv, targetDiv);
            scoreBoard.scoreChange();
            removeMouseoverClass(originDiv);
            removeMouseoverClass(targetDiv);
        }else{
            scoreBoard.lifeChange();
            removeMouseoverClass(originDiv);
            removeMouseoverClass(targetDiv);
        }
    },
};

// function match(originDiv,targetDiv,e){
//     if(matchWords(originDiv.object, targetDiv.object)){
//         inactivateDiv(originDiv);
//         inactivateDiv(targetDiv);
//         joint_line(originDiv, targetDiv);
//         scoreBoard.scoreChange();
//         removeMouseoverClass(originDiv);
//         removeMouseoverClass(targetDiv);
//     }else{
//         scoreBoard.lifeChange();
//         removeMouseoverClass(originDiv);
//         removeMouseoverClass(targetDiv);
//     }
// }



// function loadGame() {
//     start();
//     scoreBoard.update(); 
//     createAlternatives(ActualWordObjects);
//     let canvas = document.querySelector("canvas");
//     canvas.height=document.getElementsByClassName("column1")[0].clientHeight;
// 	canvas.width=document.getElementsByClassName("canvasContainer")[0].clientWidth;
// }

// function newGame(){
//     start();
//     scoreBoard.update();
//     let column1alternatives = document.getElementsByClassName("column1")[0].children;
//     let column2alternatives = document.getElementsByClassName("column2")[0].children;

//     ActualWordObjects[Object.keys(ActualWordObjects)[0]]
//         .forEach((value,index)=>{
//             Array.prototype
//                 .slice
//                     .call(column1alternatives[index].children)
//                         .forEach((div)=>{
//                             div.innerText = value.word;
//                             div.object = value;
//                             if(Array.prototype.slice.call(div.classList).includes("alternativeOn")){
//                                 div.style.display = "flex";
//                             }else{
//                                 div.style.display = "none";
//                             }
//                         });
//         });
//         ActualWordObjects[Object.keys(ActualWordObjects)[1]]
//         .forEach((value,index)=>{
//             Array.prototype
//                 .slice
//                     .call(column2alternatives[index].children)
//                         .forEach((div)=>{
//                             div.innerText = value.word;
//                             div.object = value;
//                             if(Array.prototype.slice.call(div.classList).includes("alternativeOn")){
//                                 div.style.display = "flex";
//                             }else{
//                                 div.style.display = "none";
//                             }
//                         });
//         });
//     let canvas = document.getElementsByTagName("canvas")[0];
//     let context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);
// }

// function createAlternatives(words){
//     const column1 = document.getElementById("column1");
//     const column2 = document.getElementById("column2");

//     words[Object.keys(words)[0]]
//         .forEach((value)=>{
//             const alternativeDivs = new Alternative(value);
//             column1.appendChild(alternativeDivs);
//         });
//     words[Object.keys(words)[1]]
//         .forEach((value)=>{
//             const alternativeDivs = new Alternative(value);
//             column2.appendChild(alternativeDivs);
//         });
    
//     addBasicListeners(column1)
//     column1.addEventListener('click',click);
//     column1.addEventListener('mouseover', mouseOver);
//     column1.addEventListener('mouseout', mouseOut);
    
//     addBasicListeners(column2)
//     column2.addEventListener('click',click);
//     column2.addEventListener('mouseover', mouseOver);
//     column2.addEventListener('mouseout', mouseOut);
// }

function addBasicListeners(column){
	column.addEventListener('dragstart', dragStart);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragover' , dragOver);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', drop);
}

function removeBasicListeners(column){
	column.removeEventListener('dragstart', dragStart);
    column.removeEventListener('dragenter', dragEnter);
    column.removeEventListener('dragover' , dragOver);
    column.removeEventListener('dragleave', dragLeave);
    column.removeEventListener('drop', drop);
}




// let scoreboard = {//para reparar
//     lifeChange: function(){
//         if(gameState.lifes===0){
//             let lifes = document.getElementById("lifes");
//             lifes.innerText = gameState.lifes;
//             animationMinusLife()
//             courtine.changeMessage("Play again");//cambiar el mensaje a un resumen de las palabras que faltan estudiar
//             moveCourtine("drop",()=>newGame());
//         }else{
//             let lifes = document.getElementById("lifes");
//             lifes.innerText = gameState.lifes;
//             animationMinusLife();
//         }
//     },
// }




// function lifeChange(){
//     if(gameState.lifes===0){
//         let lifes = document.getElementById("lifes");
//         lifes.innerText = gameState.lifes;
//         animationMinusLife()
//         courtine.changeMessage("Play again");//cambiar el mensaje a un resumen de las palabras que faltan estudiar
//         //moveCourtine("drop",()=>newGame());
//         courtine.move("drop",()=>newGame());
//     }else{
//         let lifes = document.getElementById("lifes");
//         lifes.innerText = gameState.lifes;
//         animationMinusLife();
//     }
// }

// function animationMinusLife(){
//     let lifes = document.getElementById("lifesRow");
//     lifes.className += " lifeMinus";
//     setTimeout(()=>delete_class(lifes,"lifeMinus"),100);
// }

// function scoreChange(){
//     let score = document.getElementById("score");
//     score.innerText = gameState.correct;
//     if(gameState.newRound === true){
//         setTimeout(()=>newGame(),500);
//         gameState.newRound = false;
//     }
// }

// function updateScoreTable(){
//     scoreBoard.scoreChange();
//     scoreBoard.lifeChange();
// }







function click(e){
    const column1 = document.getElementById("column1");
    const column2 = document.getElementById("column2");
    if(clickData===""){
        clickData = e.target.id;
        removeBasicListeners(column1);
        removeBasicListeners(column2);
        mouseOver(e);
    }else{
        let origin = document.getElementById(clickData);
        let target = e.target;
        game.matchAlternatives(origin,target);
        addBasicListeners(column1);
        addBasicListeners(column2);
        clickData="";
    }   
}

function drop(e){
    let origin = document.getElementById(e.dataTransfer.getData("text"));
    let target = e.target;
    game.matchAlternatives(origin,target)
}

function mouseOver (e){
    e.preventDefault();
    let regex = /\balternativeOn\b/;
    if(e.target.className.match(regex)){
        if(e.target.parentElement.parentElement.className.match("column1")){    
            e.target.className += " mouseOverRight";
        }else{
            e.target.className += " mouseOverLeft";
        }
    };
};

function mouseOut (e){
    let regex = /\balternativeOn\b/;
    if(e.target.className.match(regex)){
        if(e.target.parentElement.parentElement.className.match("column1")){
            delete_class(e.target, " mouseOverRight");
        }else{
            delete_class(e.target, " mouseOverLeft");
        }
    };
    
};

function dragStart (e){
    let object = e.target.id;
    e.dataTransfer.setData("text",object);
};

function dragEnter(e){
    e.preventDefault();
    let regex = /\balternativeOn\b/;
    if(e.target.className.match(regex)){
        if(e.target.parentElement.parentElement.className.match("column1")){
            e.target.className += " mouseOverRight";
        }else{
            e.target.className += " mouseOverLeft";
        }
    };
};

function dragOver(e){
e.preventDefault();// necesario para que acepte el drop
};

function dragLeave (e){
    let regex = /\balternativeOn\b/;
    if(e.target.className.match(regex)){
        if(e.target.parentElement.parentElement.className.match("column1")){
            delete_class(e.target, " mouseOverRight");
        }else{
            delete_class(e.target, " mouseOverLeft");
        }
    };
};

function inactivateDiv(div){
    let divOffId = onOff(div.id);
    let offDiv = document.getElementById(divOffId);
    offDiv.style.display="flex";
    div.style.display = "none";
}

function onOff(string){
    let regEx = /\balternativeOn([0-9])\b/;
    let number= regEx.exec(string)[1];
    return `alternativeOff${number}`;
}

function delete_class(object, name){
    if (object.className.search(name)){
        let temp = object.className.replace(name, '');
        object.className = (temp === '')? null : temp;
    };
};

function removeMouseoverClass(AlternativeDiv){
    if(AlternativeDiv.parentElement.parentElement.className.match("column1")){
        delete_class(AlternativeDiv, " mouseOverRight");
    }else{
        delete_class(AlternativeDiv, " mouseOverLeft");
    }
}

function joint_line(draged, matched){
    const cx = document.querySelector("canvas").getContext("2d");
    let canvasRightEnd=document.querySelector("canvas").width-10;
    let canvasLeftEnd = 10;
    let spaceOver = document.getElementsByClassName("Matcha")[0].offsetTop;
    if(draged.object.position<matched.object.position){
        var leftHeight = (draged.parentElement.offsetTop-spaceOver)+(draged.parentElement.clientHeight/2);
        var rightHeight = (matched.parentElement.offsetTop-spaceOver)+(matched.parentElement.clientHeight/2);
    }else{
        // eslint-disable-next-line no-redeclare
        var rightHeight = (draged.parentElement.offsetTop-spaceOver)+(draged.parentElement.clientHeight/2);
        // eslint-disable-next-line no-redeclare
        var leftHeight = (matched.parentElement.offsetTop-spaceOver)+(matched.parentElement.clientHeight/2);
    }
    cx.beginPath();
    cx.moveTo(canvasLeftEnd,leftHeight);
    cx.lineTo(canvasRightEnd,rightHeight);
    cx.lineWidth = 10;
    cx.lineCap= "round";
    cx.stroke();
}

class Alternative{
    constructor(wordObject){
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let both = document.createElement("div");

        div1.id = `alternativeOn${wordObject.position}`;
        div1.object = wordObject;
        div1.className = "alternativeOn alternative";
        div1.draggable = true;
        div1.appendChild(document.createTextNode(wordObject.word));

        div2.id = `alternativeOff${wordObject.position}`;
        div2.className = "alternativeOff alternative";
        div2.draggable = false;
        div2.appendChild(document.createTextNode(wordObject.word));

        both.className="alternativeContainer"
        both.appendChild(div1);
        both.appendChild(div2);
        
        return both;
    }
}