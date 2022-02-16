import {start, gameState, ActualWordObjects, matchWords,wrongWords} from './controll.js';

let clickData = "";

window.loadGame = function (){
    courtine.create();
    game.load();
};
window.endGame = function(){
    courtine.changeMessage("Play again");
    gameState.endGame = true;
    courtine.move("drop",()=>game.new());
};

let courtine = {
    object : document.getElementById("courtine"),
    changeMessage: function (message){
        let messageContainer = document.getElementById("messageContainer");
        messageContainer.textContent = message;
    },
    changeWrongWords: function (words){
        let rows = Array.prototype.slice.call(document.getElementsByClassName("wrongTablesRow"));
        Object.keys(words).forEach((value,index)=>{
            // let row = `tableData${index}`;
            if(words[value].group==="wordGroupA"){
                rows[index].children[0].textContent = words[value].word;
                rows[index].children[1].textContent = words[value].pair;
            }else{
                rows[index].children[0].textContent = words[value].pair;
                rows[index].children[1].textContent = words[value].word;
            };
            
        });

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
        let containerTopPosition = document.getElementById("Matcha").offsetTop;
        let courtineTopPosition = courtine.object.offsetTop;
        
        let speed = 5;
        let stopmeasure;
        let test;

        if(movement === "lift"){
            speed *= (-1);
            stopmeasure = ((startBottomPosition+5)*-1);
            test = ()=> courtineTopPosition <=  stopmeasure;
        }else{
            stopmeasure = containerTopPosition;
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
            } else {
                courtine.object.style.top = courtineTopPosition + 'px';
                courtineTopPosition += speed;
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
            courtine.changeMessage("Play again");
            courtine.changeWrongWords(wrongWords);
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
            setTimeout(()=>delete_class(lifes,"lifeMinus"),500);
        },
    },
};

let canvas = {
    object : document.querySelector("canvas"),
    canvasContainer: document.getElementsByClassName("canvasContainer")[0],
    round: document.getElementById("round"),
    stretchDiv:function(){
        this.object.height=document.getElementsByClassName("column1")[0].clientHeight;
        this.object.width=canvas.canvasContainer.clientWidth;
        this.roundChange();
    },
    drawJointLine: function (draged, matched){
        const cx = canvas.object.getContext("2d");
        let canvasRightEnd=canvas.object.width-10;
        let canvasLeftEnd = 10;
        let spaceOver = document.getElementsByClassName("canvasContainer")[0].offsetTop;
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
    },
    roundChange: function(){
        this.round.innerText=`Round ${gameState.round+1}`;
    },
};

let game = {
    column1: document.getElementById("column1"),
    column2: document.getElementById("column2"),
    load : function(){
        start();
        scoreBoard.update();
        alternatives.create();
        canvas.stretchDiv();
    },
    new: function(){
        start();
        scoreBoard.update();
        canvas.roundChange();
        
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
        let canvasElement = document.getElementsByTagName("canvas")[0];
        let context = canvasElement.getContext("2d");
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    },
};

let alternatives={
    column1: document.getElementById("column1"),
    column2: document.getElementById("column2"),
    create: function(){
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
        this.addAllListeners(this.column1)
        this.addAllListeners(this.column2)
    },
    match: function(originDiv,targetDiv){
        if(matchWords(originDiv.object, targetDiv.object)){
            this.inactivate(originDiv);
            this.inactivate(targetDiv);

            canvas.drawJointLine(originDiv, targetDiv);
            scoreBoard.scoreChange();
            removeMouseoverClass(originDiv);
            removeMouseoverClass(targetDiv);
        }else if(originDiv.object === targetDiv.object){
            removeMouseoverClass(originDiv);
            clickData="";
        }else{
            scoreBoard.lifeChange();
            removeMouseoverClass(originDiv);
            removeMouseoverClass(targetDiv);
        }
    },
    addBasicListeners: function(column){
        column.addEventListener('dragstart', eventHandlers.dragStart);
        column.addEventListener('dragenter', eventHandlers.dragEnter);
        column.addEventListener('dragover' , eventHandlers.dragOver);
        column.addEventListener('dragleave', eventHandlers.dragLeave);
        column.addEventListener('drop', eventHandlers.drop);
    },
    addAllListeners: function(column){
        this.addBasicListeners(column);
        column.addEventListener('click',eventHandlers.click);
        column.addEventListener('mouseover', eventHandlers.mouseOver);
        column.addEventListener('mouseout', eventHandlers.mouseOut);
    },
    removeBasicListeners: function(column){
        column.removeEventListener('dragstart', eventHandlers.dragStart);
        column.removeEventListener('dragenter', eventHandlers.dragEnter);
        column.removeEventListener('dragover' , eventHandlers.dragOver);
        column.removeEventListener('dragleave', eventHandlers.dragLeave);
        column.removeEventListener('drop', eventHandlers.drop);
    },
    inactivate: function (div){
        let divOffId = this.onOff(div.id);
        let offDiv = document.getElementById(divOffId);
        offDiv.style.display="flex";
        div.style.display = "none";
    },
    onOff: function(string){
        let regEx = /\balternativeOn([0-9])\b/;
        let number= regEx.exec(string)[1];
        return `alternativeOff${number}`;
    },
}

let eventHandlers = {
    column1 : document.getElementById("column1"),
    column2 : document.getElementById("column2"),
    click: function (e){
        let regex = /\balternativeOn\b/;
        if(e.target.className.match(regex)){
            let classList = Array.prototype.slice.call(e.target.classList).find(element=> element === "alternativeOff");
            if(classList){return 0};
            if(clickData===""){
                clickData = e.target.id;
                alternatives.removeBasicListeners(eventHandlers.column1);
                alternatives.removeBasicListeners(eventHandlers.column2);
                eventHandlers.mouseOver(e);
            }else{
                let origin = document.getElementById(clickData);
                let target = e.target;
                alternatives.match(origin,target);
                alternatives.addBasicListeners(eventHandlers.column1);
                alternatives.addBasicListeners(eventHandlers.column2);
                clickData="";
            } 
        };
    },
    drop: function (e){
        let regex = /\balternativeOn/;
        if(e.target.className.match(regex)){
            let origin = document.getElementById(e.dataTransfer.getData("text"));
            let target = e.target;
            alternatives.match(origin,target);
        };
    },
    mouseOver: function (e){
        e.preventDefault();
        let regex = /\balternativeOn\b/;
        if(e.target.className.match(regex)){
            if(e.target.parentElement.parentElement.className.match("column1")){    
                e.target.className += " mouseOverRight";
            }else{
                e.target.className += " mouseOverLeft";
            }
        };
    },
    mouseOut: function (e){
        let regex = /\balternativeOn\b/;
        if(e.target.className.match(regex)){
            if(e.target.parentElement.parentElement.className.match("column1")){
                delete_class(e.target, " mouseOverRight");
            }else{
                delete_class(e.target, " mouseOverLeft");
            }
        };
    },
    dragStart: function (e){
        let regex = /\balternativeOn/;
        if(e.target.className.match(regex)){
            let object = e.target.id;
            e.dataTransfer.setData("text",object);
        };
    },
    dragEnter: function (e){
        e.preventDefault();
        let regex = /\balternativeOn\b/;
        if(e.target.className.match(regex)){
            if(e.target.parentElement.parentElement.className.match("column1")){
                e.target.className += " mouseOverRight";
            }else{
                e.target.className += " mouseOverLeft";
            }
        };
    },
    dragOver:function(e){
        e.preventDefault();// necesario para que acepte el drop
    },
    dragLeave: function (e){
        let regex = /\balternativeOn\b/;
        if(e.target.className.match(regex)){
            if(e.target.parentElement.parentElement.className.match("column1")){
                delete_class(e.target, " mouseOverRight");
            }else{
                delete_class(e.target, " mouseOverLeft");
            }
        };
    },
};

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

class Alternative{
    constructor(wordObject){
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let container = document.createElement("div");

        div1.id = `alternativeOn${wordObject.position}`;
        div1.object = wordObject;
        div1.className = "alternativeOn alternative";
        div1.draggable = true;
        div1.appendChild(document.createTextNode(wordObject.word));

        div2.id = `alternativeOff${wordObject.position}`;
        div2.className = "alternativeOff alternative";
        div2.draggable = false;
        div2.appendChild(document.createTextNode(wordObject.word));

        container.className="alternativeContainer"
        container.appendChild(div1);
        container.appendChild(div2);
        
        return container;
    }
}