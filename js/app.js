'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    if(getStorageTree() !== null)  gQuestsTree = getStorageTree()
    else {
        gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    $('.gameStart').hide();
    renderQuest();
}

function renderQuest() {    
    $('.gameQuest').show();
    $('.gameQuest h2').text(gCurrQuest.txt);
}

function userResponse(res) {
    // If this node has no children
    if (gCurrQuest.yes === null) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            // alert('I dont know...teach me!')
            $('.gameQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
     //   gPrevQuest = gCurrQuest.txt;
        if (res === 'yes') {
            gPrevQuest = gCurrQuest
            gCurrQuest = gCurrQuest.yes;
        } else {
            gPrevQuest = gCurrQuest
            gCurrQuest = gCurrQuest.no
        }
        console.log(gPrevQuest)
        gLastRes = res;
        console.log('last res?', gLastRes)
        renderQuest();
    }
}

function addGuess() {
    // TODO: create 2 new Quests based on the inputs' values
    var $newquest = createQuest($('#newQuest').val());
    var $guess = createQuest($('#newGuess').val());
    $newquest.no = gPrevQuest.yes;    
    console.log($newquest,'new quest')
    gPrevQuest[gLastRes] = $newquest;
    $newquest.yes = $guess;
    gCurrQuest = $newquest;
    // TODO: connect the 2 Quests to the quetsions tree    
    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() {
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    gCurrQuest = gQuestsTree;
    updateStorageTree()
    gPrevQuest = null;
    gLastRes = null;
}
function updateStorageTree(){
    localStorage.setItem('QuestsTree',JSON.stringify(gQuestsTree));
 }
 function getStorageTree(){
    return JSON.parse(localStorage.getItem('QuestsTree'));
 }