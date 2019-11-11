import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tips from './Tips';
import classNames from 'classnames';

export class Square extends Component {

    render() {
        const cell = this.props.cell;
        const cellClasses = classNames({
            'number': true,
            'grayNumber': (Math.floor(cell.x / 3) % 2) ^ (Math.floor(cell.y / 3) % 2),
            'locked': cell.locked,
            'focused': cell.focused,
            'selected': cell.selected
        });
        return (
            <td className={cellClasses} onClick={this.props.select.bind(this, cell.index)}> <Tips tips={cell.tips}></Tips> {cell.number || ''}</td>
        )
    }
}

// PropTypes
Square.propTypes = {
    cell: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,

}

export default Square
