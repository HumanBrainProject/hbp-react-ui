import React from 'react';
import ReactDOM from 'react-dom';

import { NameValue, NameValueArray } from '../src/NameValue';

class NameValueArrayDerived { // Classes that want to access NameValueArray elements should use this pattern
    constructor() {
        let items = new NameValueArray();
        var methods = Object.getOwnPropertyNames(this.__proto__);
        for (var method in methods) {
            console.log('NameValueArrayDerived: ' + methods[method]);
            items[methods[method]] = this[methods[method]];
        }
        return items;
    }

    testDerivedClass() {
        console.log('testDerivedClass');
        return true;
    }
}

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.testNameValue = new NameValue('myName', 'myValue'); // , 1
        this.testNameOnly = new NameValue('myName');
        this.testEmptyNameValueArray = new NameValueArray();
        this.testNameValueArray = new NameValueArray([this.testNameValue]);
        this.testJSONNameValueArray = new NameValueArray();
        this.testHeterogeneousNameValueArray = new NameValueArray(this.testNameValue, 'mySecondName');
        this.testHeterogeneousArray = new Array(this.testNameValue, 'mySecondName');
    }

    render() {
        console.log('Component.render');
        return (
            <div></div>
        );
    }
}

QUnit.module('NameValue', function (hooks) {
    console.clear();
    this.that = ReactDOM.render(<Component />, document.getElementById('react'));

    hooks.before(function (assert) {
        console.log('QUnit.hooks.before');
        assert.ok(true, 'before');
    });

    QUnit.test('renderedParent', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(typeof this.that.props == 'object', 'passed');
    });

    QUnit.test('name', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(this.that.testNameValue.$name == 'myName', 'passed');
    });

    QUnit.test('value', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(this.that.testNameValue.$value == 'myValue', 'passed');
    });

    QUnit.test('valueMissing', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(this.that.testNameOnly.$value == 'myName', 'passed');
    });

    QUnit.test('emptyArray', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(this.that.testEmptyNameValueArray.length == 0, 'passed');
    });

    QUnit.test('array', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(this.that.testNameValueArray.length == 1 && this.that.testNameValueArray[0].$name == 'myName', 'passed');
    });

    QUnit.test('heterogeneousArray', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        assert.ok(this.that.testHeterogeneousNameValueArray.length == 2 && this.that.testHeterogeneousNameValueArray[1].$value == 'mySecondName', 'passed');
    });
    
    QUnit.test('addFromJSON', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        this.that.testJSONNameValueArray.addFromJSON([{ name: '<Unknown>', value: 'U' }, { name: 'Male', value: 'M' }, { name: 'Female', value: 'F' }, { name: 'Other', value: 'O' }]);
        assert.ok(this.that.testJSONNameValueArray.length == 4, 'passed');
    });
    
    QUnit.test('stringify', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        console.log(JSON.stringify(this.that.testHeterogeneousNameValueArray));
        assert.ok(true, 'passed');
    });

    QUnit.test('xmlhttprequest', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        // console.log(JSON.stringify(this.that.testHeterogeneousNameValueArray));

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                console.log('XHR: ' + this.responseText);
            }
        };
        xhr.open("POST", "http://localhost:8080/savespecification/0/json/");
        // var payload = '{"Specification":{"name":"Dataset","value":"IGGYA","children":[{"name":"ReleaseDate","value":"2017-11-17"},{"name":"SpecimenGroup","value":["OJHPO"]},{"name":"Activity","value":["A001"]},{"name":"License","value":"__HBP_LICENSE__0000001"},{"name":"DataLink","value":"www.epfl.ch"},{"name":"Owner","value":["Simon"]},{"name":"Contributor","value":null},{"name":"Format","value":null},{"name":"ReferenceSpace","value":null}]}}';
        var payload = {"Specification":{"name":"Dataset","value":"IGGYA","children":this.that.testHeterogeneousNameValueArray}};
        xhr.send(JSON.stringify(payload));

        assert.ok(true, 'passed');
    });

    QUnit.test('derivedClass', function (assert) {
        console.log('QUnit.' + assert.test.testName);
        const derivedClassInstance = new NameValueArrayDerived();
        assert.ok(derivedClassInstance.testDerivedClass(), 'passed');
    });
});

