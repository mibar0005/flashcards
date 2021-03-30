import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {readDeck, deleteDeck, deleteCard} from "../utils/api";


function Decks() {
    const [deck, setDeck] = useState({ cards: [] });
    const { deckId } = useParams();
    let [dependsOn, setDependsOn] = useState(deck);
  
    useEffect(() => {
      const abortController = new AbortController();
      if (deckId) {
        try {
          readDeck(deckId, abortController.signal).then((element) => {
            setDeck(element);
          });
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted", deck);
          } else {
            throw error;
          }
        }
      }
      if (!(dependsOn === deck)) setDependsOn(deck);
    }, [dependsOn, deck, deckId]);
  
    return (
      <section className="container">
        <nav aria-label="breadcrumbs">
          <ol className="breadcrumbs">
            <li className="breadcrumbs-item">
              <Link to="/">Home</Link> </li>
            <li className="breadcrumsb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <div>
              <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">Study</Link>
              <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">+ Cards</Link>
              <Link to="/" className="btn btn-danger"onClick={() => 
                window.confirm("Confirm Delete?") ? deleteDeck(deck.id) : null}>Delete</Link>
            </div>
          </div>
        </div>
        <h1>Cards</h1>
        <ul class="list-group"> {deck.cards.map((card, index) => {
            return (
              <li key={index} class="list-group-item">
                <div className="row">
                  <div className="col-6 d-flex-wrap">{card.front}</div>
                  <div className="col-6 d-flex-wrap">{card.back}</div>
                </div>
                <button className="btn btn-danger float-right" onClick={() =>
                    window.confirm("Are you sure you want to Delete this card? You will not be able to recover it.")
                      ? deleteCard(card.id) : null}>Delete</button>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary float-right mx-2">Edit</Link></li>
            );
          })}
        </ul>
      </section>
    );
  }

  export default Decks;