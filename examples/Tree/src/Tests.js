import React from 'react';
import ReactDOM from 'react-dom';

import { Tree } from 'hbp-react-ui';

class ShowMe extends React.Component {
    render() {
        const data = { "name": "olfactory nerve", "value": "MBA:840", "children": [ { "name": "olfactory nerve layer of main olfactory bulb", "value": "MBA:1016" }, { "name": "lateral olfactory tract, general", "value": "MBA:21", "children": [ { "name": "lateral olfactory tract, body", "value": "MBA:665" }, { "name": "lateral olfactory tract, body", "value": "MBA:538" }, { "name": "lateral olfactory tract, body", "value": "MBA:459" } ] }, { "name": "anterior commissure, olfactory limb", "value": "MBA:900" } ] };
        return (
            <div>
                <Tree
                    path={'/Category/Item'}
                    data={data}
                    onUpdateSelection={this.updateSelection.bind(this)}
                />
            </div>
        );
    }

    updateSelection(path, value) {
        window.alert(`ShowMe.updateSelection: ${path} - ${value}`);
    }
}

ReactDOM.render(<ShowMe />, document.getElementById('react'));

