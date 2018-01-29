///////////////////////////////////////////////////////////
// File        : HorizontalInputText.js
// Description : 
import React from 'react';
import { FormControl, FormGroup, InputGroup} from 'react-bootstrap';

import InputText from './InputText';

export default class HorizontalInputText extends InputText {

    // Constructor
    constructor(props) {
        //Debug
        if (typeof _hbp_debug_ !== "undefined") console.log('HorizontalInputText.constructor: ' + JSON.stringify(props));
        super(props);
    }

    // Operations
    render() {
        const title = props.title || this.title;

        return (
            <div className="HBPHorizontalInputText">
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>{title}</InputGroup.Addon>
                        <FormControl
                            type="text"
                            placeholder="type..."
                            title={this.props.description}
                            onChange={this.onChange.bind(this)}
                            value={this.state.value}/>
                    </InputGroup>
                </FormGroup>
            </div>
        );
    }

}