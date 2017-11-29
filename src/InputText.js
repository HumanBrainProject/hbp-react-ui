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
import { NameValue, NameValueArray } from './NameValue';

// Class Definition
@observer
export default
class InputText extends BaseClass {
// Attributes
    @observable item;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.constructor');
        super(props);
        this.item = props.item || this.empty;
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
                        value={this.item.$name}
                        />
                </Panel>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.componentWillReceiveProps');
        super.componentWillReceiveProps(nextProps);
        if (nextProps.item != this.props.item) { // Re-initialised
            this.item = nextProps.item;
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
        this.item = new NameValue(event.target.value);
        this.props.onChange(this.props.path, this.item);
    }


}

// Exports

