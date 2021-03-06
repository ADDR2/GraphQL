import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };
    }

    onSubmit(event) {
        event.preventDefault();

        const { mutate } = this.props;
        const { title } = this.state;

        mutate({
            variables: { title },
            refetchQueries: [{ query }]
        }).then(
            response => {
                hashHistory.push('/');
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    }

    render () {
        const { title } = this.state;

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input
                        value={title}
                        onChange={event => {
                            this.setState({ title: event.target.value });
                        }}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title){
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);