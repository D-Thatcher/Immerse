import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

export default class NoMatch extends Component {

    constructor(props) {
        super(props);
        this.state = {user: {}};
    }

    render() {
        return (
            <Redirect to={{
                pathname: '/',
                state: {user_name:this.state.user_name}
            }}
            />
        )
    }
}