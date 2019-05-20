'use strict';

function handleTableClick(event) {
    if (event.target.className == 'prop__name') {
        if (!event.target.hasAttribute('data-dir')) {
            event.target.setAttribute('data-dir', 1);
        } else {
            event.target.dataset.dir *= -1;
        }
        if (!table.hasAttribute('data-sort-by')) {
            table.setAttribute('data-sort-by', event.target.dataset.propName);
        } else {
            table.dataset.sortBy = event.target.dataset.propName;
        }
        sortTable(event.target.dataset.propName, event.target.dataset.dir);
    }


}
