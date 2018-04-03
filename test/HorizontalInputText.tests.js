import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { NameValue, NameValueArray } from '../src/NameValue';
import InputTextStyles from '../src/InputTextStyles';
import HorizontalInputText from '../src/HorizontalInputText';

@observer
class Component extends React.Component {
    item = new NameValue('Test');

    constructor(props) {
        console.log('Component.constructor');
        super(props);
    }

    render() {
        console.log('Component.render');
        return (
            <div style={InputTextStyles.styleTable()}>
                <div style={InputTextStyles.styleRowGroup()}>
                    <div style={InputTextStyles.styleRow()}>
                        <div style={InputTextStyles.styleCell()}>
                            <HorizontalInputText
                                path='/Category/Item'
                                onChange={this.onChange.bind(this)} 
                                title='Test Title'
                                item={this.item}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange(path, newItem) {
        console.log(`Component.onChange: ${path} - ${JSON.stringify(newItem)}`);
    }
}

QUnit.module('HorizontalInputText', function (hooks) {
    console.clear();
    this.component = ReactDOM.render(<Component />, document.getElementById('react'));

    hooks.before(function (assert) {
        console.log('QUnit.hooks.before');
        assert.ok(true, 'before');
    });

    QUnit.test('renderedParent', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(typeof this.component.props == 'object', 'passed');
    });

    QUnit.test('rendered', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(typeof this.component.childComponent.props == 'object', 'passed');
    });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

