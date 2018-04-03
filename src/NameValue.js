'use strict';

import { observable } from 'mobx';

/**
 * NameValue describes a name/value pair, in JSON format e.g. {"name": "foo", "value": "bar"}.
 * @class
 * @param {string} name A name representing the value
 * @param {string} value A value
 * @param {number} key The position of the object within an array
 * @returns {object} The name/value instance
 */
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

/**
 * NameValueArray extends Javascript's built-in 'Array' to add specific funtionality for handling arrays of 'NameValue' objects.
 * @class
 * @param {object} array Either a built-in array or a list of NameValue objects
 * @returns {array} The array of NameValue objects
 */
export class NameValueArray {
    constructor(array) {
        let items = observable(new Array());
        if (typeof array != 'undefined') {
            if (Array.isArray(array)) {
                array.map((item) => {if (typeof item == 'object') items.push(new NameValue(item.name, item.value, item.key)); else items.push(new NameValue(item));});
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] == 'object') items.push(new NameValue(arguments[i].name, arguments[i].value, arguments[i].key)); else items.push(new NameValue(arguments[i]));
                }
            }
        }
        var methods = Object.getOwnPropertyNames(this.__proto__).filter(key => isNaN(parseInt(key))); // Filter out methods for accessing elements by index
        for (var method in methods) {
            // console.log('NameValueArray: ' + methods[method]);
            items[methods[method]] = this[methods[method]];
        }
        return items; // A MobX ObservableArray
    }

    /**
     * Create and add a single object to the array
     * @param {string} name An array of name/value objects in JSON format
     * @param {string} value An array of name/value objects in JSON format
     * @param {string} key An array of name/value objects in JSON format
     * @param {object} children An array of children
     */
    add(name, value, key, children) {
        this.push(new NameValue(name, value, key, children));
    }

    /**
     * Add a single object to the array
     * @param {object} item A name/value object
     */
    addNameValue(item) { // A name/value object
        this.push(item);
    }

    /**
     * Append the data to the array
     * @param {array} list An array of name/value objects in JSON format
     */
    addFromJSON(list) { // 
        list.map((item, index) => {
            this.add(item['name'], item['value']);
        });
    }

    /**
     * Append the alphanumeric/label/numeric-format data to the array
     * @param {array} list An array of objects from the Definition table
     */
    addFromDefinitionsJSON(list) { // 
        list.map((item, index) => {
            this.add(item['alphanumeric'], item['label'], item['numeric']);
        });
    }

    /**
     * Remove the target object from the array
     * @param {object} target A name/value object to be removed
     */
    remove(target) {
        let i = -1;
        while ((i = this.findIndex((item) => (item.name == target.name) && (item.value == target.value))) != -1) {
            this.splice(i, 1);
        }
    }

    /**
     * Return all names
     * @returns {array} The names
     */
    getNames() {
        const names = this.map((item, index) => {
            return item.name;
        });
        return names;
    }

    /**
     * Return all values
     * @returns {array} The values
     */
    getValues() {
        const values = this.map((item, index) => {
            return item.value;
        });
        return values;
    }

    /**
     * Find a name/value object by its unique value
     * @param {string} value The value to filter on
     * @returns {object} The name/value object, if found, otherwise undefined
     */
    findByValue(value) { // Only finds unique values
        const results = this.filter(item => item.value == value);
        if (results.length == 1)
            return results[0];
    }
}

