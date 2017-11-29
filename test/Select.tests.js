import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { NameValue, NameValueArray } from '../src/NameValue';
import SelectStyles from '../src/SelectStyles';
import Select from '../src/Select';

@observer
class Component extends React.Component {
    @observable options = new NameValueArray();

    constructor(props) {
        console.log('Component.constructor');
        super(props);
        this.options.addFromJSON([{ name: '<Unknown>', value: 'U' }, { name: 'Male', value: 'M' }, { name: 'Female', value: 'F' }]);
    }

    render() {
        console.log('Component.render');
        return (
            <div style={SelectStyles.styleTable()}>
                <div style={SelectStyles.styleRowGroup()}>
                    <div style={SelectStyles.styleRow()}>
                        <div style={SelectStyles.styleCell()}>
                            <Select
                                path='/Category/Item'
                                onChange={this.onChange.bind(this)} 
                                options={this.options}
                                item={this.options[2]}
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

QUnit.module('Select', function (hooks) {
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

    QUnit.test('addOption', function(assert) {
        console.log('QUnit.addOption');
        var length = this.component.childComponent.options.length;
        this.component.childComponent.options.add('Other', 'O');
        assert.ok(this.component.childComponent.options.length == ++length, 'passed');
    });

    // QUnit.test('changeOption', function(assert) {
    //     console.log('QUnit.changeOption');
    //     var length = this.component.childComponent.options.length;
    //     this.component.childComponent.options[0].name = 'Unknown'; // Doesn't work because array elements are not observable
    //     assert.ok(this.component.childComponent.options.length == length, 'passed');
    // });

    QUnit.test('removeOption', function(assert) {
        console.log('QUnit.removeOption');
        var length = this.component.childComponent.options.length;
        this.component.childComponent.options.remove({ name: 'Male', value: 'M' });
        assert.ok(this.component.childComponent.options.length == --length, 'passed');
    });

    QUnit.test('replaceOptions', function(assert) {
        console.log('QUnit.replaceOptions');
        this.component.childComponent.options = new NameValueArray(); // Only works because component.options is @observable
        this.component.childComponent.options.add('Replacement', 'R');
        assert.ok(this.component.childComponent.options.length == 1, 'passed');
    });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

