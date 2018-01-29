///////////////////////////////////////////////////////////
// File        : DynamicList.js
// Description : 
import React from 'react';
import { Button, FormControl, Glyphicon, Modal, Panel } from 'react-bootstrap';

import { bootstrapUtils } from 'react-bootstrap/lib/utils'
bootstrapUtils.addStyle(Button, 'custom');

import BaseClass from './BaseClass';
import NameValue from './NameValue';
import NameValueArray from './NameValueArray';

export default class DynamicList extends BaseClass {

    // Constructor
    constructor(props) {
        if (typeof _hbp_debug_ !== "undefined") console.log('DynamicList.constructor: ' + JSON.stringify(props));
        super(props);

        this.state = {
            items: props.items || [],
            inputValue: props.inputValue || "",
            showEnterMetadataModal: false,
            showAlert: false
        };
    }


    // Operations
    render() {
        const header = (
            <div className="header">
                <Button bsStyle="custom" onClick={this.addToList.bind(this)} title={this.props.description}>{this.title}</Button>
            </div>
        );

        const items = this.state.items.map((item, index) => {
            return (
                <div key={index} className="item">
                    <Button onClick={this.removeFromList.bind(this, index)} className="item-button">
                        {( typeof(item) == "string" ? item : ( typeof(item) == "object" ? item.name : "" ) )}
                        <Glyphicon glyph="remove" className="item-icon"/>
                    </Button>
                </div>
            );
        });

        return (
            <div className="HBPDynamicList">
                <Panel className="Panel" header={this.props.header || header} bsStyle="info">
                    <div className="items">
                        {items}
                    </div>
                </Panel>
                <Modal show={this.state.showEnterMetadataModal} onHide={this.close.bind(this, false)}>
                    <Modal.Header>
                        <Modal.Title>Enter Metadata</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ModalBody">
                        <FormControl
                            type="text"
                            placeholder="type..."
                            onChange={this.onChange.bind(this)}
                            autoFocus={true}
                            value={this.state.value}/>
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
                    <Modal.Body >
                        <div className="ModalBody">
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

    onChange(event) {
        this.setState({value: event.target.value});
    }

    addToList() {
        this.props.onAddItem(
            (value) => {
                if (value.length) {
                    if (!(value.length > 256)) {
                        const newItems = JSON.parse(JSON.stringify(this.state.items));
                        newItems.push(value);
                        this.setState({items: newItems});
                        if(this.props.onUpdateList){
                            this.props.onUpdateList(this.props.path, this.state.items);
                        }
                    } else {
                        this.setState({showAlert: true});
                    }
                } else {
                    return this.open();
                }
            }
        );
    }

    removeFromList(valueIndex) {
        const newItems = JSON.parse(JSON.stringify(this.state.items));
        newItems.splice(valueIndex, 1);
        this.setState({items: newItems});
        this.props.onUpdateList(this.props.path, this.state.items);
    }

    open() {
        this.setState({showEnterMetadataModal: true});
    }

    close(OK) {
        this.setState({showEnterMetadataModal: false});
        if (OK) {
            if (this.state.value.length) {
                if (!(this.state.value.length > 256)) {
                    const newItems = JSON.parse(JSON.stringify(this.state.items));
                    newItems.push(this.state.value);
                    this.setState({items: newItems});
                    if(this.props.onUpdateList){
                        this.props.onUpdateList(this.props.path, this.state.items);
                    }
                } else {
                    this.setState({showAlert: true});
                }
            }
        }
    }

    hideAlert() {
        this.setState({showAlert: false});
    }

}