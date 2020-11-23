import Deck from "./deck.js"
import {Hand} from "./deck.js"

const playerHandEle = document.querySelector(".playerCards")
const computerHandEle = document.querySelector(".computerCards")
const playedCardsEle = document.querySelector(".playedCards")
const deckEle = document.querySelector(".cardStack")

let playedCard, playedCardHTML ,playerHand, computerHand, deck, emptyDeck
let yourTurn = true

deckEle.addEventListener("click", () =>{
    drawCard()
})

createObjects()
function createObjects(){

    deck = new Deck(4,13)
    emptyDeck = new Deck(0,0)

    playerHand = new Hand()
    playerHand.drawCards(5,deck)

    computerHand = new Hand()
    computerHand.drawCards(5,deck)

    generateRound()
}

function generateRound(){
    generateHands()
    generateMiddle()
    updateDeckCount()
    inRound()
}

function generateHand(hand,handEle,cardClass){
    handEle.innerHTML=""
    for(let i=0; i<hand.cards.length;i++) {
        let cardObject = hand.cards[i].generateHTML()
        cardObject.classList.add(cardClass)
        handEle.appendChild(cardObject)
    }
}

function generateMiddle(){
    playedCard = deck.pop()
    playedCardHTML = playedCard.generateHTML()
    playedCardsEle.appendChild(playedCardHTML)
    deckEle.classList.add("card","stack")
}

function updateDeckCount(){
    deckEle.innerText = deck.numberOfCards
}

function inRound(){
    if (yourTurn){
        addEventlisteners()
        console.log("myTurn")
    } else {
        console.log("pcTurn")
        setTimeout(() => { pcMoves()},500)
    }
}

function generateHands(){
    generateHand(playerHand, playerHandEle, "playercard")
    generateHand(computerHand, computerHandEle, "computercard")
}

function betweenRounds(){
    generateHands()
    updateDeckCount()
    let game = checkWinner()
    if (game === "over")
    {console.log("Game Over!")} 
    else {
    inRound()
}
}

function pcMoves(){
    for (let j = 0; j<computerHand.cards.length; j++){
        let card = computerHand.cards[j]

        if (canPlay(card)){
            yourTurn = !yourTurn
            console.log("computer played:", card.value, card.suit)
            playCard(card)
            computerHand.cards.splice(j,1)
            betweenRounds()
            return
        }
    } if (!yourTurn) {drawCard()}
}   

function drawCard(){
    checkEmpty()
    if (yourTurn){
        playerHand.drawCards(1,deck)
    } else { 
        computerHand.drawCards(1,deck)
    }
    yourTurn = !yourTurn
    generateHands()
    updateDeckCount()
    inRound()
}
    
function addEventlisteners(){
    for (let i=0; i < playerHand.numberOfCards; i++){
        playerHandEle.children[i].addEventListener("click", function(){
            let card = playerHand.cards[i]
            if (canPlay(card)){
                yourTurn = !yourTurn
                console.log("you played:", card.value, card.suit)
                playCard(card)
                playerHand.cards.splice(i,1)
                betweenRounds()
                return
            } else {
                console.log("Warning:",card.value, "!=", playedCard.value, " && ", card.suit, "!=", playedCard.suit)
            }
        })
    }
}

function playCard(card){
    emptyDeck.push(playedCard)
    playedCardsEle.innerHTML=""
    playedCardsEle.appendChild(card.generateHTML())
    playedCard = card
}

function canPlay(card){
    if (playedCard.value === card.value || playedCard.suit === card.suit){
        return true
    } else { return false }
    
}

function checkEmpty(){
    if (deck.numberOfCards === 0){
        deck = emptyDeck
        deck.shuffle()
        emptyDeck = new Deck(0,0)
    }
}

function checkWinner(){
    if (playerHand.cards.length === 0){
        console.log("You Won")
        playerHandEle.innerHTML="<h2>You Win!</br>Play again?</h2>"
        return "over"

    } else if (computerHand.cards.length === 0){
        console.log("You Lost")
        computerHandEle.innerHTML="<h2>You Loose!</br>Play again?</h2>"
        return "over"
    }
}

