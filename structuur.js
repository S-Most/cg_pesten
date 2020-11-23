
setupGame(){
    createObjects()
    generateRound()
        generateHand(player)
        generateHand(computer)
        gerateMiddle()
            flip PlayedCard
            updateDeckCount()
    startRound()
}


betweenRounds(){
    generateHands()
    updateDeckCount()
    inRound()
}

inRound(){
    if(yourTurn){
        addEventlisteners()
            betweenRounds()  
    } else {
        pcMoves()
    }
}


playRound
    wait for userInput

cleanRound



addEventlisteners()
    needs to be called before userInput



create a variable canSelect

wrap all the functions with this variable === true



