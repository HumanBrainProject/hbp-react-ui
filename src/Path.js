export default class Path {
    constructor(path) {
        try {
            this.matches = path.match(/^\/([\w-]+)(?:.*\/([\w-]+))?/); // This isn't correct
        } catch (error) {
            console.log('Path.constructor: ' + error.message);
        }
    }

    get first() {
        if (this.matches.length > 1) {
            return this.matches[1];
        }
    }

    get last() {
        if (this.matches.length > 2) {
            return this.matches[this.matches.length - 1];
        }
    }

    get length() {
        return this.matches.length - 1; // The number of path elements
    }
}

/* Needs to work for all the below i.e unit test

/SpecimenGroup/Subjects/0/Samples/0/ParcellationAtlas
/SpecimenGroup/Subjects/0/Sex
/SpecimenGroup/Subjects
/SpecimenGroup

*/