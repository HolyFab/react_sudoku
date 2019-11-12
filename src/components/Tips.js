import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Tips extends Component {

    render() {
        const tips = this.props.tips;
        //const tipsClasses = classNames({});
        return (
            <div className="numberTips">{tips.join(' ')}</div>
        )
    }
}

// PropTypes
Tips.propTypes = {
    tips: PropTypes.array.isRequired,
}

export default Tips
