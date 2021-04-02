import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router";
import BreadCrumbs from "./BreadCrumbs";
import {readDeck, readCard, updateCard, updateDeck, createCard, createDeck,} from "../utils/api";

// component handles form input
function Forms(props) {
  const history = useHistory();
  const {deckId, cardId} = useParams();
  const {newItem, isDeck} = props;
  const [deck, setDeck] = useState({ cards: [] });
  const [cards, setCards] = useState({});

  const [formInput, setFormInput] = useState({
    firstInput: "",
    secondInput: "",
  });

  //Set the form names to empty strings
  const [formNames, setFormNames] = useState({
    firstLabel: "",
    secondLabel: "",
    newOrEditTitle: "",
    cardOrDeckTitle: "",
  });

  //Use abortController in order to abort the DOM request
  //Use a empty bracket [] in order for this to run once and 
  //avoid infinite loops. 
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
    if (cardId) {
      try {
        readCard(cardId, abortController.signal).then((element) => {
          setCards(element);
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", cards)
        } else {
          throw error;
        }
      }
    } 
    // return () => abortController.abort();
  }, []);

  useEffect(() => {
    isDeck
      ? newItem
        ? setFormNames({
            newOrEditTitle: "Create",
            firstLabel: "Name",
            secondLabel: "Description",
            cardOrDeckTitle: "Deck",
          })
        : setFormNames({
            newOrEditTitle: "Edit",
            firstLabel: "Name",
            secondLabel: "Description",
            cardOrDeckTitle: "Deck",
          })
      : newItem
      ? setFormNames({
          newOrEditTitle: "New",
          firstLabel: "Front",
          secondLabel: "Back",
          cardOrDeckTitle: "Card",
        })
      : setFormNames({
          newOrEditTitle: "Edit",
          firstLabel: "Front",
          secondLabel: "Back",
          cardOrDeckTitle: "Card",
        });
  }, [isDeck, !newItem]);

  useEffect(() => {
    if (isDeck && !newItem)
      setFormInput({
        firstInput: deck.name,
        secondInput: deck.description,
      });
    if (!isDeck && !newItem)            
      setFormInput({ firstInput: cards.front, secondInput: cards.back });
  }, [deck, cards]);

  function submitHandler(event) {
    event.preventDefault();
    if (newItem && isDeck) {
      createDeck({
        name: formInput.firstInput,
        description: formInput.secondInput,
      });
      history.push(`/`);
    } else if (!newItem && isDeck) {
      updateDeck({
        name: formInput.firstInput,
        description: formInput.secondInput,
        id: deckId,
      });
      history.push(`/decks/${deckId}`);
    } else if (newItem && !isDeck) {
      createCard(deckId, {
        front: formInput.firstInput,
        back: formInput.secondInput,
      });
      history.go(0);
    } else {
      updateCard({
        ...cards,
        front: formInput.firstInput,
        back: formInput.secondInput,
      });
      history.push(`/decks/${deckId}`);
    }
  }

  function textArea(item, formNames) {
    if (item) {
      return (
        <div className="form-group">
          <label for="deckName">{formNames.firstLabel}</label>
          <input
            placeholder="Deck Name"
            className="form-control"
            type="text"
            id="deckName"
            value={formInput.firstInput}
            onChange={(event) =>
              setFormInput({
                ...formInput,
                firstInput: event.target.value,
              })
            }
          ></input>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <label for="firstTextArea">{formNames.firstLabel}</label>
          <textarea
            className="form-control"
            id="firstTextArea"
            placeholder="Front side of card"
            value={formInput.firstInput}
            onChange={(event) =>
               setFormInput({
                ...formInput,
                firstInput: event.target.value,
              })
            }
          ></textarea>
        </div>
      );
    }
  }
  return (
    <section className="container">
      <BreadCrumbs newItem={newItem} isDeck={isDeck} deckId={deckId} cardId={cardId} deck={deck} />
      <h1>{`${formNames.newOrEditTitle} ${formNames.cardOrDeckTitle}`}</h1>
      <form>
        {textArea(isDeck, formNames)}
        <div className="form-group">
          <label for="secondTextArea">{formNames.secondLabel}</label>
          <textarea
            className="form-control"
            id="secondTextArea"
            placeholder={isDeck ? "Description of deck" : "Back side of card"}
            value={formInput.secondInput}
            onChange={(event) =>
              setFormInput({
                ...formInput,
                secondInput: event.target.value, })}>
              </textarea>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={() =>
              isDeck ? history.push("/") : history.push(`/decks/${deckId}`)}>
            {newItem ? "Done" : "Cancel"}
          </button>
          <button className="btn btn-primary mx-2" onClick={(event) => submitHandler(event)}>
            {newItem ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}

//Export the Form function
export default Forms;