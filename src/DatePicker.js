///////////////////////////////////////////////////////////
// File        : DatePicker.js
// Description : 

// Imports : 

import React from 'react';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import DatePickerStyles from './DatePickerStyles';
import BaseClass from './BaseClass';

// Class Definition
@observer
export default
class DatePicker extends BaseClass {
// Attributes
    @observable value;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.constructor: ' + JSON.stringify(props));
        super(props);
        this.value = props.value || '';
        this.description = props.description || '';
        this.style = props.style || DatePickerStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        return (
            <div style={this.style}>
                <style type='text/css'>{'.DatePickerPanel .panel-body {min-height: 46px; height: 46px;}'}</style>
                <Panel className='text-center DatePickerPanel' header={this.title} bsStyle='info' title={this.props.description} style={{ paddingBottom: '8px' }}>
                    <input type='date' onChange={this.onChange.bind(this)} value={this.value}/>
                </Panel>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.componentWillReceiveProps: ' + JSON.stringify(nextProps));
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

