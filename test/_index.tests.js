import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Styles from '../src/Styles';
import NameValueArray from '../src/NameValueArray';
import DynamicList from '../src/DynamicList';
import DynamicListNameValue from '../src/DynamicListNameValue';
// import DynamicListSelect from '../src/DynamicListSelect';
import InputText from '../src/InputText';
import MultiSelect from '../src/MultiSelect';
import Select from '../src/Select';
import Tree from '../src/Tree';

@observer
class Component extends React.Component {
    @observable items = ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune',];
    @observable options = new NameValueArray();
    @observable data = { "name": "The Sun", "value": "star1", "children": [ { "name": "Mercury", "value": "planet1" }, { "name": "Venus", "value": "planet2" }, { "name": "Earth", "value": "planet3", "children": [ { "name": "Moon", "value": "moon1" }, ] }, { "name": "Mars", "value": "planet4", "children": [ { "name": "Phobos", "value": "moon2" }, { "name": "Deimos", "value": "moon3" }, ] }, ] };
    
    constructor(props) {
        super(props);
        this.options.addFromJSON([{ name: 'Star', value: 'S' }, { name: 'Asteroid', value: 'A' }, { name: 'Planet', value: 'P' }, { name: 'Moon', value: 'M' },]);
    }

    render() {
        console.log('Component.render');
        return (
            <div style={Styles.styleTable()}>
                <div style={Styles.styleRowGroup()}>
                    <div style={Styles.styleRow()}>
                        {/* <div style={Styles.styleCell()}>
                            <DynamicList
                                path={'/SolarSystem/PlanetList'}
                                onUpdateList={this.onUpdateList.bind(this)} 
                                items={this.items}
                                onAddItem={this.onAddItem.bind(this)}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                        <div style={Styles.styleCell()}>
                            <DynamicListNameValue
                                path={'/SolarSystem/ObjectType'}
                                onUpdateList={this.onUpdateList.bind(this)} 
                                items={this.options.items}
                                onAddItem={this.onAddItem.bind(this)}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                        <div style={Styles.styleCell()}>
                            <Select
                                path='/SolarSystem/ObjectType'
                                onSelect={this.onSelect.bind(this)} 
                                options={this.options}
                                selection={'M'}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div> */}
                        <div style={Styles.styleCell()}>
                            <MultiSelect
                                path='/SolarSystem/ObjectType'
                                onSelect={this.onSelect.bind(this)} 
                                options={this.options}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                        {/* <div style={Styles.styleCell()}>
                            <Tree
                                path={'/SolarSystem/Orbit'}
                                onSelect={this.onSelect.bind(this)} 
                                data={this.data}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                                />
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }

    onAddItem(onAddItemAction) {
        console.log('Component.onAddItem');
        onAddItemAction('');
    }

    onUpdateList(path, values) {
        console.log(`Component.onUpdateList: ${path} - ${values.join()}`);
    }

    onSelect(path, option) {
        console.log(`Component.onSelect: ${path} - {name: '${option.name}', value: '${option.value}'}`);
    }
}

QUnit.module('DynamicList', function (hooks) {
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

    QUnit.test('updateParent', function (assert) {
        console.log('QUnit.updateParent');
        var component = assert.test.module.testEnvironment.component;
        var length = component.items.length;
        component.items.push('Pluto');
        assert.ok(component.items.length == length + 1, 'passed');
    });

    // QUnit.test('state', function(assert) {
    //     console.log('QUnit.state');
    //     var component = assert.test.module.testEnvironment.component.childComponent;
    //     assert.ok(typeof(component.state.items) == 'object', 'passed');
    //     console.log(component.state.items);
    // });

    // QUnit.test('queryData', function (assert) {
    //     console.log('QUnit.queryData');
    //     var component = assert.test.module.testEnvironment.component.childComponent;
    //     component.props.store.queryData(() => {});
    //     assert.ok(true);
    // });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

QUnit.module('DynamicListNameValue', function (hooks) {
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

    QUnit.test('updateParent', function (assert) {
        console.log('QUnit.updateParent');
        var component = assert.test.module.testEnvironment.component;
        var length = component.items.length;
        component.items.push('Pluto');
        assert.ok(component.items.length == length + 1, 'passed');
    });

    // QUnit.test('state', function(assert) {
    //     console.log('QUnit.state');
    //     var component = assert.test.module.testEnvironment.component.childComponent;
    //     assert.ok(typeof(component.state.items) == 'object', 'passed');
    //     console.log(component.state.items);
    // });

    // QUnit.test('queryData', function (assert) {
    //     console.log('QUnit.queryData');
    //     var component = assert.test.module.testEnvironment.component.childComponent;
    //     component.props.store.queryData(() => {});
    //     assert.ok(true);
    // });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

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
        component.options.remove({ name: 'Asteroid', value: 'A' });
        assert.ok(component.options.items.length == --length, 'passed');
    });

    QUnit.test('replaceOptions', function(assert) {
        console.log('QUnit.replaceOptions');
        var component = assert.test.module.testEnvironment.component;
        component.options = new NameValueArray(); // Only works because component.options is @observable
        component.options.add('Comet', 'C');
        assert.ok(component.options.items.length == 1, 'passed');
    });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

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

    // QUnit.test('replaceData', function(assert) {
    //     console.log('QUnit.replaceData');
    //     var component = assert.test.module.testEnvironment.component;
    //     component.data = { "name": "Proxima Centauri", "value": "star2", "children": [] }; // Only works because component.options is @observable
    //     assert.ok(typeof (component.data) == 'object', 'passed');
    // });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

