///////////////////////////////////////////////////////////
// File        : Tree.js
// Description : 

// Imports : 

import React from 'react';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import TreeStyles from './TreeStyles';
import BaseClass from './BaseClass';
import NameValue from './NameValue';

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
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.constructor: ' + JSON.stringify(props));
        super(props);
        this.data = props.data || {};
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

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Tree.componentWillReceiveProps: ' + JSON.stringify(nextProps));
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

    onSelect(name,value) {
        this.props.onSelect(this.props.path, new NameValue(name, value));
    }

    toggle() {
        this.class = ( this.class == 'glyphicon glyphicon-plus' ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus' )
        this.displayChildren.display = ( this.displayChildren.display == 'none' ? 'block' : 'none' );
    }


}

// Exports

