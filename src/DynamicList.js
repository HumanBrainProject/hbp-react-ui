///////////////////////////////////////////////////////////
// File        : DynamicList.js
// Description : 

// Imports : 

import React from 'react';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { bootstrapUtils } from 'react-bootstrap/lib/utils'
bootstrapUtils.addStyle(Button, 'custom');

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import DynamicListStyles from './DynamicListStyles';
import BaseClass from './BaseClass';
import NameValue from './NameValue';
import NameValueArray from './NameValueArray';

// Class Definition
@observer
export default
class DynamicList extends BaseClass {
// Attributes
    @observable items;
    @observable value;
    @observable showEnterMetadataModal = false;
    @observable showAlert = false;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.constructor: ' + JSON.stringify(props));
        super(props);
        this.items = props.items || [];
        this.value = props.value || '';
        this.style = props.style || DynamicListStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        const title = this.props.path.substr(this.props.path.search(/[\w-]+$/)); // The last word in the path
        const header = (
            <div className='text-center'>
                <style type='text/css'>{'.btn-custom {padding: 2px 12px; background-color: #428bca; color: white;}'}</style>
                <Button bsStyle='custom' onClick={this.addToList.bind(this)} title={this.props.description}>{title}</Button>
            </div>
        );
        // const customButtonStyle={'paddingTop': '4px', 'paddingBottom': '4px'};
        const items = this.items.map((item, index) => {
            return (
                <div key={index} className='text-left'>
                    <Button onClick={this.removeFromList.bind(this, index)}>
                        {( typeof(item) == 'string' ? item : ( typeof(item) == 'object' ? item.name : '' ) )}
                        <Glyphicon glyph='remove' style={{ marginLeft: '8px' }} />
                    </Button>
                </div>
            );
        });
        return (
            <div style={this.style}>
                <style type='text/css'>{'.DynamicListPanel .panel-heading {padding: 3px 0;}'}</style>
                <style type='text/css'>{'.DynamicListPanel .panel-body {min-height: 54px; height: 54px; overflow-y: auto;}'}</style>
                <Panel className='DynamicListPanel' header={this.props.header || header} bsStyle='info'>
                    <div style={{ minheight: '10px' }}>
                        {items}
                    </div>
                </Panel>
                <Modal show={this.showEnterMetadataModal} onHide={this.close.bind(this, false)}>
                    <Modal.Header>
                        <Modal.Title>Enter Metadata</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-center'>
                        <FormControl
                            type='text'
                            placeholder='type...'
                            onChange={this.onChange.bind(this)}
                            autoFocus={true}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this, true)}>OK</Button>
                        <Button onClick={this.close.bind(this, false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.showAlert}>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-center'>
                            Invalid input
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideAlert.bind(this)}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.componentWillReceiveProps: ' + JSON.stringify(nextProps));
        if (nextProps.items != this.props.items) { // Re-initialised
            this.items = nextProps.items;
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
    }

    addToList() {
        this.props.onAddItem(
            (value) => {
                if (value.length) {
                    if (!(value.length > 256)) {
                        this.items.push(value);
                        this.props.onUpdateList(this.props.path, this.items.toJS());
                    } else {
                        this.showAlert = true;
                    }
                } else {
                    return this.open();
                }
            }
        );
    }

    removeFromList(valueIndex) {
        this.items.splice(valueIndex, 1);
        this.props.onUpdateList(this.props.path, this.items.toJS());
    }

    open() {
        this.showEnterMetadataModal = true;
    }

    close(OK) {
        this.showEnterMetadataModal = false;
        if (OK) {
            if (this.value.length) {
                if (!(this.value.length > 256)) {
                    this.items.push(this.value);
                    this.props.onUpdateList(this.props.path, this.items.toJS());
                } else {
                    this.showAlert = true;
                }
            }
        }
    }

    hideAlert() {
        this.showAlert = false;
    }


}

// Exports

