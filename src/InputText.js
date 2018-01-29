///////////////////////////////////////////////////////////
// File        : InputText.js
// Description : 
import React from 'react';
import { FormControl, Panel } from 'react-bootstrap';

import BaseClass from './BaseClass';

export default class InputText extends BaseClass {

    // Constructor
    constructor(props) {
        //Debug
        if (typeof _hbp_debug_ !== "undefined") console.log('InputText.constructor: ' + JSON.stringify(props));
        super(props);

        this.state = {value: props.value || ""};
    }

    // Operations
    render() {
        return (
            <div className="HBPInputText">
                <Panel header={this.title} bsStyle="info" title={this.props.description} className="Panel">
                    <FormControl
                        type="text"
                        placeholder="type..."
                        onChange={this.onChange.bind(this)}
                        value={this.state.value} />
                </Panel>
            </div>
        );
    }

    onChange(event) {
        this.setState({value: event.target.value});
        this.props.onUpdateValue(this.props.path, this.state.value);
    }

}