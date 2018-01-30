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
        // this.items.addFromJSON([{ name: '<Unknown>', value: 'U' }, { name: 'Male', value: 'M' }, { name: 'Female', value: 'F' }, { name: 'Other', value: 'O' }]);
        this.items.addFromJSON([{ value: '<Unknown>' }, { value: 'Male' }, { value: 'Female' }, { value: 'A very long value, representing Other' }]);
        const className='col-2 row-1';
        return (
            <div className='flex-row-wrap'>
                <div className={className} style={{ backgroundColor: 'orange' }}></div>
                <div className={className} style={{  }}>
                    <DynamicList
                        path={'/Category/Item'}
                        onChange={this.onChange.bind(this)} 
                        items={this.items}
                        onAddItem={this.onAddItem.bind(this)}
                        description={'Enter an item'}
                        style={{  }}
                        ref={(childComponent) => { this.childComponent = childComponent; }}
                    />
                </div>
            </div>
        );
    }

    onAddItem(onAddItemAction) {
        console.log('Component.onAddItem');
        onAddItemAction(''); // Need a test for add selected text
    }

    onChange(path, newItems) {
        console.log(`Component.onChange: ${path} - ${JSON.stringify(newItems)}`);
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

