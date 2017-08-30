import React from 'react';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';
import NameValue from './NameValue';
import NameValueArray from './NameValueArray';

@observer
/**
 * Build a list of strings from a text selection or text input, optionally notifying a sink
 * @param {String} path - Location for the notification e.g. '/abc/xyz'
 * @param {Function} onUpdateList - Called when the list of items changes
 * @param {Object} header - An optional customised header component
 * @param {String} description - An optional tooltip
 * @param {Array<String>} items - An array of strings representing the initial list
 * @param {Function} onAddItem - A function to call when the 'Add' button is clicked
 */
export default class DynamicList extends React.Component {
    /**
     * State:
     * @property {Array<String>} items - An array of strings representing the current list
     * @property {String} value - The current value
     * @property {Bool} showEnterMetadataModal - Show input text
     */
    @observable items = this.props.items || [];
    @observable value = '';
    @observable showEnterMetadataModal = false;
    @observable showAlert = false;

    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.constructor');
        super(props);
    }

    componentDidMount() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.componentWillReceiveProps');
        this.items = nextProps.items || this.props.items;
    }

    /**
     * Render an 'Add' button and a list of 'Value' buttons, each with a 'Delete' button
     */
    render() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.render: ' + this.props.path);
        const title = this.props.path.substr(this.props.path.search(/[\w-]+$/)); // The last word in the path
        const header = (
            <div className='text-center'>
                <Button bsStyle='primary' onClick={this.addToList.bind(this)} title={this.props.description}>{title}</Button>
            </div>
        );
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
            <div style={{ margin: '0 2px 2px 0' }}>
                <Panel header={this.props.header || header} bsStyle='info'>
                    {items}
                </Panel>
                <Modal show={this.showEnterMetadataModal} onHide={this.close}>
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

    /**
     * Pass an anonymous function that adds a value to the owning component so that it can update this component with the text it chooses
     */
    addToList() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.addToList');
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

    /**
     * Remove the specified value
     */
    removeFromList(valueIndex) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.removeFromList');
        this.items.splice(valueIndex, 1);
        this.props.onUpdateList(this.props.path, this.items.toJS());
    }

    /**
     * Update the current value from the text input
     */
    onChange(e) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.onChange');
        this.value = e.target.value;
    }

    /**
     * Show the text input modal
     */
    open() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.open');
        this.showEnterMetadataModal = true;
    }

    /**
     * Hide the text input modal and, optionally, add the current value
     */
    close(OK) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicList.close');
        this.showEnterMetadataModal = false;
        if (OK) {
            if (this.value.length) {
                this.items.push(this.value);
                this.props.onUpdateList(this.props.path, this.items.toJS());
            }
        }
    }

    /**
     * Hide the alert modal
     */
    hideAlert() {
        this.showAlert = false;
    }
}

