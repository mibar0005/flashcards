import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";

// Creates the study deck component
function DeckToStudy(props) {
  const { deckId } = useParams();
  const [flipover, setFlipover] = useState(true);
  const [deckIndex, setDeckIndex] = useState(0);
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    const abortController = new AbortController();
    try {
      readDeck(deckId, abortController.signal).then((element) => {
        setDeck(element);
      });
    } catch (error) {
      if (error.name === "AbortError") {
      } else {
        throw error;
      }
    }
  }, [deckId]);

  return (
    <section className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{" "}Study</li>
        </ol>
      </nav>
      <h1>{`${deck.name}: Study`}</h1>
      {deck.cards.length < 3 ? (
        <div>
          <h2>Not enough cards.</h2>
          <p>{`You need at least 3 cards. You have ${deck.cards.length} cards in this deck.`}</p>
          <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>+ Cards</Link>
        </div>
      ) : flipover ? (
        <div className="card" key={deckIndex}>
          <div className="card-body">
            <h5 className="card-title">
              Card {`${deckIndex + 1} of ${deck.cards.length}`}
            </h5>
            <p className="card-text">{deck.cards[deckIndex].front}</p>
            <button className="btn btn-secondary" onClick={() => setFlipover(!flipover)}>Flipover</button>
          </div>
        </div>
      ) : (
        <div className="card" key={deckIndex}>
          <div className="card-body">
            <h5 className="card-title">Card {`${deckIndex + 1} of ${deck.cards.length}`}</h5>
            <p className="card-text">{deck.cards[deckIndex].back}</p>
            <button className="btn btn-secondary" onClick={() => setFlipover(!flipover)}>Flipover</button>
            <button className="btn btn-primary" onClick={() => {
                if (deckIndex + 1 === deck.cards.length) {
                   (window.confirm("Restart cards?")) ? setDeckIndex(0) : setDeckIndex(deckIndex + 1); setFlipover(true);
                }}}>Next</button>
          </div>
        </div>
      )}
    </section>
  );
}


export default DeckToStudy;