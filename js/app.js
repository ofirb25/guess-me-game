'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    if (getStorageTree() !== null) gQuestsTree = getStorageTree()
    else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    console.log(gQuestsTree)
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
            $('.logo').addClass('animated shake');     
            $('.gameQuest h2').text('I WON!')       
        } else {
            $('.gameQuest').hide();
            $('.gameNewQuest').show();
        }
    } else {
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
    var $newquest = createQuest($('#newQuest').val());
    var $guess = createQuest($('#newGuess').val());
    $newquest.no = gPrevQuest.yes;
    console.log($newquest, 'new quest')
    gPrevQuest[gLastRes] = $newquest;
    $newquest.yes = $guess;
    gCurrQuest = $newquest;
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

function updateStorageTree() {
    localStorage.setItem('QuestsTree', JSON.stringify(gQuestsTree));
}
function getStorageTree() {
    return JSON.parse(localStorage.getItem('QuestsTree'));
}
