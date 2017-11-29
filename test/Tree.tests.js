import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { NameValue, NameValueArray } from '../src/NameValue';
import TreeStyles from '../src/TreeStyles';
import Tree from '../src/Tree';

@observer
class Component extends React.Component {
    @observable data = { "name": "olfactory nerve", "value": "MBA:840", "children": [ { "name": "olfactory nerve layer of main olfactory bulb", "value": "MBA:1016" }, { "name": "lateral olfactory tract, general", "value": "MBA:21", "children": [ { "name": "lateral olfactory tract, body", "value": "MBA:665" }, { "name": "lateral olfactory tract, body", "value": "MBA:538" }, { "name": "lateral olfactory tract, body", "value": "MBA:459" } ] }, { "name": "anterior commissure, olfactory limb", "value": "MBA:900" } ] };

    constructor(props) {
        console.log('Component.constructor');
        super(props);
    }

    render() {
        console.log('Component.render');
        return (
            <div style={TreeStyles.styleTable()}>
                <div style={TreeStyles.styleRowGroup()}>
                    <div style={TreeStyles.styleRow()}>
                        <div style={TreeStyles.styleCell()}>
                            <Tree
                                path={'/Category/Item'}
                                onChange={this.onChange.bind(this)} 
                                data={this.data}
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

QUnit.module('Tree', function (hooks) {
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

    QUnit.test('replaceData', function(assert) {
        console.log('QUnit.replaceData');
        var component = assert.test.module.testEnvironment.component;
        component.data = { "name": "eyeball", "value": "MBA:840", "children": [ { "name": "retina", "value": "MBA:1016" }, { "name": "lens", "value": "MBA:21", "children": [ { "name": "liquid", "value": "MBA:665" } ] }, { "name": "iris", "value": "MBA:900" } ] }; // Only works because component.options is @observable
        assert.ok(typeof (component.data) == 'object', 'passed');
    });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

