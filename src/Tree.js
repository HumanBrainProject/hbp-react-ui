import React from 'react';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

@observer
/**
 * Build a hierarchical tree with expandable/collapsible nodes. Each node consists of a name, a value and optional children
 * @param {String} path - Location for the notification
 * @param {Object} data - A json structure of form: { name, value, children: [] }
 * @param {Function} onUpdateSelection - A function to call when a node is clicked
 */
export default class Tree extends React.Component {
    /**
     * State:
     * @property {String} class - Expanded/collapsed icon
     * @property {Object} displayChildren - Show/hide child <ul>
     */
    /**
     * State:
 * @param {String} path - Location for the notification
     * @property {Object} data - JSON
     */
    constructor(props) {
        super(props);
    }

    @observable class = 'glyphicon glyphicon-chevron-right';
    @observable displayChildren = { display: 'none' };

    /**
     * Render an expandable/collapsible tree structure at a DOM node based on json data
     */
    render() {
        const name = this.props.data.name;
        const value = this.props.data.value;
        let children = undefined;
        if (this.props.data.children != undefined) {
            children = this.props.data.children.map((child, index) => {
                return (
                    <Tree 
                        path={this.props.path}
                        data={child} 
                        onUpdateSelection={this.props.onUpdateSelection} 
                    />
                );
            });
        }
        return (
            <li style={{ listStyleType: 'none' }}>
                { children != undefined && <i className={this.class} style={{ marginRight: '0.5em' }} onClick={this.toggle.bind(this)}></i> }
                <a onClick={this.updateSelection.bind(this, value)} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{name}</a>
                { children != undefined && <ul style={Object.assign({}, { marginLeft: '1em' }, this.displayChildren)}>{children}</ul> }
            </li>
        )
    }

    /**
     * Expand/collapse this node of the tree
     */
    toggle() {
        console.log('Tree.toggle');
        this.class = ( this.class == 'glyphicon glyphicon-chevron-right' ? 'glyphicon glyphicon-chevron-down' : 'glyphicon glyphicon-chevron-right' )
        this.displayChildren.display = ( this.displayChildren.display == 'none' ? 'block' : 'none' );
    }

    /**
     * Pass an anonymous function that adds a value to the owning component so that it can update this component with the text it chooses
     */
    updateSelection(value) {
        console.log('Tree.updateSelection: ' + value);
        this.props.onUpdateSelection(this.props.path, value);
    }
}

