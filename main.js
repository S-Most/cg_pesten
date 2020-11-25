import Deck from "./deck.js"
import {Hand} from "./deck.js"

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,    
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
    "Joker": 15
}

const CARD_SUITS_MAP = {
    "♥": 5,
    "♠": 6,
    "♦": 7,
    "♣": 8,    
    "✯": 1,
    "✮": 2,
    "☆": 3,
    "★": 4
}

const playerHandEle = document.querySelector(".playerCards")
const computerHandEle = document.querySelector(".computerCards")
const playedCardsEle = document.querySelector(".playedCards")
const deckEle = document.querySelector(".cardStack")
const form = document.querySelector("form")
const playingField = document.querySelector(".playingField")
const sortBtn = document.querySelector(".sort")

let playedCard, playedCardHTML ,playerHand, computerHand, deck, emptyDeck
let yourTurn = true

sortBtn.addEventListener("click", () => {
    if (playerHand.cards.length >1){
        sortPlayerHand()
        generateHands()
        addEventlisteners()
    }
})
form.addEventListener('submit', function getTarget(e) {
    e.preventDefault()
    form.style.display ="none"
    playingField.style.display = "flex"

    let suits = e.target.children[1].value
    let values = e.target.children[3].value
    let jokers = e.target.children[5].value
    form.reset()

    if (suits === "" || values === ""){   
        suits = 4
        values = 13
        jokers = 2
    }
    createObjects(suits, values, jokers)
   });

deckEle.addEventListener("click", () =>{
    drawCard()
})

function createObjects(suits, values, jokers){
    deck = new Deck(suits,values)
   
    let jokerCards = deck.generateJokers(jokers)
    if (jokerCards.length > 0){
        deck.cards.push(jokerCards)
        deck.cards = deck.cards.flat()
        deck.shuffle()
    }

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
    console.log(hand.cards.length, hand.cards)
    for(let i=0; i<hand.cards.length; i++) {
        
        let cardObject = hand.cards[i].generateHTML()
        if (hand.cards[i].value === "Joker"){
            cardObject.classList.add("joker")
        } else {
        cardObject.classList.add(cardClass)
        }
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
        setTimeout(() => pcMoves(), 500)
    }
}

function sortPlayerHand(){
    for(let j=0; j<playerHand.cards.length; j++){
        for(let i=0; i<playerHand.cards.length-1; i++){
            if (CARD_SUITS_MAP[playerHand.cards[i].suit] < CARD_SUITS_MAP[playerHand.cards[i+1].suit] || (CARD_SUITS_MAP[playerHand.cards[i].suit] == CARD_SUITS_MAP[playerHand.cards[i+1].suit] && CARD_VALUE_MAP[playerHand.cards[i].value] < CARD_VALUE_MAP[playerHand.cards[i+1].value])) {

                let tempCard = playerHand.cards[i]
                playerHand.cards[i] = playerHand.cards[i+1]
                playerHand.cards[i+1] = tempCard
            }
        }
    }
}

function generateHands(){
    // if (playerHand.cards.length > 1) {if (yourTurn)sortPlayerHand()}
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
            let action = checkValue(card)
            actUpon(action)
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
    
function checkValue(card){
    if (card.value === "7"){
        return "wait"
    }
    if (card.value === "8"){
        return "wait"
    }
    if (card.value === "K"){
        return "wait"
    }
    if (card.value ==="2"){
        return "draw"
    }
    if (card.value === "Joker"){
        return "joker"
    }
}

function actUpon(action){
    if (action === "wait"){
        } else { yourTurn = !yourTurn }

    if (action === "joker"){
        if (yourTurn){
            console.log("draw 5 cards")
            let tePakken = playerHand.drawCards(5, deck)
            checkEmpty()
            playerHand.drawCards(tePakken, deck)
        } else { 
            console.log("draw 5 cards")
            let tePakken = computerHand.drawCards(5, deck)
            checkEmpty()
            computerHand.drawCards(tePakken, deck)
        }
    }
    if (action === "draw"){
        if (yourTurn){
            console.log("draw 2 cards")
            playerHand.drawCards(2, deck)
        } else { 
            console.log("draw 2 cards")
            computerHand.drawCards(2, deck)}
    }
}


function addEventlisteners(){
    for (let i=0; i < playerHand.numberOfCards; i++){
        playerHandEle.children[i].addEventListener("click", function(){
            let card = playerHand.cards[i]
            if (canPlay(card)){
                let action = checkValue(card)
                actUpon(action)
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
    if (playedCard.value === card.value || playedCard.suit === card.suit || playedCard.value === "Joker" || card.value === "Joker"){
        return true
    } else { return false }
    
}

function checkEmpty(){
    if (deck.numberOfCards === 0){
        deck = emptyDeck
        deck.shuffle()
        emptyDeck = new Deck(0,0)
        updateDeckCount()
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

