import React from 'react';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';

@observer
/**
 * Build a list of text items from a text selection or text input, optionally notifying a sink
 * @param {String} path - Location for the notification e.g. '/abc/xyz'
 * @param {Function} onUpdateValue - Called when the list of values changes
 * @param {Object} header - An optional customised header component
 * @param {Array<String>} values - An array of strings representing the initial list of values
 * @param {Function} onAddValue - A function to call when the 'Add' button is clicked
 */
export default class DynamicList extends React.Component {
    /**
     * State:
     * @property {Array<String>} values - An array of strings representing the current list of values
     * @property {String} value - The current value
     * @property {Bool} showEnterMetadataModal - Show input text
     */
    constructor(props) {
        super(props);
    }

    @observable values = this.props.values || [];
    @observable value = '';
    @observable showEnterMetadataModal = false;
    @observable showAlert = false;

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.values.replace(nextProps.values || []);
    }

    /**
     * Render an 'Add' button and a list of 'Value' buttons, each with a 'Delete' button
     */
    render() {
        console.log('DynamicList.render: ' + this.props.path);
        const title = this.props.path.substr(this.props.path.search(/[\w-]+$/)); // The last word in the path
        const header = (
            <div style={{ backgroundColor: '#f6f6f6', borderBottom: '1px solid #ddd', padding: '3px 40px' }}>
                <Button bsStyle='primary' onClick={this.addValueToValues.bind(this)} title={this.props.description}>{title}</Button>
            </div>
        );
        const list = this.values.map((value, index) => {
            return (
                <div key={index} className='text-left'>
                    <Button onClick={this.removeValueFromValues.bind(this, index)}>
                        {value}
                        <Glyphicon glyph='remove' style={{ marginLeft: '8px' }} />
                    </Button>
                </div>
            );
        });
        return (
            <div>
                {this.props.header || header}
                <div style={{ padding: '10px 10px' }}>
                    {list}
                </div>
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
    addValueToValues() {
        console.log('DynamicList.addValueToValues');
        this.props.onAddValue(
            (value) => {
                if (value.length) {
                    if (!(value.length > 256)) {
                        this.values.push(value);
                        this.props.onUpdateValue(this.props.path, this.values.toJS());
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
    removeValueFromValues(valueIndex) {
        console.log('DynamicList.removeValueFromValues');
        this.values.splice(valueIndex, 1);
        this.props.onUpdateValue(this.props.path, this.values.toJS());
    }

    /**
     * Update the current value from the text input
     */
    onChange(e) {
        console.log('DynamicList.onChange');
        this.value = e.target.value;
    }

    /**
     * Show the text input modal
     */
    open() {
        console.log('DynamicList.open');
        this.showEnterMetadataModal = true;
    }

    /**
     * Hide the text input modal and, optionally, add the current value
     */
    close(OK) {
        console.log('DynamicList.close');
        this.showEnterMetadataModal = false;
        if (OK) {
            if (this.value.length) {
                this.values.push(this.value);
                this.props.onUpdateValue(this.props.path, this.values.toJS());
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

