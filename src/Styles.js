class Styles {
    constructor() {
        this.colors = [
            'rgb(174, 199, 232)',
            'rgb(255, 187, 120)',
            'rgb(152, 223, 138)',
            'rgb(255, 152, 150)',
            'rgb(197, 176, 213)',
        ];
    }
    styleBackgroundColor(i) {return  { backgroundColor: this.colors[i % this.colors.length] };}
    styleTable() {return  { display: 'table' };}
    styleRowGroup() {return  { display: 'table-row-group' };}
    styleRow() {return  { display: 'table-row' };}
    styleCell() {return  { display: 'table-cell' };}
    styleBorder() {return  { border: '1px solid #ddd' };}
    stylePanel() {return  { border: 'none', boxShadow: 'none', WebkitBoxShadow: 'none', marginBottom: '0' };}
    styleFullWidth() {return  { width: '100%', maxWidth: '100%' };}
    styleSelect() {return  { marginLeft: '20px' };}
    styleMarginBottom() {return  { marginBottom: '8px' };}
}

export default new Styles();

