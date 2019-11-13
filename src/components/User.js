import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class User extends Component {

    render() {
        const {user} = this.props;
        //const tipsClasses = classNames({});
        return <li>{user}</li>
    }
}

// PropTypes
User.propTypes = {
    user: PropTypes.string.isRequired,
}

export default User
