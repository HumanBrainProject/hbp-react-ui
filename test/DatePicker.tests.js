import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { NameValue } from '../src/NameValue';
import DatePickerStyles from '../src/DatePickerStyles';
import DatePicker from '../src/DatePicker';

@observer
class Component extends React.Component {
    @observable item = new NameValue('DatePicker', '2017-11-15');

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Component.render');
        return (
            <div style={DatePickerStyles.styleTable()}>
                <div style={DatePickerStyles.styleRowGroup()}>
                    <div style={DatePickerStyles.styleRow()}>
                        <div style={DatePickerStyles.styleCell()}>
                            <DatePicker
                                path={'/Category/Item'}
                                onUpdateValue={this.onUpdateValue.bind(this)} 
                                item={this.item}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onUpdateValue(path, value) {
        console.log(`Component.onUpdateValue: ${path} - ${JSON.stringify(value)}`);
    }
}

QUnit.module('DatePicker', function (hooks) {
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

