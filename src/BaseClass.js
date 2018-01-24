///////////////////////////////////////////////////////////
// File        : BaseClass.js
// Description : 

// Imports : 

import React from 'react';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';
import Path from './Path';

// Class Definition
@observer
export default
class BaseClass extends React.Component {
// Attributes
    @observable initialised = false;

// Constructor
    constructor(props) {
        super(props);
        this.path = new Path(props.path);
        this.title = typeof(this.path.last) != 'undefined' ? this.path.last : this.path.first;
    }


// Operations
    componentWillMount() {
        //console.log('BaseClass.componentWillMount');
    }

    render() {
        console.log('BaseClass.render');
        return this.renderContainer();
    }

    /*componentDidMount() {
        console.log('BaseClass.componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('BaseClass.componentWillReceiveProps');
    }*/

    /*shouldComponentUpdate(nextProps,nextState) {
        //console.log('BaseClass.shouldComponentUpdate');
        return true;
    }*/

    /*componentWillUpdate(nextProps,nextState) {
        console.log('BaseClass.componentWillUpdate');
    }

    componentDidUpdate(prevProps,prevState) {
        console.log('BaseClass.componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('BaseClass.componentWillUnmount');
    }

    componentDidCatch(error,info) {
        console.log('BaseClass.componentDidCatch');
    }*/

    renderContainer() {
        console.log('BaseClass.renderContainer');
        return (
            <div style={this.style}>
                <Panel header={this.renderHeader()} bsStyle='info' className='text-center' title={this.props.description}>
                    {this.renderBody()}
                </Panel>
            </div>
        );
    }

    renderHeader() {

    }

    renderBody() {
        
    }


}

// Exports

