import React from 'react';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';
import NameValue from './NameValue';

@observer
/**
 * Build a tree from json data and notify a sink when nodes are selected
 * @param {String} path - Location for the notification e.g. '/abc/xyz'
 * @param {Function} onSelect - Called when a node of the tree is selected
 * @param {Object} data - A json structure of form: { name, value, children: [] }
 */
export default class Tree extends React.Component {
    /**
     * State:
     * @property {String} data - The current data
     * @property {String} class - Expanded/collapsed icon
     * @property {Object} displayChildren - Show/hide child <ul>
     */
    @observable data;
    @observable class = 'glyphicon glyphicon-plus';
    @observable displayChildren = { display: 'none' };

    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.constructor');
        super(props);
        this.data = props.data || {};
    }

    componentDidMount() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.componentWillReceiveProps');
        if (nextProps.data != this.props.data) { // Re-initialised
            this.data = nextProps.data;
        }
    }

    /**
     * Render an expandable/collapsible tree structure at a DOM node based on json data
     */
    render() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.render: ' + this.props.path);
        const name = this.data.name;
        const value = this.data.value;
        let children = undefined;
        if (this.data.children != undefined) {
            children = this.data.children.map((child, index) => {
                return (
                    <Tree 
                        path={this.props.path}
                        data={child} 
                        onSelect={this.props.onSelect} 
                        key={index}
                    />
                );
            });
        }
        return (
            <li style={{ listStyleType: 'none' }}>
                { children != undefined && <i className={this.class} style={{ marginRight: '0.5em' }} onClick={this.toggle.bind(this)}></i> }
                <a onClick={this.onSelect.bind(this, name, value)} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{name}</a>
                { children != undefined && <ul style={Object.assign({}, { marginLeft: '1em' }, this.displayChildren)}>{children}</ul> }
            </li>
        )
    }

    /**
     * Expand/collapse this node of the tree
     */
    toggle() {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.toggle');
        this.class = ( this.class == 'glyphicon glyphicon-plus' ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus' )
        this.displayChildren.display = ( this.displayChildren.display == 'none' ? 'block' : 'none' );
    }

    /**
     * Pass a NameValue object to the sink
     */
    onSelect(name, value) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.onSelect: ' + value);
        this.props.onSelect(this.props.path, new NameValue(name, value));
    }
}

