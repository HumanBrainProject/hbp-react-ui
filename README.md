# hbp-react-ui
A library of useful user-interface components built with React and MobX.

**Contents:**

* Tree

...please see the detailed descriptions below...

---

## Tree

Build a hierarchical tree with expandable/collapsible nodes. Each node consists of a name, a value and optional children. Clicking on a node notifies an optional event sink of the selected value.

The tree is initialised with a JSON data structure of the form:
```
    {
        "ontology": "MBA:840",
        "label": "olfactory nerve",
        "children": [
            {
                "ontology": "MBA:1016",
                "label": "olfactory nerve layer of main olfactory bulb"
            },
            {
                "ontology": "MBA:21",
                "label": "lateral olfactory tract, general",
                "children": [
                    {
                        "ontology": "MBA:665",
                        "label": "lateral olfactory tract, body"
                    },
                    {
                        "ontology": "MBA:538",
                        "label": "dorsal limb"
                    },
                    {
                        "ontology": "MBA:459",
                        "label": "accessory olfactory tract"
                    }
                ]
            },
            {
                "ontology": "MBA:900",
                "label": "anterior commissure, olfactory limb"
            }
        ]
    }, etc...
```

The component recurses down the structure, creating ```<ul>```'s with ```<li>```'s. Each ```<li>``` contains an ```<a>``` and optionally another child ```<ul>```.

![Tree](https://github.com/HumanBrainProject/hbp-react-ui/blob/master/images/tree.png)

---

![](https://www.humanbrainproject.eu/static/img/HBP_logo.svg)
