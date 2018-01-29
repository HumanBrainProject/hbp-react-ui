///////////////////////////////////////////////////////////
// File        : MultiSelect.js
// Description : 
import React from 'react';
import { FormControl, FormGroup, Panel } from 'react-bootstrap';

import BaseClass from './BaseClass';

export default class MultiSelect extends BaseClass {

    // Constructor
    constructor(props) {
        //Debug
        if (typeof _hbp_debug_ !== "undefined") console.log('MultiSelect.constructor: ' + JSON.stringify(props));
        super(props);

        this.state = {selection: props.selection || []};
    }

    // Operations
    render() {
        return (
            <div className="HBPMultiSelect">
                <Panel header={this.title} bsStyle="info" title={this.props.description} className="Panel">
                    <FormGroup controlId="formControlsSelect" className="FormGroup">
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            multiple
                            onChange={this.onChange.bind(this)}
                            value={this.state.selection}>
                            {this.state.selection.length === 0 ? <option value="" selected>select...</option> : <option value="">select...</option>}
                            {this.renderOptions(this.props.options.items)}
                        </FormControl>
                    </FormGroup>
                </Panel>
            </div>
        );
    }

    renderOptions(items) {
        return items.map((item, index) => {
            return (<option key={index} value={item.value} selected={this.state.selection.indexOf(item.value) !== -1}>{item.name}</option>);
        });
    }

    onChange(event) {
        var self = this;
        this.setState({selection: event.target.value});
        if (this.state.selection.length > 0 && this.props.onSelect) {
            const options = [];
            this.state.selection.forEach(selection => {
                const option = self.props.options.findByValue(selection);
                if(option){
                    options.push(option);
                }
            });
            if (options.length > 0){
                this.props.onSelect(this.props.path, options);
            }
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {  
        this.setState({selection: []});
        if(this.props.onSelect){
            this.props.onSelect(this.props.path, this.state.selection);
        }
    }

}