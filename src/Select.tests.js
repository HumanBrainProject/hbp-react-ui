import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';
import NameValueArray from './NameValueArray';
import Select from './Select';

@observer
class Component extends React.Component {
    @observable options = new NameValueArray();

    constructor(props) {
        console.log('Component.constructor');
        super(props);
        this.options.addFromJSON([{ name: 'Male', value: 'M' }, { name: 'Female', value: 'F' },]);
    }

    render() {
        console.log('Component.render');
        return (
            <div style={Styles.styleTable()}>
                <div style={Styles.styleRowGroup()}>
                    <div style={Styles.styleRow()}>
                        <div style={Styles.styleCell()}>
                            <Select
                                path='/Specimen/Sex'
                                onSelect={this.onSelect.bind(this)} 
                                options={this.options}
                                selection={'M'}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onSelect(path, option) {
        console.log(`Component.onSelect: ${path} - {name: '${option.name}', value: '${option.value}'}`);
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
        console.log('QUnit.renderedParent');
        var component = assert.test.module.testEnvironment.component;
        assert.ok(typeof (component.props) == 'object', 'passed');
    });

    QUnit.test('rendered', function (assert) {
        console.log('QUnit.rendered');
        var component = assert.test.module.testEnvironment.component.childComponent;
        assert.ok(typeof (component.props) == 'object', 'passed');
    });

    QUnit.test('addOption', function(assert) {
        console.log('QUnit.addOption');
        var component = assert.test.module.testEnvironment.component;
        var length = component.options.items.length;
        component.options.add('Other', 'O');
        assert.ok(component.options.items.length == ++length, 'passed');
    });

    QUnit.test('changeOption', function(assert) {
        console.log('QUnit.changeOption');
        var component = assert.test.module.testEnvironment.component;
        var length = component.options.items.length;
        component.options.items[0].name = 'Unknown'; // Doesn't work because array elements are not observable
        assert.ok(component.options.items.length == length, 'passed');
    });

    QUnit.test('removeOption', function(assert) {
        console.log('QUnit.removeOption');
        var component = assert.test.module.testEnvironment.component;
        var length = component.options.items.length;
        component.options.remove({ name: 'Female', value: 'F' });
        assert.ok(component.options.items.length == --length, 'passed');
    });

    QUnit.test('replaceOptions', function(assert) {
        console.log('QUnit.replaceOptions');
        var component = assert.test.module.testEnvironment.component;
        component.options = new NameValueArray(); // Only works because component.options is @observable
        component.options.add('Replacement', 'R');
        assert.ok(component.options.items.length == 1, 'passed');
    });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

