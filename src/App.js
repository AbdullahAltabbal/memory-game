import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'

const catsArray = [
  { "scr": "imgs/king.jpg", matched: false },
  { "scr": "imgs/queen.jpg", matched: false },
  { "scr": "imgs/joker.png", matched: false },
  { "scr": "imgs/joker2.png", matched: false },
  { "scr": "imgs/king2.jpg", matched: false },
  { "scr": "imgs/queen2.jfif", matched: false },

]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)



  //shuffle cards
  const suffleCatsCards = () => {
    const suffledCatsArray = [...catsArray, ...catsArray]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(suffledCatsArray);
    setTurns(0)
  }

  // handel choice
  const handelChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Matching Cards
  useEffect(() => {
    if (choiceTwo && choiceOne) {
      setDisabled(true)
      if (choiceOne.scr === choiceTwo.scr) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.scr === choiceOne.scr) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {
        setTimeout(() => { resetTurn() }, 700);
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  useEffect(() => {
    suffleCatsCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffleCatsCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handelChoice={handelChoice}
            key={card.id}
            card={card}
          >
          </Card>
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App