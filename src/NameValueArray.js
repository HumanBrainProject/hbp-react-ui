import { observable, isObservableArray } from 'mobx';

import NameValue from './NameValue';

export default class NameValueArray {
    constructor(array) {
        if (typeof(array) == 'undefined') {
            this.items = observable(new Array()); // Create a new one
        } else {
            this.items = observable(array); // Wrap an existing one
        }
    }

    add(name, value, key) {
        this.items.push(new NameValue(name, value, key));
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
        while ((i = this.items.findIndex((item) => (item.name == object.name) && (item.value == object.value))) != -1) {
            this.items.splice(i, 1);
        }
    }

    getNames() {
        const names = this.items.map((item, index) => {
            return item.name;
        });
        return names;
    }

    getValues() {
        const values = this.items.map((item, index) => {
            return item.value;
        });
        return values;
    }

    findByValue(value) { // Only finds unique values
        const results = this.items.filter(item => item.value == value);
        if (results.length == 1)
            return results[0];
    }
}

