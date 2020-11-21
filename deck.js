const SUITS = ["♥","♠","♦","♣","✪"]
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
]

export default class Deck {
    constructor(suits, values, cards = generateDeck(suits,values)) {
        
        this.cards = cards
        this.shuffle()
        console.log("new", this.cards)
    }

    get numberOfCards() {
        return this.cards.length
    }

    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i+1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

    get color(){
        return this.suit === '♥' || this.suit === '♦' ? 'red' : 'black'
        //watch out for different suits
    }


    generateHTML(){
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

export class Hand {
    constructor(){
        let cards = []
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    drawCards(numCards, deck){
        for (let i=0;i<numCards;i++){
            this.cards.push(deck.pop())
        }
    }

}
//global functions ------------------------------

function generateDeck(numSuits, numValues){
    return SUITS.slice(0,numSuits).flatMap((suit) => {
        return VALUES.slice(0,numValues).map((value) => {
            return new Card(suit, value);
        })
    })
}


