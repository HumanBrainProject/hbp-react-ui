# hbp-react-ui
A library of useful user-interface components built with React and MobX.

They are written in ES6 and require Babel to transpile, with the following (order-sensitive) parameters:

```
    "presets": [
        "es2015",
        "react" // Transpile React components to JavaScript
    ],
    "plugins": [
        "transform-decorators-legacy",
        "transform-class-properties" // This order is important: last-to-first
    ],
```

Bootstrap is also required for styling and icon fonts.


## **Install:**

```
npm install -D hbp-react-ui
```


## **Logging:**

To enable console logging, add the following to the global namespace:
```
        <script>

        _hbp_debug_ = true; // Enable console logging for all components

        </script> 
```


## **Contents:**

* DatePicker
* DynamicList
* InputText
* Select
* Tree

The components use common styling to ensure visual compatibility e.g. height & width, between Chrome and Firefox.

Please see the detailed descriptions of the individual components below...

---

### DatePicker

A simple wrapper for ```<input type='date'/>```.

---

### DynamicList

Build a list of strings from a text selection or text input, optionally notifying a sink of updates.

Each item in the list has a button to delete itself.

Note: Uses name-value pair objects instead of primitive data types e.g.  ```{ name: 'Male', value: 'M' }```.
This allows for a human-readable display form and an alternative identifier for storage.

---

### InputText

A simple wrapper for ```<input type='text'/>```.

---

### Select

Allows an item to be selected from a list, optionally notifying a sink

Note: Uses name-value pair objects instead of primitive data types e.g.  ```{ name: 'Male', value: 'M' }```.
This allows for a human-readable display form and an alternative identifier for storage.

---

### Tree

Build a hierarchical tree with expandable/collapsible nodes. Each node consists of a name, a value and optional children. Clicking on a node notifies an event sink of the selected value.


```
import { Tree } from 'hbp-react-ui';

class ShowMe extends React.Component {
    render() {
        return (
            <div>
                <Tree
                    path={'/Category/Item'}
                    onSelect={this.onSelect.bind(this)} 
                    data={this.data}
                />
            </div>
        );
    }

    onSelect(path, node) {
        console.log(`onSelect: ${path} - {name: '${node.name}', value: '${node.value}'}`);
    }
}
```

The tree is initialised with a JSON data structure, ```data```, of the following form:
```
    {
        "name": "olfactory nerve",
        "value": "MBA:840",
        "children": [
            {
                "name": "olfactory nerve layer of main olfactory bulb",
                "value": "MBA:1016"
            },
            {
                "name": "lateral olfactory tract, general",
                "value": "MBA:21",
                "children": [
                    {
                        "name": "lateral olfactory tract, body",
                        "value": "MBA:665"
                    }
                ]
            },
            {
                "name": "anterior commissure, olfactory limb",
                "value": "MBA:900"
            }
        ]
    }, etc...
```

The component recurses down the structure, creating ```<ul>```'s with ```<li>```'s. Each ```<li>``` contains an ```<a>``` and optionally another child ```<ul>```.



---

![](https://www.humanbrainproject.eu/static/img/HBP_logo.svg)
