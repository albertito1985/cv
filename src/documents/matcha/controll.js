const globalState ={
    alternatives: 4,
    lang : ["es", "sv"],
}

//pasar las funciónes a objetos
// let words = {
//     import: {
//         wordGroupA : ["who?","what?","when?","where?"],
//         wordGroupB : ["Me","A boll","At 6 o'clock","in the living room"]
//     },
//     memory:[],
//     actualObjects:{},
//     wrong:{},
// };

let wordImport ={
    wordGroupA : ["Mahatma Ghandi","Steve Jobs","Charlotte Kalla","Salvador Dalí"],
    wordGroupB : ["India","Apple","Ski","Surrealism"]
}

let wordMemory = [];

let ActualWordObjects = {};

let wrongWords= {};

let gameState = {
    correct : 0,
    incorrect: null,
    newRound: false,
    round: 0,
    lifes: 3,
    endGame: false,
}

function start(){ 
    if(gameState.endGame === true) resetGame();
    if(wordMemory[gameState.round]){
        ActualWordObjects = wordMemory[gameState.round]
    }else{
        wordImport = requestNewWords();
        let words;
        words = objectifyWords(wordImport);
        words = pairWords(words);
        words = randomizeElements(words);
        wordMemory.push(words);
        ActualWordObjects = words;
    }
}

function requestNewWords(){
    //aquí se piden nuevas palabras al servidorpero
    //vamos a usar las mismas solo para build
    return wordImport;
}

function matchWords(word1,word2){
    if(word1.pair === word2.word){
        changeMatchedStatus(word1);
        changeMatchedStatus(word2);
        gameState.correct++;
        if (gameState.correct%globalState.alternatives===0){
            gameState.newRound = true;
            gameState.round++;
            start();
        }
        return true;
    }else if(word1===word2){
        return false;
    }else{
        gameState.lifes--;
        addWrongWords(word1);
        addWrongWords(word2);
        if(gameState.lifes === 0){
            gameState.endGame = true;
            wrongWords=top3(wrongWords);
        };
        return false;
    }
}

function top3(wordsArray){//aquí me quedé
    let cleanArray = addAndDeletePairs(wordsArray);
    let cleanAndOrderedArray =  timesOrderArray(cleanArray).slice(0,3);
    
    return cleanAndOrderedArray;
   
    function timesOrderArray(wordsArray){
        
        let highestTimes = 0;
        let keys = Object.keys(wordsArray);
        keys.forEach((value)=>{
            highestTimes = (wordsArray[value].times>highestTimes)? wordsArray[value].times: highestTimes;
        });
        return orderArray(wordsArray).slice(0,3);

        function orderArray(wordsArray){
            let cache=[]
            while(highestTimes>-1){
                for(let i=0;i<keys.length;i++){
                    if(wordsArray[keys[i]].times===highestTimes){
                        cache.push(wordsArray[keys[i]]);
                    }
                }
                highestTimes--;
            };
            return cache.reverse();
        }
    };

    function addAndDeletePairs(wordsArray){
        let cache = wordsArray;
        let actualIndex = 0
        let keys = Object.keys(cache);
        do{
            let pair = cache[keys[actualIndex]].pair;
            if(cache[pair]){
                cache[keys[actualIndex]].times += cache[pair].times;
                delete cache[pair];
                let indexOfPair= keys.indexOf(pair);
                let keysRest= keys.slice(indexOfPair+1,keys.length);
                let numberOfReplacements = keys.length-indexOfPair;
                keys.splice(indexOfPair, numberOfReplacements, ...keysRest)
            }
            (keys[actualIndex+1])? actualIndex++ : actualIndex=false;
        }while(actualIndex);
        return cache;
    };
}

function resetGame(){
    gameState.round = 0;
    gameState.lifes = 3;
    gameState.correct = 0;
    gameState.endGame = false;
    wrongWords = [];

}

function addWrongWords(word){
    if(wrongWords[word.word]){
        wrongWords[word.word].times++;
    }else{
        wrongWords[word.word] ={
            times : 1,
            word: word.word,
            pair: word.pair,
            group:word.group,
        };
    };
}

function changeMatchedStatus(word){
    let index = ActualWordObjects[word.group].findIndex((object)=>object===word);
    ActualWordObjects[word.group][index].matched = true;
}

function randomizeElements(words){
    const randomizedElements = {};
    let position= 0;
    Object.keys(words).forEach((key)=>{
        let randomNumbers = randomizeNumbers(words[key].length);
        randomizedElements[key] = [];
        words[key].forEach((value, index)=>{
            // randomizedElements[key][index]= randomizedElements[key][index] || {};
            randomizedElements[key][index]= {...randomizedElements[key][index], position: position};
            randomizedElements[key][randomNumbers[index]]={...value,...randomizedElements[key][randomNumbers[index]]};
            position++;
        });
    });
    return randomizedElements;
}

function pairWords(incommingWords){
    let outcommingWordsObjects={}
    Object.keys(incommingWords).forEach((key)=>{
        var otherGroup= null;
        Object.keys(incommingWords).forEach((key2)=>{
            otherGroup = (key===key2)? otherGroup : key2;
        });
            outcommingWordsObjects[key]= [];
        incommingWords[key].forEach((value,index)=>{
            outcommingWordsObjects[key][index] = {
                ...incommingWords[key][index],
                pair:incommingWords[otherGroup][index].word
            }
        });
    });
    return outcommingWordsObjects;
}

function objectifyWords(incommingWords){
    let outcommingWordObjects={}
    Object.keys(incommingWords).forEach((key)=>{
        outcommingWordObjects[key]= [];
        incommingWords[key].forEach((value,index)=>{
            outcommingWordObjects[key].push({
                group:key,
                word: value,
                matched: false,
            });
        });
    });
    return outcommingWordObjects;
}

function randomizeNumbers(quantity){
    let chosen_array =[];
    for (let i=0;i<quantity;i++){
        let chosen_new =Math.floor(Math.random() * quantity);
        for (let x=0;x<chosen_array.length;){
            if(chosen_array[x] === chosen_new){
                x=0;
                chosen_new = Math.floor(Math.random() * quantity);
            }else{
                x++;
            };
        };
        chosen_array.push(chosen_new);
    };
return chosen_array;
}

export {start,ActualWordObjects,matchWords,gameState,wrongWords}