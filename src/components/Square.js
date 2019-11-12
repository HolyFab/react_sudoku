import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tips from './Tips';
import classNames from 'classnames';

export class Square extends Component {

    render() {
        const cell = this.props.cell;
        const numberCase = classNames({
            'numberCase': true,
            'checker': (Math.floor(cell.x / 3) % 2) ^ (Math.floor(cell.y / 3) % 2),
            'focused': cell.focused,
            'selected': cell.selected
        });
        const numberMain = classNames({
            'numberMain': true,
            'locked': cell.locked
        });
        return (
            <td onClick={this.props.select.bind(this, cell.index)}>
                <div className={numberCase}>
                    {<Tips tips={cell.tips}></Tips>}
                    <div className={numberMain}>{cell.number || ''}</div>
                </div>
            </td>
        )
    }
}

// PropTypes
Square.propTypes = {
    cell: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,

}

export default Square
