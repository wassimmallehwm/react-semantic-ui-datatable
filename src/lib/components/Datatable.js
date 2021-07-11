import React, { useRef } from 'react'
import ServerSideDatatable from './server-side/ServerSideDatatable';
import ClientSideDatatable from './client-side/ClientSideDatatable';
import 'semantic-ui-css/semantic.min.css';
import './Datatable.css'
import { Grid } from 'semantic-ui-react';


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
    onQueryChange = () => { }
}) => {

    const clientSideRef = useRef();
    const serverSideRef = useRef();

    const hideAllFilters = () => {
        serverSide ?
            serverSideRef.current.hideAllFilters() :
            clientSideRef.current.hideAllFilters()
    }

    const datatable = serverSide ?
        (
            <ServerSideDatatable ref={serverSideRef}
                loading={loading} centered={centered} selectable={selectable}
                striped={striped} columns={columns} datasource={datasource} totalRows={totalRows}
                paginated={paginated} sortable={sortable} onQueryChange={onQueryChange}
            />
        ) :
        (
            <ClientSideDatatable ref={clientSideRef}
                loading={loading} centered={centered} selectable={selectable}
                striped={striped} columns={columns} datasource={datasource}
                paginated={paginated} sortable={sortable}
            />
        );
    return (
        <Grid onClick={hideAllFilters} style={{
            display: 'flex',
            height: '60vh',
            //flexDirection: `${pagination && pagination.position == 'top' ? 'column-reverse' : 'column'}`,
            flexDirection: 'column',
            width: '100%',
            borderRadius: 0,
            border: '1px solid rgba(34, 36, 38, 0.15)',
            margin: '1rem auto',
            padding: 0
        }}>
            {datatable}
        </Grid>
    )
}



export default Datatable
