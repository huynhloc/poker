import React, { useState, useMemo } from "react";
import {
  createDeck,
  shuffle,
  getTopCards,
  getRank,
  NUM_OF_CARD_PER_HAND,
} from "./utils";
import "./App.css";

function Card({ card }) {
  return (
    <div className="card">
      <span className="face">{card.face}</span>
      <div className={`suit ${card.suit}`}></div>
    </div>
  );
}

function App() {
  const [deck, setDeck] = useState(createDeck());
  const [top5Cards, setTop5Cards] = useState([]);
  const rank = useMemo(
    () =>
      top5Cards.length === NUM_OF_CARD_PER_HAND
        ? getRank(top5Cards).rank.title
        : "",
    [top5Cards]
  );

  const reset = () => {
    setDeck(createDeck());
    setTop5Cards([]);
  };
  const shuffleDeck = () => setDeck(shuffle(deck));
  const drawTopCards = () => setTop5Cards(getTopCards(deck));

  return (
    <div className="App">
      <div className="result">
        <div className="actions">
          <button className="button" onClick={drawTopCards}>
            Draw 5 Cards
          </button>
          <button className="button" onClick={shuffleDeck}>
            Shuffle
          </button>
          <button className="button" onClick={reset}>
            Reset
          </button>
        </div>
        <div className="cards">
          {top5Cards.map((card, index) => (
            <Card card={card} key={`topCard_${index}`} />
          ))}
        </div>
        {rank && <div className="rank">{rank}</div>}
      </div>
      <div className="cards">
        {deck.map((card, index) => (
          <Card card={card} key={`card_${index}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
