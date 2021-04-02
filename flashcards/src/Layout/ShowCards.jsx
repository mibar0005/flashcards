import React from "react";
import {Link} from "react-router-dom";
import DeckItems from "./DeckItems";

function ShowCards(props) {
  return (
    <div>
      <div>
        <Link to="/decks/new" className="btn btn-secondary m-3">Create New Deck</Link>
      </div>
      <div className="container">
        <DeckItems />
      </div>
    </div>
  );
}

export default ShowCards;