import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';
import DynamicList from './DynamicList';

@observer
class Component extends React.Component {
    @observable items = ['Value A','Value B','Value C',];

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Component.render');
        // const items = ['Value A','Value B','Value C',];
        return (
            <div style={Styles.styleTable()}>
                <div style={Styles.styleRowGroup()}>
                    <div style={Styles.styleRow()}>
                        <div style={Styles.styleCell()}>
                            <DynamicList
                                path={'/Category/Item'}
                                onUpdateList={this.onUpdateList.bind(this)} 
                                items={this.items}
                                onAddItem={this.onAddItem.bind(this)}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onAddItem(onAddItemAction) {
        console.log('Component.onAddItem');
        onAddItemAction(''); // Value D
    }

    onUpdateList(path, values) {
        console.log(`Component.onUpdateList: ${path} - ${values.join()}`);
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
        component.items.push('Value D');
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

