///////////////////////////////////////////////////////////
// File        : Select.js
// Description : 
import React from 'react';
import { FormControl, FormGroup, Panel } from 'react-bootstrap';

import BaseClass from './BaseClass';

export default class Select extends BaseClass {

    // Constructor
    constructor(props) {
        //Debug
        if (typeof _hbp_debug_ !== "undefined") console.log('Select.constructor: ' + JSON.stringify(props));
        super(props);

        this.state = {selection: props.selection || ""};
    }

    // Operations
    render() {
        return (
            <div className="HBPSelect">
                <Panel header={this.title} bsStyle="info" title={this.props.description} className="Panel">
                    <FormGroup controlId="formControlsSelect" className="FormGroup">
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            onChange={this.onChange.bind(this)}
                            value={this.state.selection}>
                            {this.state.selection == "" ? <option value="" selected>select...</option> : <option value="">select...</option>}
                            {this.renderOptions(this.props.options.items)}
                        </FormControl>
                    </FormGroup>
                </Panel>
            </div>
        );
    }

    renderOptions(items) {
        return items.map((item, index) => {
            return (<option key={index} value={item.value} selected={item.value === this.state.selection}>{item.name}</option>);
        });
    }

    onChange(event) {
        this.setState({selection: event.target.value});
        if (this.state.selection && this.props.onSelect) {
            const option = this.props.options.findByValue(this.state.selection);
            if (option){
                this.props.onSelect(this.props.path, option);
            }
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {  
        this.setState({selection: ""});
        if(this.props.onSelect){
            this.props.onSelect(this.props.path, this.state.selection);
        }
    }

}