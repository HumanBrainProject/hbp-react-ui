///////////////////////////////////////////////////////////
// File        : TreeModal.js
// Description : 
/**
 * TreeModal displays a Tree object in a modal and adds selections to a DynamicList.
 * @class TreeModal
 * @property {function} onChange The event-handler for each selection
 * @property {string} path The path to specify when reporting the value
 * @property {object} store The data provider (an object that suports a 'queryData()' method and a 'data' property)
 * @property {array} items A NameValueArray of the initial values
 * @property {string} description The tooltip to display
 */

// Imports : 

import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import BaseClass from './BaseClass';
import DynamicList from './DynamicList';
import Tree from './Tree';

// Class Definition
@observer
export default
class TreeModal extends BaseClass {
// Attributes
    @observable items;
    @observable showModal = false;

// Constructor
    constructor(props) {
        super(props);
        this.items = props.items || new NameValueArray();
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
        if (typeof(_hbp_debug_) != 'undefined') console.log('TreeModal.componentWillReceiveProps');
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
        return super.renderContainer();
    }

    renderHeader() {
        return super.renderHeader();
    }

    renderBody() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('TreeModal.renderBody: ' + this.props.path);
        const header = (
            <div/>
        );
        return (
            <div>
                <Button bsStyle='primary' onClick={this.open.bind(this)}>Select...</Button>
                <DynamicList
                    path={this.props.path}
                    onChange={this.props.onChange}
                    header={header}
                    items={this.items}
                    ref={(component) => { this.componentDynamicList = component; }}
                />
                <Modal show={this.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>{this.props.description}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-left'>
                            {
                                this.initialised 
                                ? 
                                <Tree
                                    path={this.props.path}
                                    onChange={this.onChange.bind(this)}
                                    data={this.props.store.data}
                                />
                                : 
                                <div>Loading...</div>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    onChange(path,selectedItem) {
        this.items.push(selectedItem);
        this.props.onChange(this.props.path, this.items.toJS());
    }

    open() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('TreeModal.open');
        this.showModal = true;
        this.initialised = false;
        this.props.store.queryData(() => {this.initialised = true;});
    }

    close(OK) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('TreeModal.close');
        this.showModal = false;
    }


}

// Exports

