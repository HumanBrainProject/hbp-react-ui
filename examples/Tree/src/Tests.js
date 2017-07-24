import React from 'react';
import ReactDOM from 'react-dom';

import { Tree } from 'hbp-react-ui';

class ShowMe extends React.Component {
    render() {
        const data = { "value": "MBA:840", "name": "olfactory nerve", "children": [{ "value": "MBA:1016", "name": "olfactory nerve layer of main olfactory bulb" }, { "value": "MBA:21", "name": "lateral olfactory tract, general", "children": [{ "value": "MBA:665", "name": "lateral olfactory tract, body" }, { "value": "MBA:538", "name": "dorsal limb" }, { "value": "MBA:459", "name": "accessory olfactory tract" }] }, { "value": "MBA:900", "name": "anterior commissure, olfactory limb" }] };
        return (
            <div>
                <Tree
                    path={'/Category/Item'}
                    data={data}
                    onUpdateSelection={this.updateValue.bind(this)}
                    key={0}
                    ref={(childComponent) => { this.childComponent = childComponent; }}
                />
            </div>
        );
    }

    updateValue(path, value) {
        window.alert(`Component.updateValue: ${path} - ${value}`);
    }
}

ReactDOM.render(<ShowMe />, document.getElementById('react'));

