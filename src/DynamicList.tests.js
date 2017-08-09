import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import Styles from './Styles';
import NameValueArray from './NameValueArray';
import DynamicList from './DynamicList';

@observer
class Component extends React.Component {
    @observable list = new NameValueArray();

    constructor(props) {
        console.log('Component.constructor');
        super(props);
        this.list.addFromJSON([{ name: 'Male', value: 'M' }, { name: 'Female', value: 'F' },]);
    }

    render() {
        console.log('Component.render');
        return (
            <div style={Styles.styleTable()}>
                <div style={Styles.styleRowGroup()}>
                    <div style={Styles.styleRow()}>
                        <div style={Styles.styleCell()}>
                            <DynamicList
                                path={'/Category/Item'}
                                onUpdateList={this.onUpdateList.bind(this)} 
                                list={this.list}
                                onAddItem={this.onAddItem.bind(this)}
                                ref={(childComponent) => { this.childComponent = childComponent; }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onAddItem(addItemAction) {
        console.log('Component.addItem');
        addItemAction({ name: 'Other', value: 'O' });
    }

    onUpdateList(path, list) {
        console.log(`Component.onUpdateList: ${path} - ${this.list.getValues().join()}`);
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
        var component = assert.test.module.testEnvironment.component;
        var component = assert.test.module.testEnvironment.component.childComponent;
        assert.ok(typeof (component.props) == 'object', 'passed');
    });

    // hooks.after(function (assert) { // Not getting called here for some reason
    //     console.log('QUnit.hooks.after');
    //     ReactDOM.unmountComponentAtNode(document.getElementById('react'));
    //     assert.ok(true, 'after');
    // });
});

