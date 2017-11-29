///////////////////////////////////////////////////////////
// File        : DropTarget.js
// Description : 

// Imports : 

import React from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

import { observable, isObservableArray, toJS } from 'mobx';
import { observer } from 'mobx-react';

import DynamicList from './DynamicList';

// Class Definition
@observer
export default
class DropTarget extends DynamicList {
// Attributes

// Constructor

// Operations
    constructor(props) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DropTarget.constructor');
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return super.render();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('DropTarget.componentWillReceiveProps');
        super.componentWillReceiveProps(nextProps);
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

    renderBody() {
        if (this.items.value) {
            return (
                <div className='text-left'>
                    <Button onClick={this.addItem.bind(this, null)}>
                        {this.items.value}
                        <Glyphicon glyph='remove' style={{ marginLeft: '8px' }} />
                    </Button>
                </div>
            );

        } else {
            return (<div className='text-center' style={{color: 'silver'}}>drop {this.title} here</div>);
        }
    }

    addItem(name) {
        this.items.value = name;
        this.props.onChange(this.props.path, this.items);
    }


}

// Exports

