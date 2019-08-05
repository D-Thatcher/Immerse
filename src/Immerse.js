import React, { Component }  from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import HomePage from './HomePage';
import DepositForm from './checkout';
import NoMatch from './NoMatch.component';


class Immerse extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/checkout" component={DepositForm} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}
export default Immerse;