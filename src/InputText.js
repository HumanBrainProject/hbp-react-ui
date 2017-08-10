import React from 'react';
import { FormControl } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer, action } from 'mobx-react';

import Styles from './Styles';

@observer
/**
 * Allows simple text entry, optionally notifying a sink
 * @param {String} path - Location for the notification e.g. '/abc/xyz'
 * @param {Function} onUpdateValue - Called when the value changes
 * @param {String} value - The initial value
 * @param {String} description - The tooltip
 */
export default class InputText extends React.Component {
    /**
     * State:
     * @property {String} value - The current value
     */
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.constructor');
        super(props);
        this.value = props.value || '';
        this.description = props.description || '';
    }

    @observable value = this.props.value || '';

    componentDidMount() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.componentWillReceiveProps');
    }

    /**
     * Render a simple text box
     */
    render() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.render: ' + this.props.path);
        const title = this.props.path.substr(this.props.path.search(/[\w-\s]+$/)); // The last word in the path
        return (
            <div>
                <Panel header={title} className='text-center' title={this.description} style={Styles.stylePanel()}>
                    <FormControl
                        type='text'
                        placeholder='type...'
                        onChange={this.handleChange.bind(this)}
                        value={this.value}
                        />
                </Panel>
            </div>
        );
    }

    /**
     * Notify the sink when the value changes
     */
    handleChange(e) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('InputText.handleChange: ' + e.target.value);
        this.value = e.target.value;
        this.props.onUpdateValue(this.props.path, this.value);
    }
}

