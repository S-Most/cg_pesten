const SUITS = ["♥","♠","♦","♣"]
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
const JOKERSUITS = ["✯","✮","☆","★"]

export default class Deck {
    constructor(suits, values, cards = generateDeck(suits,values)) {
        
        this.cards = cards
        this.shuffle()
        console.log("new", this.cards)
    }

    generateJokers(numJokers){
        // if (numJokers !== 1 && numJokers !== 2 && numJokers !== 3 && numJokers !== 4){
        //     numJokers = 2
        // }
        let cards = []
        for (let i=0; i<numJokers; i++){
            cards.push(new Card(JOKERSUITS[i], "Joker"))
        } return cards
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
    }

    generateHTML(){
        const cardDiv = document.createElement('div')
        cardDiv.innerText = this.suit
        if (this.value !== "Joker"){
            cardDiv.classList.add("card", this.color)
            cardDiv.dataset.value = `${this.value} ${this.suit}`
        } else {
            cardDiv.classList.add("joker")
            cardDiv.dataset.value = "Joker"
        }
        
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
        let tePakken = numCards
        for (let i=0;i<numCards;i++){
            if (deck.numberOfCards > 0){
                this.cards.push(deck.pop())
                tePakken -= 1
            } else {return tePakken}
        }  
    }
}

function generateDeck(numSuits, numValues){
    return SUITS.slice(0,numSuits).flatMap((suit) => {
        return VALUES.slice(0,numValues).map((value) => {
            return new Card(suit, value);
        })
    })
}



