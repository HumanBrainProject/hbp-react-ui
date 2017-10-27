///////////////////////////////////////////////////////////
// File        : MultiSelect.js
// Description : 

// Imports : 

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import MultiSelectStyles from './MultiSelectStyles';
import BaseClass from './BaseClass';

// Class Definition
@observer
export default
class MultiSelect extends BaseClass {
// Attributes
    @observable options;
    @observable items;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('MultiSelect.constructor: ' + JSON.stringify(props));
        super(props);
        this.options = props.options;
    }


// Operations
    componentWillMount() {
    }

    render() {
        console.log('MultiSelect.render');
        return super.render()
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('MultiSelect.componentWillReceiveProps: ' + JSON.stringify(nextProps));
    }

    shouldComponentUpdate(nextProps,nextState) {
        console.log('MultiSelect.shouldComponentUpdate');
        return super.shouldComponentUpdate(nextProps,nextState);
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
        console.log('MultiSelect.renderContainer');
        return super.renderContainer()
    }

    renderHeader() {
        console.log('MultiSelect.renderHeader');
        return (
            <div>Combo</div>
        );
    }

    renderBody() {
        console.log('MultiSelect.renderBody');
        return (
            <FormGroup controlId='formControlsSelect' style={{ marginBottom: '0' }}>
                <FormControl
                    componentClass='select'
                    placeholder='select'
                >
                    <option value='' selected>select...</option> : <option value=''>select...</option>
                    {this.renderOptions(this.options.items)}
                </FormControl>
            </FormGroup>
        );
    }

    renderOptions(items) {
        return items.map((item, index) => {
            return (
                <option key={index} value={item.value}>{item.name}</option>
            );
        });
    }


}

// Exports

