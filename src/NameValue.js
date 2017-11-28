'use strict';

import { observable } from 'mobx';

export class NameValue {
    constructor(name, value, key) {
        this.name = name;
        if (typeof value != 'undefined') this.value = value;
        if (typeof key != 'undefined') this.key = key;
    }

    get $name() {
        return this.name;
    }

    set $name(Name) {
        this.name = Name;
    }

    get $value() {
        if (typeof this.value == 'undefined') return this.name; else return this.value;
    }

    set $value(Value) {
        this.value = Value;
    }

    get $key() {
        return this.key;
    }

    set $key(key) {
        this.key = key;
    }

    get $children() {
        return this.children;
    }

    set $children(children) {
        this.children = children;
    }
}

export class NameValueArray {
    constructor(array) {
        let items = observable(new Array());
        if (typeof array != 'undefined') {
            if (Array.isArray(array)) {
                array.map((item) => {if (typeof item == 'object') items.push(new NameValue(item.name, item.value)); else items.push(new NameValue(item));});
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'object') items.push(new NameValue(arguments[i].name, arguments[i].value)); else items.push(new NameValue(arguments[i]));
                }
            }
        }
        var methods = Object.getOwnPropertyNames(this.__proto__).filter(key => isNaN(parseInt(key))); // Filter out methods for accessing elements by index
        for (var method in methods) {
            console.log('NameValueArray: ' + methods[method]);
            items[methods[method]] = this[methods[method]];
        }
        return items; // A MobX ObservableArray
    }

    add(name, value, key, children) {
        this.push(new NameValue(name, value, key, children));
    }

    addNameValue(item) { // A name-value object
        this.push(item);
    }

    addFromJSON(data) { // An array of name-value objects in JSON format
        data.map((item, index) => {
            this.add(item['name'], item['value']);
        });
    }

    addFromDefinitionsJSON(data) { // An array of objects from the Definition table
        data.map((item, index) => {
            this.add(item['alphanumeric'], item['label'], item['numeric']);
        });
    }

    remove(object) {
        let i = -1;
        while ((i = this.findIndex((item) => (item.name == object.name) && (item.value == object.value))) != -1) {
            this.splice(i, 1);
        }
    }

    getNames() {
        const names = this.map((item, index) => {
            return item.name;
        });
        return names;
    }

    getValues() {
        const values = this.map((item, index) => {
            return item.value;
        });
        return values;
    }

    findByValue(value) { // Only finds unique values
        const results = this.filter(item => item.value == value);
        if (results.length == 1)
            return results[0];
    }
}

