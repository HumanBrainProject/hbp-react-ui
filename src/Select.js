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
    @observable selection;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Select.constructor');
        super(props);
        this.options = props.options || new NameValueArray();
        this.selection = props.selection || this.empty;
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
                            defaultValue={this.selection.$value}
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
        // debugger;
        return items.map((item, index) => {
            return (
                <option key={index} value={item.$value}>{item.$name}</option>
            );
        });
    }

    onChange(event) {
        // this.selection.$value = event.target.value;
        // if (this.selection.$value != '') {
        //     debugger;
        //     const options = new NameValueArray(this.options.slice());
        //     const option = options.findByValue(this.selection.$value);
        //     if (option)
        //         this.props.onSelect(this.props.path, option);
        // } else {
        //     this.clearSelection();
        // }
        const value = event.target.value;
        if (value != '') {
            const options = new NameValueArray(this.options.slice());
            const option = options.findByValue(value);
            if (option)
                this.props.onSelect(this.props.path, option);
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {
        this.selection = this.empty;
        this.props.onSelect(this.props.path, this.selection);
    }


}

// Exports

