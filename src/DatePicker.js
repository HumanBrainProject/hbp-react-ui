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
import { NameValue, NameValueArray } from './NameValue';

// Class Definition
@observer
export default
class DatePicker extends BaseClass {
// Attributes
    @observable item;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.constructor');
        super(props);
        this.item = props.item || this.empty;
        this.style = props.style || DatePickerStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        return (
            <div style={this.style}>
                <style type='text/css'>{'.DatePickerPanel, .panel {}'}</style>
                <style type='text/css'>{'.DatePickerPanel .panel-heading {}'}</style>
                <style type='text/css'>{'.DatePickerPanel .panel-body {}'}</style>
                <Panel className='text-center DatePickerPanel' header={this.title} bsStyle='info' title={this.props.description}>
                    <div className={'row-single-body'}>
                        <input type='date' style={{width: '140px'}} onChange={this.onChange.bind(this)} value={this.item.$value}/>
                    </div>
                </Panel>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.componentWillReceiveProps');
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
        this.item = new NameValue(undefined, event.target.value);
        this.props.onChange(this.props.path, this.item);
    }


}

// Exports

