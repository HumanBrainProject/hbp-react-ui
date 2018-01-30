///////////////////////////////////////////////////////////
// File        : BaseClass.js
// Description : 

// Imports : 

import React from 'react';
import { Panel } from 'react-bootstrap';

import { observable, isObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';
import { NameValue } from './NameValue';
import Path from './Path';

// Class Definition
@observer
export default
class BaseClass extends React.Component {
// Attributes
    @observable initialised = false;
    empty = new NameValue('');

// Constructor
    constructor(props) {
        //console.log('BaseClass.constructor');
        //try { console.log(JSON.stringify(props)); } catch (error) { console.log('No JSON for \'props\''); }
        super(props);
        this.path = new Path(props.path);
        this.title = typeof(this.path.last) != 'undefined' ? this.path.last : this.path.first;
        this.description = props.description || '';
    }


// Operations
    /*componentWillMount() {
        console.log('BaseClass.componentWillMount');
    }*/

    render() {
        //console.log('BaseClass.render');
        return this.renderContainer();
    }

    /*componentDidMount() {
        console.log('BaseClass.componentDidMount');
    }*/

    /*componentWillReceiveProps(nextProps) {
        console.log('BaseClass.componentWillReceiveProps');
        try { console.log(JSON.stringify(nextProps)); } catch (error) { console.log('No JSON for \'props\''); }
        // super.componentWillReceiveProps(nextProps);  // This is causing a problem
    }*/

    /*shouldComponentUpdate(nextProps,nextState) {
        console.log('BaseClass.shouldComponentUpdate');
        return true;
    }*/

    /*componentWillUpdate(nextProps,nextState) {
        console.log('BaseClass.componentWillUpdate');
    }*/

    /*componentDidUpdate(prevProps,prevState) {
        console.log('BaseClass.componentDidUpdate');
    }*/

    /*componentWillUnmount() {
        console.log('BaseClass.componentWillUnmount');
    }*/

    /*componentDidCatch(error,info) {
        console.log('BaseClass.componentDidCatch');
    }*/

    renderContainer() {
        //console.log('BaseClass.renderContainer');
        return (
            <div style={this.style}>
                <Panel header={this.renderHeader()} bsStyle='info' className='text-center' title={this.props.description}>
                    {this.renderBody()}
                </Panel>
            </div>
        );
    }

    renderHeader() {
        //console.log('BaseClass.renderHeader');
    }

    renderBody() {
        //console.log('BaseClass.renderBody');
    }


}

// Exports

