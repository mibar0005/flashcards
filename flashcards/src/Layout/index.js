import DeckToStudy from "./DeckToStudy";
import Forms from "./Forms";
import Decks from "./Decks";
import Header from "./Header";
import NotFound from "./NotFound";
import ShowCards from "./ShowCards";
import {Switch, Route} from "react-router-dom";
import React, {Fragment} from "react";

//Use this in order to create all of the routers
//that we will use for this application 
function Layout() {
  return (
    <Fragment>
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
            <Forms newItem={true} isDeck={true} />
          </Route>
          <Route exact path="/decks/:deckId">
            <Decks />
          </Route>
          <Route path="/decks/:deckId/edit">
            <Forms newItem={false} isDeck={true} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <Forms newItem={true} isDeck={false} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <Forms newItem={false} isDeck={false} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
