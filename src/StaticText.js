///////////////////////////////////////////////////////////
// File        : StaticText.js
// Description : 
import React from 'react';
import { FormControl, Panel } from 'react-bootstrap';

import BaseClass from './BaseClass';

export default class StaticText extends BaseClass {

    // Constructor
    constructor(props) {
        //Debug
        if (typeof _hbp_debug_ !== "undefined") console.log('StaticText.constructor: ' + JSON.stringify(props));
        super(props);
    }

    // Operations
    render() {
        return (
            <div className="HBPStaticText">
                <Panel header={this.title} bsStyle="info" title={this.props.description} className="Panel">
                    <FormControl.Static>
                        {this.props.value}
                    </FormControl.Static>
                </Panel>
            </div>
        );
    }

}