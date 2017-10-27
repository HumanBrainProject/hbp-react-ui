import React from 'react';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import { DynamicList } from 'hbp-react-ui';

import SelectWithOptions from './SelectWithOptions';

@observer
/**
 * A combination of DynamicList and Select, each item selected from the dropdown list is added to the list of items
 * @param {String} path - Location for the notification
 * @param {Function} onUpdateValue - Called when the list of items changes
 * @param {Array<String>} items - An array of strings representing the initial items
 * @param {Array<Object>} options - An array of objects representing the possible options
 */
export default class DynamicListSelect extends React.Component {
    /**
     * State:
     * @property {Array<String>} items - An array of strings representing the current list of items
     * @property {String} option - The current option
     */
    @observable items = this.props.items || [];
    @observable option;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    /**
     * Render a dropdown list followed by a list of items that have been selected
     */
    render() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicListSelect.render: ' + this.props.path);
        const header = (
            <div/>
        );
        return (
            <div>
                <SelectWithOptions
                    path={this.props.path}
                    onSelect={this.onSelect.bind(this)}
                    description={this.props.description}
                    options={this.props.options}
                    ref={(component) => { this.componentSelect = component; }}
                />
                <DynamicList
                    path={this.props.path}
                    onUpdateList={this.props.onUpdateValue}
                    header={header}
                    items={this.items}
                    onAddItem={this.onAddItem.bind(this)}
                    ref={(component) => { this.componentDynamicList = component; }}
                />
            </div>
        );
    }

    /**
     * Notify the child when the selection changes
     */
    onSelect(path, option) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicListSelect.onSelect');
        this.option = option;
        if ((this.option) && (this.option != '')) {
            this.componentDynamicList.addToList();
            this.componentSelect.clearSelection()
        }
    }

    /**
     * Ask the child to add the current selection to the list
     */
    onAddItem(onAddItemAction) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicListSelect.onAddItem');
        if (this.option)
            onAddItemAction(this.option.name);
    }
}

