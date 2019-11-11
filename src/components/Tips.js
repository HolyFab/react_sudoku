import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Tips extends Component {

    render() {
        const tips = this.props.tips;
        //const tipsClasses = classNames({});
        console.log(tips);
        return (
            <div className="tips">{tips.join(' ')}</div>
        )
    }
}

// PropTypes
Tips.propTypes = {
    tips: PropTypes.array.isRequired,
}

export default Tips
