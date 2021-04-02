//Import items from React 
//Import Link from react-router-dom
import React from "react";
import {Link} from "react-router-dom";

//Declare a function for BreadCrumbs
function BreadCrumbs(props) {
  //Deconstruct the props 
    const { newItem, isDeck, deckId, cardId, deck } = props;
    //Create a new function that returns an ordered list with the ops to go home 
    //or to create create a new deck 
    function newDeckCrumbs() {
      return (
        <nav aria-label="breadcrumbs">
          <ol className="breadcrumbs">
            <li className="breadcrumbs-item"><Link to="/">Home</Link></li>
            <li className="breadcrumbs-item active" aria-current="page">Create Deck</li>
          </ol>
        </nav>
      );
    }
  
    //create a function to edit the deck
    function editDeckCrumbs() {
      return (
        <nav aria-label="breadcrumbs">
          <ol className="breadcrumbs"> <li className="breadcrumbs-item"><Link to="/">Home</Link></li>
            <li className="breadcrumbs-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumbs-item active" aria-current="page">Edit Deck</li>
          </ol>
        </nav>
      );
    }
  
    //Create a function to add cards 
    function addCardCrumbs() {
      return (
        //Create an ordered list that displays home, the name of the deck and the option 
        //to add a new card 
        <nav aria-label="breadcrumbs">
          <ol className="breadcrumbs">
            <li className="breadcrumbs-item"><Link to="/">Home</Link></li>
            <li className="breadcrumbs-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumbs-item active" aria-current="page">+ Card</li>
          </ol>
        </nav>
      );
    }
    
    //create a function to edit the cards. 
    function editCardCrumbs() {
      return (
        //create an ordered list in order that shows home, the deck name, and the edit option 
        <nav aria-label="breadcrumbs">
          <ol className="breadcrumbs">
            <li className="breadcrumbs-item"><Link to="/">Home</Link></li>
            <li className="breadcrumbs-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
            <li className="breadcrumbs-item active" aria-current="page">{`Edit Card ${cardId}`}</li>
          </ol>
        </nav>
      );
    }
  
    return isDeck
      ? newItem
        ? newDeckCrumbs()
        : editDeckCrumbs()
      : newItem
        ? addCardCrumbs()
        : editCardCrumbs();
  }
  
  //Export the function BreadCrumbs 
export default BreadCrumbs;

