import DeckToStudy from "./DeckToStudy";
import Form from "./Forms";
import Deck from "./Deck";
import Header from "./Header";
import NotFound from "./NotFound";
import ShowCards from "./ShowCards";
import {Switch, Route} from "react-router-dom";
import React from "react";

//Use this in order to create all of the routers
//that we will use for this application 
function App() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <ShowCards />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckToStudy />
          </Route>
          <Route path="/decks/new">
            <Form newItem={true} isDeck={true} />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <Form newItem={false} isDeck={true} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <Form newItem={true} isDeck={false} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <Form newItem={false} isDeck={false} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
