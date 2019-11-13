import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class JoinRoom extends Component {
    state = {
        room: 'Tabarnak'
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.joinRoom(this.state.room);
        this.setState({ title: '' });
      }
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        //const tipsClasses = classNames({});
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <h1 style={{flex: '1'}}>Join / Create room</h1>
                <input 
                    type="text" 
                    name="room" 
                    style={{ flex: '2', padding: '5px' }}
                    placeholder="Room Name..." 
                    value={this.state.room}
                    onChange={this.onChange}
                />
                <input 
                    type="submit" 
                    value="Submit" 
                    className="btn"
                    style={{flex: '1'}}
                />
            </form>
        )
    }
}

// PropTypes
JoinRoom.propTypes = {
    joinRoom: PropTypes.func.isRequired,
}

export default JoinRoom
