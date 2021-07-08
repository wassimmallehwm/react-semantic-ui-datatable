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
                        from: {
                            value: ''
                        },
                        to: {
                            value: ''
                        }
                    }
                }
            } else {
                initFilter[col.field] = { value: '' }
            }
        }
    })
    return initFilter;
}

export const initFilterVisibility = (columns) => {
    let initFilter = {};
    columns.forEach(col => {
        if (col.filter) {
            initFilter[col.field] = { visible: false }
        }
    })
    return initFilter;
}

export const filtersDataReq = (filterData) => {
    let result = {};
    if(filterData){
        for (const [key, val] of Object.entries(filterData)) {
            let filterItem = {};
            if(val.date){
                filterItem["date"] = true;
                if(val.from.value != ""){
                    filterItem["from"] = val.from.value;
                }
                if(val.to.value != ""){
                    filterItem["to"] = val.to.value;
                }
                if(filterItem.from || filterItem.to){
                    result[key] = filterItem
                }
            } else {
                if(val.value != ""){
                    filterItem["value"] = val.value
                    result[key] = filterItem
                }
            }
        }
    }
    return result;
}

export const clientSideFilter = (data, filterData) => {
    for (const [key, val] of Object.entries(filterData)) {
        if(val.date){
            if(val.from.value != ""){
                data = data.filter(elem => elem[key] > val.from.value);
            }
            if(val.to.value != ""){
                data = data.filter(elem => elem[key] < val.to.value);
            }
        } else {
            if(val.value != ""){
                const regex = new RegExp(val.value, 'i');
                data = data.filter(elem => elem[key].match(regex));
            }
        }
    }
    return data;
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

