///////////////////////////////////////////////////////////
// File        : DatePicker.js
// Description : 
import React from 'react';
import { Panel } from 'react-bootstrap';

import BaseClass from './BaseClass';

// Class Definition
export default class DatePicker extends BaseClass {
    // Constructor
    constructor(props) {
        //Debug
        if (typeof _hbp_debug_ !== "undefined") console.log('DatePicker.constructor: ' + JSON.stringify(props));
        super(props);

        this.state = {value: props.value || ""};
    }

    // Operations
    render() {
        return (
            <div class="HBPDatePicker">
                <Panel className="Panel" header={this.title} bsStyle="info" title={this.props.description}>
                    <input type="date" onChange={this.onChange.bind(this)} value={this.state.value}/>
                </Panel>
            </div>
        );
    }

    onChange(event) {
        this.setState({value: event.target.value});
        this.props.onUpdateValue(this.props.path, this.state.value);
    }

}