///////////////////////////////////////////////////////////
// File        : Store.js
// Description : 
/**
 * Store is an abstract class that asynchronously queries an endpoint. To use this functionality, derive a class that provides a 'URL' property.
 * @class Store
 * @property {string} endpointURL The GET endpoint to retrieve the data
 */

// Imports : 

import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Class Definition
export default
class Store {
// Attributes
    URL;
    data;

// Constructor
    constructor(endpointURL) {
        this.URL = endpointURL;
    }


// Operations
    queryData(updateObserver) {
        if (typeof(_hbp_debug_) != 'undefined') console.log('Store.queryData');
        try {
            if (typeof(_hbp_debug_) != 'undefined') console.log('XHR(GET) Request: ' + this.URL);
            axios.get(this.URL) // Will do the request asynchronously so that the UI is still responsive
                .then(function (response) {
                    if (typeof(_hbp_debug_) != 'undefined') console.log('XHR(GET) Succeeded: ' + response.status.toString());
                    this.data = response.data;
                    updateObserver();
                }.bind(this)) // Needs to be bound otherwise 'this' is undefined // Change to 'arrow' syntax to do this automatically
                .catch(function (error) {
                    console.log('XHR(GET) Failed: ' + error);
                }.bind(this));
        } catch (error) {
            console.log('Store.queryData: ' + error.message);
        }
    }


}

// Exports

