import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User';

export class RoomInfo extends Component {

    render() {
        const {room} = this.props;
        //const tipsClasses = classNames({});
        return (
            <div id="RoomInfo">
                <h1>{room.name}</h1>
                <ul>
                    {room.users.map(u => <User id={u} user={u}></User>)}
                </ul>
            </div>
        )
    
    }
}

// PropTypes
RoomInfo.propTypes = {
    room: PropTypes.array.isRequired,
}

export default RoomInfo
