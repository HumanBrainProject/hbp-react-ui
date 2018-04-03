///////////////////////////////////////////////////////////
// File        : Tree.js
// Description : 
/**
 * Tree displays an expandable/collapsible hierarchical tree and allows nodes to be selected.
 * @class Tree
 * @property {function} onChange The event-handler for each selection
 * @property {string} path The path to specify when reporting the value
 * @property {object} data A JSON object representing the hierarchy to be displayed, with each node in the form {name, value, children: []}
 * @property {object} style Styling overrides
 * @property {string} description The tooltip to display
 */

// Imports : 

import React from 'react';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import TreeStyles from './TreeStyles';
import BaseClass from './BaseClass';
import { NameValue, NameValueArray } from './NameValue';

// Class Definition
@observer
export default
class Tree extends BaseClass {
// Attributes
    @observable data;
    @observable class = 'glyphicon glyphicon-plus';
    @observable displayChildren = { display: 'none' };

// Constructor
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.constructor');
        super(props);
        this.data = props.data || {};
        this.style = props.style || TreeStyles.styleContainer();
    }


// Operations
    componentWillMount() {
    }

    render() {
        const name = this.data.name;
        const value = this.data.value;
        let children = undefined;
        if (this.data.children != undefined) {
            children = this.data.children.map((child, index) => {
                return (
                    <Tree 
                        path={this.props.path}
                        data={child} 
                        onChange={this.props.onChange} 
                        key={index}
                    />
                );
            });
        }
        return (
            <li style={{ listStyleType: 'none' }}>
                { children != undefined && <i className={this.class} style={{ marginRight: '0.5em' }} onClick={this.toggle.bind(this)}></i> }
                <a onClick={this.onChange.bind(this, name, value)} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{name}</a>
                { children != undefined && <ul style={Object.assign({}, { marginLeft: '1em' }, this.displayChildren)}>{children}</ul> }
            </li>
        )
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.componentWillReceiveProps');
        super.componentWillReceiveProps(nextProps);
        if (nextProps.data != this.props.data) { // Re-initialised
            this.data = nextProps.data;
        }
    }

    shouldComponentUpdate(nextProps,nextState) {
        return super.shouldComponentUpdate();
    }

    componentWillUpdate(nextProps,nextState) {
    }

    componentDidUpdate(prevProps,prevState) {
    }

    componentWillUnmount() {
    }

    componentDidCatch(error,info) {
    }

    renderContainer() {
    }

    renderHeader() {
    }

    renderBody() {
    }

    onChange(name,value) {
        this.props.onChange(this.props.path, new NameValue(name, value));
    }

    toggle() {
        this.class = ( this.class == 'glyphicon glyphicon-plus' ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus' )
        this.displayChildren.display = ( this.displayChildren.display == 'none' ? 'block' : 'none' );
    }


}

// Exports

