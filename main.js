import Deck from "./deck.js"
import {Hand} from "./deck.js"

const playerHandEle = document.querySelector(".playerCards")
const computerHandEle = document.querySelector(".computerCards")
const playedCardsEle = document.querySelector(".playedCards")
const deckEle = document.querySelector(".cardStack")



let playedCard, playerHand, computerHand, deck
let inRound = false
let playerTurn = true
let str_Class_player = "playercard"
let str_Class_computer = "computercard"

let playerObject

deckEle.addEventListener("click", function(){
    drawCard()
})

createObjects()
function createObjects(){

    deck = new Deck(4,13);

    playerHand = new Hand()
    playerHand.drawCards(5,deck)

    computerHand = new Hand()
    computerHand.drawCards(5,deck)

    generateRound()
}

function generateRound(){

    generateHand(playerHand, playerHandEle, str_Class_player)
    generateHand(computerHand, computerHandEle, str_Class_computer)
    generateMiddle()
    playRound()
}

function generateHand(hand,handEle,cardClass){
    
    handEle.innerHTML=""
    for(let i=0; i<hand.cards.length;i++) {

        let cardObject = hand.cards[i].generateHTML()
        cardObject.classList.add(cardClass)
        handEle.appendChild(cardObject)
    }
    updateDeckCount()
    
}

function generateMiddle(){

    playedCard = deck.pop().generateHTML()
    playedCardsEle.appendChild(playedCard)
    deckEle.classList.add("card","stack")
    updateDeckCount()

}

function updateDeckCount(){
    deckEle.innerText = deck.numberOfCards
}

function playRound(){
    inRound = true
    userInput()
    
}

function drawCard(){
    if (playerTurn){

        playerHand.drawCards(1,deck)
        userInput()
    }
}

function addEventlisteners(){

    for (let i=0; i < playerHand.numberOfCards; i++){

        playerHandEle.children[i].addEventListener("click", function(){

            let card = playerHand.cards[i]
            playerHand.cards.splice(i,1)
            console.log("deze kaart wordt gespeeld:", card)
            userInput()
        })
    }
}

function userInput(){

    generateHand(playerHand, playerHandEle, str_Class_player)
    addEventlisteners()
}