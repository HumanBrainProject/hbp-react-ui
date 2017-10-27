///////////////////////////////////////////////////////////
// File        : Select.js
// Description : 

// Imports : 

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import SelectStyles from './SelectStyles';
import BaseClass from './BaseClass';

// Class Definition
@observer
export default
class Select extends BaseClass {
// Attributes
    @observable options;
    @observable selection;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Select.constructor: ' + JSON.stringify(props));
        super(props);
        this.options = props.options || [];
        this.selection = props.selection || '';
        this.style = props.style || SelectStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        const options = this.renderOptions(this.options.items);
        return (
            <div style={this.style}>
                <Panel header={this.title} bsStyle='info' className='text-center' title={this.props.description}>
                    <FormGroup controlId='formControlsSelect' style={{ marginBottom: '0' }}>
                        <FormControl
                            componentClass='select'
                            placeholder='select'
                            onChange={this.onChange.bind(this)}
                            value={this.selection}
                        >
                            {this.selection == '' ? <option value='' selected>select...</option> : <option value=''>select...</option>}
                            {options}
                        </FormControl>
                    </FormGroup>
                </Panel>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Select.componentWillReceiveProps: ' + JSON.stringify(nextProps));
        if (nextProps.options != this.props.options) { // Re-initialised
            this.options = nextProps.options;
        }
        if (nextProps.selection != this.props.selection) { // Re-initialised
            this.selection = nextProps.selection;
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return super.shouldComponentUpdate();
    }

    componentWillUpdate(nextProps,nextState) {
    }

    componentDidUpdate(prevProps,prevState) {
    }

    componentWillUnmount() {
    }

    componentDidCatch(error,info) {
    }

    renderContainer() {
    }

    renderHeader() {
    }

    renderBody() {
    }

    renderOptions(items) {
        return items.map((item, index) => {
            if (item.value == this.selection) {
                return (
                    <option key={index} value={item.value} selected>{item.name}</option>
                );
            } else {
                return (
                    <option key={index} value={item.value}>{item.name}</option>
                );
            }
        });
    }

    onChange(event) {
        this.selection = event.target.value;
        if (this.selection != '') {
            const option = this.options.findByValue(this.selection);
            if (option)
                this.props.onSelect(this.props.path, option);
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {
        this.selection = '';
        this.props.onSelect(this.props.path, this.selection);
    }


}

// Exports

