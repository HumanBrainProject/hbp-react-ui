import React from 'react';

import DynamicList from './DynamicList';

export default class DynamicListNameValue extends DynamicList {
    /**
     * State:
     */

    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicListNameValue.constructor');
        super(props);
    }

    /**
     * Pass an anonymous function that adds an item to the owning component
     */
    addToList() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DynamicListNameValue.addToList');
        this.props.onAddItem(
            (item) => {
                this.items.push(item);
                this.props.onUpdateList(this.props.path, this.items.toJS());
            }
        );
    }
}

