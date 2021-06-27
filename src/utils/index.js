export const onSortDataTable = ({sortField, sortDir}, column, callback) => {
    let direction = null;
    let sortCol = column
    if(column == sortField){
        if(sortDir == null){
            direction = 1;
        } else if(sortDir == 1){
            direction = -1;
        } else{
            direction = null;
            sortCol = null;
        }
    } else {
        direction = 1;
    }
    callback(sortCol, direction)
}

export const sortDirection = ({sortField, sortDir}, column) => {
    let direction = null;
    let sortCol = column
    if(column == sortField){
        if(sortDir == null){
            direction = 1;
        } else if(sortDir == 1){
            direction = -1;
        } else{
            direction = null;
            sortCol = null;
        }
    } else {
        direction = 1;
    }
    return direction
}

export const initFilter = (columns) => {
    let initFilter = {};
    columns.forEach(col => {
        if (col.filter) {
            if (col.filterOptions) {
                if (col.filterOptions.type == 'date') {
                    initFilter[col.field] = {
                        date: true,
                        visible: false,
                        from: {
                            value: ''
                        },
                        to: {
                            value: ''
                        }
                    }
                }
            } else {
                initFilter[col.field] = { visible: false, value: '' }
            }
        }
    })
    return initFilter;
}

export const getSortData = (dir) => {
    if (dir) {
        if (
            dir == 1 ||
            dir.toString().toLowerCase() == 'asc' ||
            dir.toString().toLowerCase() == 'ascending'
        ) {
            return 'ascending';
        } else
            if (dir == -1 ||
                dir.toString().toLowerCase() == 'desc' ||
                dir.toString().toLowerCase() == 'descending'
            ) {
                return 'descending';
            }
    }
    return null;
}

export const dropdownLimitOptions = (limiRows) => {
    let result = []
    limiRows.forEach(elem => {
        result.push({ value: parseInt(elem.toString(), 10), text: elem.toString() })
    })
    return result;
}

