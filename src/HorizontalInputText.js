///////////////////////////////////////////////////////////
// File        : HorizontalInputText.js
// Description : 
/**
 * HorizontalInputText is derived from InputText and displays a title to the left of the input.
 * @class HorizontalInputText
 * @property {function} onChange The event-handler for a change in value
 * @property {string} path The path to specify when reporting the value
 * @property {string} title The title
 * @property {object} item A NameValue object specifying the initial value
 * @property {object} style Styling overrides
 * @property {string} description The tooltip to display
 */

// Imports : 

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer, action } from 'mobx-react';

import InputTextStyles from './InputTextStyles';
import InputText from './InputText';

// Class Definition
@observer
export default
class HorizontalInputText extends InputText {
// Attributes

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('HorizontalInputText.constructor');
        super(props);
        this.title = props.title || this.title;
    }


// Operations
    render() {
        return (
            <div style={this.style}>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>{this.title}</InputGroup.Addon>
                        <FormControl
                            type='text'
                            placeholder='type...'
                            title={this.description}
                            onChange={this.onChange.bind(this)}
                            value={this.item.$value}
                            />
                    </InputGroup>
                </FormGroup>
            </div>
        );
    }


}

// Exports

