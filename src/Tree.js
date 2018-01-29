///////////////////////////////////////////////////////////
// File        : Tree.js
// Description : 
import React from 'react';

import _ from 'lodash';
import {FormControl, FormGroup, ControlLabel, Glyphicon} from 'react-bootstrap';

import BaseClass from './BaseClass';
import NameValue from './NameValue';

export default class Tree extends BaseClass {

    constructor(props) {
        //Debug
        if (typeof _hbp_debug_ !== "undefined") console.log('Tree.constructor: ' + JSON.stringify(props));
        super(props);
        this.state = {query:null};
        this.timer = null; //Timer for trigger the actual search from search input query
    }

    render() {
        return (
            <div className="Tree">
                <FormGroup controlId="Tree Node Search">
                    <ControlLabel>Search a node (please enter at least 3 characters)</ControlLabel>
                    <FormControl type="text" onChange={this.handleChange.bind(this)}/>
                    <FormControl.Feedback>
                        <Glyphicon glyph="search" />
                    </FormControl.Feedback>
                </FormGroup>

                <TreeNode 
                    path={this.props.path}
                    data={this.props.data} 
                    onSelect={this.props.onSelect}
                    query={this.state.query}
                />
            </div>
        );
    }

    handleChange(e){
        const self = this;
        const newQuery = e.target.value;
        if(this.timer){
            clearTimeout(this.timer);
        }
        let newQueryRegexp
        try{
            newQueryRegexp = newQuery.length >= 3? new RegExp(":\".*?"+newQuery+".*?\"","i"): null;
            this.timer = setTimeout(function(){
                self.setState({query: newQueryRegexp});
            }, 750);
        }
        catch(e){ }
    }

}

class TreeNode extends BaseClass {

    constructor(props) {
        super(props);
        this.state = {expand: props.query? !!JSON.stringify(props.data).match(props.query): false};
    }

    render() {
        let data = this.props.data || {};

        const name = data.name;
        const value = data.value;

        let children = undefined;

        if (data.children !== undefined) {
            if(this.state.expand){
                children = data.children.map((child, index) => {
                    return (
                        <TreeNode 
                            path={this.props.path}
                            data={child} 
                            onSelect={this.props.onSelect} 
                            key={index}
                            query={this.props.query}
                        />
                    );
                });
            } else {
                children = [];
            }
        }
        return (
            <li style={{ listStyleType: 'none' }}>
                { children != undefined && <i className={"glyphicon "+(this.state.expand?"glyphicon-minus":"glyphicon-plus")} style={{ marginRight: '0.5em' }} onClick={this.toggle.bind(this)}></i> }
                <a onClick={this.onSelect.bind(this, name, value)} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{name}</a>
                { (children != undefined && this.state.expand) && <ul style={{ marginLeft: '1em' }}>{children}</ul> }
            </li>
        )
    }

    shouldComponentUpdate(nextProps, nextState){
        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, this.nextState);
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) !== 'undefined'){
            console.log('TreeNode.componentWillReceiveProps: ' + JSON.stringify(nextProps));
        }
        this.setState({expand:nextProps.query? !!JSON.stringify(nextProps.data).match(nextProps.query): false});
    }

    onSelect(name,value) {
        if(this.props.onSelect){
            this.props.onSelect(this.props.path, new NameValue(name, value));
        }
    }

    toggle() {
        this.setState({expand: !this.state.expand});
    }

}