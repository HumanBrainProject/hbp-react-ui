///////////////////////////////////////////////////////////
// File        : DynamicList.js
// Description : 
/**
 * DynamicList allows selected text to be added to a list as individual buttons. These buttons can be added manually and also deleted.
 * @class DynamicList
 * @property {function} onChange The event-handler for a change in value
 * @property {string} path The path to specify when reporting the value
 * @property {array} items A NameValueArray of the initial values
 * @property {function} onAddItem The callback to handle adding a new item
 * @property {object} style Styling overrides
 * @property {string} description The tooltip to display
 */

// Imports : 

import React from 'react';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { bootstrapUtils } from 'react-bootstrap/lib/utils'
bootstrapUtils.addStyle(Button, 'custom');

import { Draggable, Droppable } from 'react-drag-and-drop'

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import DynamicListStyles from './DynamicListStyles';
import BaseClass from './BaseClass';
import { NameValue, NameValueArray } from './NameValue';

// Class Definition
@observer
export default
class DynamicList extends BaseClass {
// Attributes
    @observable items;
    @observable item;
    @observable showEnterMetadataModal = false;
    @observable showAlert = false;

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.constructor');
        super(props);
        this.items = props.items || new NameValueArray();
        this.item = props.item || this.empty;
        this.style = props.style || DynamicListStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        return super.render();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.componentWillReceiveProps');
        super.componentWillReceiveProps(nextProps);
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
        return (
            <div style={this.style}>
                <style type='text/css'>{'.DynamicListPanel {}'}</style>
                <style type='text/css'>{'.DynamicListPanel .panel-heading {padding: 3px 0;}'}</style>
                <style type='text/css'>{'.DynamicListPanel .panel-body {}'}</style>
                <Panel className='DynamicListPanel' header={this.props.header || this.renderHeader()} bsStyle='info'>
                    <div>
                        <Droppable
                            enabled={true}
                            className={'flex-row-wrap row-single-body y_scroll'}
                            types={['data']}
                            onDrop={this.onDrop.bind(this)}>
                            {this.renderBody()}
                        </Droppable>
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

    renderHeader() {
        const header = (
            <div className='text-center'>
                <style type='text/css'>{'.btn-custom {padding: 2px 12px; background-color: #428bca; color: white;}'}</style>
                <Button bsStyle='custom' onClick={this.addToList.bind(this)} title={this.props.description}>
                    {this.title}
                </Button>
            </div>
        );
        return header;
    }

    renderBody() {
        return this.items.map((item, index) => {
            return (
                <div key={item.$value} className={'flex-item'}>
                    <Button onClick={this.removeFromList.bind(this, index)}>
                        {item.$name || item.$value}
                        <Glyphicon glyph='remove' style={{ marginLeft: '8px' }} />
                    </Button>
                </div>
            );
        });
    }

    onChange(event) {
        console.log(event.target.value);
        this.item.$value = event.target.value;
    }

    addToList() {
        this.props.onAddItem(
            (name) => {
                if (name.length) {
                    if (!(name.length > 256)) {
                        this.items.push(new NameValue(undefined, name));
                        this.props.onChange(this.props.path, this.items.toJS());
                    } else {
                        this.showAlert = true;
                    }
                } else {
                    return this.open();
                }
            }
        );
    }

    removeFromList(index) {
        this.items.splice(index, 1);
        this.props.onChange(this.props.path, this.items.toJS());
    }

    open() {
        this.showEnterMetadataModal = true;
    }

    close(OK) {
        this.showEnterMetadataModal = false;
        if (OK) {
            if (this.item.$value.length) {
                if (!(this.item.$value.length > 256)) {
                    this.items.push(new NameValue(undefined, this.item.$value));
                    this.props.onChange(this.props.path, this.items.toJS());
                    this.item = this.empty;
                } else {
                    this.showAlert = true;
                }
            }
        }
    }

    hideAlert() {
        this.showAlert = false;
    }

    allowDrop(event) {
    }

    onDrop(event) {
        console.log(event.data);
        const name = event.data;
        this.addItem(name);
    }

    addItem(name) {
        this.items.push(new NameValue(undefined, name));
        this.props.onChange(this.props.path, this.items.toJS());
    }


}

// Exports

