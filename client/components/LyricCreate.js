import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();
        const { mutate, songId } = this.props;
        const { content } = this.state;

        mutate({
            variables: { songId, content }
        }).then(() => this.setState({ content: '' }));
    }

    render() {
        const { content } = this.state;

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add Lyric</label>
                <input
                    value={content}
                    onChange={event => this.setState({ content: event.target.value })}
                />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID){
        addLyricToSong(content: $content, songId: $songId){
            id
            lyrics{
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);