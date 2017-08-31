import React from 'react';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';

@observer
/**
 * Allows a date to be selected, optionally notifying a sink
 * @param {String} path - Location for the notification
 * @param {Function} onUpdateValue - Called when the value changes
 * @param {String} value - The initial date value
 */
export default class DatePicker extends React.Component {
    /**
     * State:
     * @property {String} value - The current date value
     */
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.constructor');
        super(props);
    }

    @observable value = this.props.value || ''; // A single string date value

    componentDidMount() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.componentWillReceiveProps');
        this.value = nextProps.value || '';
    }

    /**
     * Render a date picker
     */
    render() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DatePicker.render: ' + this.props.path);
        const title = this.props.path.substr(this.props.path.search(/[\w-]+$/)); // The last word in the path
        return (
            <div style={{ margin: '0 2px 2px 0', width: '198px' }}>
                <style type='text/css'>{'.DatePickerPanel .panel-body {padding: 12px; height: 57px;}'}</style>
                <Panel className='DatePickerPanel' header={title} bsStyle='info' title={this.props.description} style={{ paddingBottom: '8px' }}>
                    <input type='date' onChange={this.handleChange.bind(this)} value={this.value}/>
                </Panel>
            </div>
        );
    }

    /**
     * Notify the sink when the value changes
     */
    handleChange(e) {
        console.log('DatePicker.handleChange: ' + e.target.value);
        this.value = e.target.value;
        this.props.onUpdateValue(this.props.path, this.value);
    }
}

