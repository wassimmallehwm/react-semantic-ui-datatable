import React from 'react'
import ServerSideDatatable from './server-side/ServerSideDatatable';
import ClientSideDatatable from './client-side/ClientSideDatatable';
import './Datatable.css'


const Datatable = ({
    serverSide,
    loading,
    centered,
    selectable,
    striped,
    columns,
    datasource,
    paginated,
    pagination,
    sortable,
    sort = {},
    onPageChnage = () => { },
    onLimitChnage = () => { },
    onFilterChnage = () => { },
    onSortChnage = () => { }
}) => {
    return serverSide ? 
        (
            <ServerSideDatatable
                loading={loading} centered={centered} selectable={selectable}
                striped={striped} columns={columns} datasource={datasource}
                paginated={paginated} pagination={pagination} onPageChnage={onPageChnage}
                sortable={sortable} sort={sort} onSortChnage={onSortChnage}
                onLimitChnage={onLimitChnage} onFilterChnage={onFilterChnage}
            />
        ) :
        (
            <ClientSideDatatable
                loading={loading} centered={centered} selectable={selectable}
                striped={striped} columns={columns} datasource={datasource}
                sortable paginated 
            />
        )
}

export default Datatable
