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
import { NameValue, NameValueArray } from './NameValue';

// Class Definition
@observer
export default
class Select extends BaseClass {
// Attributes
    @observable options;
    @observable item;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Select.constructor');
        super(props);
        this.options = props.options || new NameValueArray();
        this.item = props.item || this.empty;
        this.style = props.style || SelectStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        const options = this.renderOptions(this.options);
        return (
            <div style={this.style}>
                <Panel header={this.title} bsStyle='info' className='text-center' title={this.props.description}>
                    <FormGroup controlId='formControlsSelect' style={{ marginBottom: '0' }}>
                        <FormControl
                            componentClass='select'
                            placeholder='select'
                            onChange={this.onChange.bind(this)}
                            defaultValue={this.item.$value}
                        >
                            <option value=''>select...</option>
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
        if (typeof(_hbp_debug_) != 'undefined') console.log('Select.componentWillReceiveProps');
        super.componentWillReceiveProps(nextProps);
        if (nextProps.options != this.props.options) { // Re-initialised
            this.options = nextProps.options;
        }
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

    renderOptions(items) {
        return items.map((item, index) => {
            return (
                <option key={index} value={item.$value}>{item.$name}</option>
            );
        });
    }

    onChange(event) {
        const value = event.target.value;
        if (value != '') {
            const options = new NameValueArray(this.options.slice());
            const item = options.findByValue(value);
            if (item)
                this.props.onChange(this.props.path, item);
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {
        this.item = this.empty;
        this.props.onChange(this.props.path, this.item);
    }


}

// Exports

