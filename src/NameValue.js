export default class NameValue {
    constructor(name, value, key) {
        this.name = name;
        this.value = value;
        if (key) this.key = key;
    }
}

