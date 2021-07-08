import React from 'react'
import ServerSideDatatable from './server-side/ServerSideDatatable';
import ClientSideDatatable from './client-side/ClientSideDatatable';
import 'semantic-ui-css/semantic.min.css';
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
    sortable,
    totalRows,
    onQueryChange = () => {}
}) => {
    return serverSide ? 
        (
            <ServerSideDatatable
                loading={loading} centered={centered} selectable={selectable}
                striped={striped} columns={columns} datasource={datasource} totalRows={totalRows}
                paginated={paginated} sortable={sortable} onQueryChange={onQueryChange}
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
