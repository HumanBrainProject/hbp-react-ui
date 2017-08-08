import React from 'react';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';

@observer
/**
 * Build a list of text items from a text selection or text input, optionally notifying a sink
 * @param {String} path - Location for the notification e.g. '/abc/xyz'
 * @param {Function} onUpdateValue - Called when the list of values changes
 * @param {Object} data - A json structure of form: { name, value, children: [] }
 */
export default class Tree extends React.Component {
    /**
     * State:
     * @property {String} class - Expanded/collapsed icon
     * @property {Object} displayChildren - Show/hide child <ul>
     */
    constructor(props) {
        super(props);
    }

    @observable class = 'glyphicon glyphicon-plus';
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
                        onUpdateValue={this.props.onUpdateValue} 
                        key={index}
                    />
                );
            });
        }
        return (
            <li style={{ listStyleType: 'none' }}>
                { children != undefined && <i className={this.class} style={{ marginRight: '0.5em' }} onClick={this.toggle.bind(this)}></i> }
                <a onClick={this.addValue.bind(this, value)} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{name}</a>
                { children != undefined && <ul style={Object.assign({}, { marginLeft: '1em' }, this.displayChildren)}>{children}</ul> }
            </li>
        )
    }

    /**
     * Expand/collapse this node of the tree
     */
    toggle() {
        console.log('Tree.toggle');
        this.class = ( this.class == 'glyphicon glyphicon-plus' ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus' )
        this.displayChildren.display = ( this.displayChildren.display == 'none' ? 'block' : 'none' );
    }

    /**
     * Pass an anonymous function that adds a value to the owning component so that it can update this component with the text it chooses
     */
    addValue(value) {
        console.log('Tree.addValue: ' + value);
        this.props.onUpdateValue(this.props.path, value);
    }
}

