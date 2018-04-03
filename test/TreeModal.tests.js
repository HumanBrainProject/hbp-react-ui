import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { NameValue, NameValueArray } from '../src/NameValue';
import TreeStyles from '../src/TreeStyles';
import Store from '../src/Store';
import TreeModal from '../src/TreeModal';

@observer
class Component extends React.Component {
    @observable items = new NameValueArray();
    store = new Store('test/json/');

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
                            <TreeModal
                                path={'/Category/Item'}
                                onChange={this.onChange.bind(this)} 
                                store={this.store}
                                items={this.items}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange(path, newItems) {
        console.log(`Component.onChange: ${path} - ${JSON.stringify(newItems)}`);
        this.items = newItems;
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

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

