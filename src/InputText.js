///////////////////////////////////////////////////////////
// File        : InputText.js
// Description : 

// Imports : 

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer, action } from 'mobx-react';

import InputTextStyles from './InputTextStyles';
import BaseClass from './BaseClass';

// Class Definition
@observer
export default
class InputText extends BaseClass {
// Attributes
    @observable value;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.constructor: ' + JSON.stringify(props));
        super(props);
        this.value = props.value || '';
        this.description = props.description || '';
        this.style = props.style || InputTextStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        return (
            <div style={this.style}>
                <Panel header={this.title} bsStyle='info' className='text-center' title={this.description}>
                    <FormControl
                        type='text'
                        placeholder='type...'
                        onChange={this.onChange.bind(this)}
                        value={this.value}
                        />
                </Panel>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.componentWillReceiveProps: ' + JSON.stringify(nextProps));
        if (nextProps.value != this.props.value) { // Re-initialised
            this.value = nextProps.value;
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

    onChange(event) {
        this.value = event.target.value;
        this.props.onUpdateValue(this.props.path, this.value);
    }


}

// Exports

