import React, {  useState, useMemo } from 'react';
import { createDeck, shuffle, getTop5Cards, getRank } from './utils';
import './App.css';

const RANK = {
  1: 'royal flush',
  2: 'straight flush',
  3: 'four of a kind',
  4: 'full house',
  5: 'flush',
  6: 'straight',
  7: 'three of a kind',
  8: 'two pair',
  9: 'one pair',
  10: 'high card'
};

function Card({card}) {
  return <div className="card">
    <span className="face">{card.face}</span>
    <div className={`suit ${card.suit}`}></div>
  </div>
}

function App() {
  const [deck, setDeck] = useState(createDeck());
  const [top5Cards, setTop5Cards] = useState([]);
  const rank = useMemo(() => top5Cards.length === 5 ? RANK[getRank(top5Cards).rank] : '', [top5Cards]);

  const reset = () => {
    setDeck(createDeck());
    setTop5Cards([]);
  }
  const shuffleDeck = () => setDeck(shuffle(deck));
  const drawTop5Cards = () => setTop5Cards(getTop5Cards(deck));

  return (
    <div className="App">
      <div className="cards">
        {deck.map((card, index) => <Card card={card} key={`card_${index}`}/>)}
      </div>
      <div className="result">
        <div className="actions">
          <button className="button" onClick={drawTop5Cards}>Draw 5 Cards</button>
          <button className="button" onClick={shuffleDeck}>Shuffle</button>
          <button className="button" onClick={reset}>Reset</button>
        </div>
        <div className="cards">
          {top5Cards.map((card, index) => <Card card={card} key={`topCard_${index}`}/>)}
        </div>
        {rank && <div className="rank">{rank}</div>}
      </div>
    </div>
  );
}

export default App;
