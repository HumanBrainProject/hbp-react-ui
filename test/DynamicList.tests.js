import React from 'react';
import ReactDOM from 'react-dom';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { NameValue, NameValueArray } from '../src/NameValue';
import DynamicListStyles from '../src/DynamicListStyles';
import DynamicList from '../src/DynamicList';

@observer
class Component extends React.Component {
    items = new NameValueArray(); // @observable 

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Component.render');
        this.items.addFromJSON([{ name: '<Unknown>', value: 'U' }, { name: 'Male', value: 'M' }, { name: 'Female', value: 'F' }, { name: 'Other', value: 'O' }]);
        return (
            <div style={DynamicListStyles.styleTable()}>
                <div style={DynamicListStyles.styleRowGroup()}>
                    <div style={DynamicListStyles.styleRow()}>
                        <div style={DynamicListStyles.styleCell()}>
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
        console.log(`Component.onUpdateList: ${path} - ${JSON.stringify(values)}`);
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

