///////////////////////////////////////////////////////////
// File        : StaticText.js
// Description : 

// Imports : 

import React from 'react';
import { FormControl } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer, action } from 'mobx-react';

import StaticTextStyles from './StaticTextStyles';
import BaseClass from './BaseClass';

// Class Definition
@observer
export default
class StaticText extends BaseClass {
// Attributes
    @observable value;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('StaticText.constructor');
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
                    <FormControl.Static>
                        {this.value}
                    </FormControl.Static>
                </Panel>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('StaticText.componentWillReceiveProps');
        super.componentWillReceiveProps(nextProps);
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


}

// Exports

