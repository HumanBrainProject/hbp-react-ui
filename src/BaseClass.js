///////////////////////////////////////////////////////////
// File        : BaseClass.js
// Description : 
import React from 'react';
import { Panel } from 'react-bootstrap';

import Path from './Path';

export default class BaseClass extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.path = new Path(props.path);
        this.title = typeof(this.path.last) != 'undefined' ? this.path.last : this.path.first;
    }

}