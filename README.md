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

## **Contents:**

* Tree

Please see the detailed descriptions of the individual components below...

---

### Tree

Build a hierarchical tree with expandable/collapsible nodes. Each node consists of a name, a value and optional children. Clicking on a node notifies an optional event sink of the selected value.

The tree is initialised with a JSON data structure of the form:
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
                    },
                    {
                        "name": "lateral olfactory tract, body",
                        "value": "MBA:538"
                    },
                    {
                        "name": "lateral olfactory tract, body",
                        "value": "MBA:459"
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

![Tree](https://github.com/HumanBrainProject/hbp-react-ui/blob/master/images/tree.png)

---

![](https://www.humanbrainproject.eu/static/img/HBP_logo.svg)
