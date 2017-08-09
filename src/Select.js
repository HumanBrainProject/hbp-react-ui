import React from 'react';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';

@observer
/**
 * Allows an item to be selected from a list of name-value pair objects, optionally notifying a sink
 * @param {String} path - Location for the notification
 * @param {Function} onSelect - Called when the selection changes
 * @param {Array<Object>} options - An array of objects with name and value properties, representing the possible options
 * @param {String} selection - The initially selected value
 */
export default class Select extends React.Component {
    /**
     * State:
     * @property {Array<Object>} options - The current options
     * @property {String} selection - The current selection
     */
    @observable options;
    @observable selection;

    constructor(props) {
        console.log('Select.constructor');
        super(props);
        this.componentWillReceiveProps(props);
    }

    componentDidMount() {
        console.log('Select.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('Select.componentWillReceiveProps');
        this.options = nextProps.options || [];
        this.selection = nextProps.selection || '';
    }

    /**
     * Render a dropdown list
     */
    render() {
        console.log('Select.render: ' + this.props.path);
        const title = this.props.path.substr(this.props.path.search(/[\w-]+$/)); // The last word in the path
        const options = this.renderOptions(this.options.items);
        return (
            <div>
                <Panel header={title} className='text-center' title={this.props.description} style={Styles.stylePanel()}>
                    <FormGroup controlId='formControlsSelect' style={{ marginBottom: '0' }}>
                        <FormControl
                            componentClass='select'
                            placeholder='select'
                            onChange={this.handleSelectionChange.bind(this)}
                            value={this.selection}
                        >
                            {this.selection == '' ? <option value='' selected>select...</option> : <option value=''>select...</option>}
                            {options}
                        </FormControl>
                    </FormGroup>
                </Panel>
            </div>
        );
    }

    /**
     * Render individual items in the list, including the current selection
     */
    renderOptions(items) {
        console.log('Select.renderOptions');
        return items.map((item, index) => {
            if (item.value == this.selection) {
                return (
                    <option key={index} value={item.value} selected>{item.name}</option>
                );
            } else {
                return (
                    <option key={index} value={item.value}>{item.name}</option>
                );
            }
        });
    }

    /**
     * Notify the sink when the selection changes
     */
    handleSelectionChange(e) {
        console.log('Select.handleSelectionChange: ' + e.target.value);
        this.selection = e.target.value;
        if (this.selection != '') {
            const option = this.options.findByValue(this.selection);
            if (option)
                this.props.onSelect(this.props.path, option);
        } else {
            this.clearSelection();
        }
    }

    /**
     * Notify the sink when there is no selection
     */
    clearSelection() {
        console.log('Select.clearSelection');
        this.selection = '';
        this.props.onSelect(this.props.path, '');
    }
}
