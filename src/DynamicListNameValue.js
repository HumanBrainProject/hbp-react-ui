import React from 'react';

import DynamicList from './DynamicList';

export default class DynamicListNameValue extends DynamicList {

    constructor(props) {
        if (typeof _hbp_debug_ !== "undefined") console.log('DynamicListNameValue.constructor');
        super(props);
    }

    /**
     * Pass an anonymous function that adds an item to the owning component
     */
    addToList() {
        if (typeof _hbp_debug_ !== "undefined") console.log('DynamicListNameValue.addToList');
        this.props.onAddItem(
            (item) => {
                const newItems = JSON.parse(JSON.stringify(this.state.items));
                newItems.push(item);
                this.setState({items: newItems});
                this.props.onUpdateList(this.props.path, this.state.items);
            }
        );
    }
}

