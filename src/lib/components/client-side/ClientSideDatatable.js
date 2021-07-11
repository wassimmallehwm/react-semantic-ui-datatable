import React, { useEffect, useState } from 'react'
import { Pagination, Grid, Table, Segment, Dimmer, Loader, Icon, Dropdown } from 'semantic-ui-react';
import NoData from '../../utils/NoData';
import Tooltip from '../../utils/Tooltip'
import { clientSideFilter, dropdownLimitOptions, getSortData, initFilter, initFilterVisibility, sortDirection } from '../../utils/index';
import ColumnFilter from '../../utils/ColumnFilter';


const ClientSideDatatable = ({
    loading = false,
    centered = false,
    selectable = true,
    striped = true,
    columns,
    datasource,
    paginated = false,
    limiRows = ['10', '15','25'],
    sortable = false
}) => {

    const [filter, setFilter] = useState(initFilter(columns))
    const [filterVisibility, setFilterVisibility] = useState(initFilterVisibility(columns))
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: (datasource.length / 10) + 1,
        total: datasource.length
    })

    const [sort, setSort] = useState({
        sortField: null,
        sortDir: null
    })

    const [filterData, setFilterData] = useState(null)

    const [displayDatasource, setDisplayDatasource] = useState(null);

    const dynamicSort = () => {
        return function (a,b) {
            var result = (a[sort.sortField] < b[sort.sortField]) ? -1 : (a[sort.sortField] > b[sort.sortField]) ? 1 : 0;
            return result * sort.sortDir;
        }
    }

    const formatDatasource = () => {
        let paginatedDatasource = [...datasource];
        if(filterData){
            paginatedDatasource = clientSideFilter(paginatedDatasource, filterData)
        }
        if(sort.sortField && sort.sortDir){
            paginatedDatasource.sort(dynamicSort());
        }
        paginatedDatasource = paginatedDatasource.slice(
            (pagination.page-1) * pagination.limit,
            (pagination.page) * pagination.limit
        )
        // setPagination(prev => ({
        //     ...prev,
        //     totalPages: Math.round(paginatedDatasource.length / prev.limit),
        //     total: paginatedDatasource.length
        // }))
        setDisplayDatasource(paginatedDatasource)
    }

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            totalPages: Math.round(datasource.length / prev.limit)
        }))
    }, [])

    useEffect(() => {
        formatDatasource()
    }, [pagination, sort, filterData])

    const onPageChnage = (page) => {
        setPagination({
            ...pagination,
            page: Math.round(page)
        })
    }
    const onSortChnage = (column, direction) => {
        if(direction == null){
            column = null
        }
        setSort({
            sortField: column,
            sortDir: direction
        })
    }

    const onLimitChnage = (value) => {
        setPagination({
            ...pagination,
            limit: value,
            totalPages: Math.round(datasource.length / value),
            page: 1
        })
    }

    const onFilterChnage = (data) => {
        setFilterData(data)
        setPagination({
            ...pagination,
            page: 1
        })
    }

    const setFilterInput = (field, value) => {
        const aux = filter[field];
        if (aux.value != value) {
            aux.value = value
            onFilterChnage({ ...filter, [field]: aux })
            setFilter({ ...filter, [field]: aux })
        }

    }

    const setFilterDate = (field, fromTo, value) => {
        const aux = filter[field];
        if (aux[fromTo].value != value) {
            aux[fromTo].value = value
            onFilterChnage({ ...filter, [field]: aux })
            setFilter({ ...filter, [field]: aux })
        }
    }

    const toggleFilterVisibility = (field) => {
        setFilterVisibility(prev => {
            const aux = prev[field];
            aux.visible = !aux.visible
            return { ...filterVisibility, [field]: aux }
        })
    }

    const hideAllFilters = () => {
        let result = {};
        for (const [key, value] of Object.entries(filter)) {
            result[key] = { ...value, visible: false }
        }
        setFilterVisibility(result)
    }

    const paginationState = {
        boundaryRange: 0,
        siblingRange: 0,
        showEllipsis: false
    }

    const {
        boundaryRange,
        siblingRange,
        showEllipsis
    } = paginationState;

    const Loading = (
        <Segment style={{ width: '100%', display: 'contents' }}>
            <Dimmer style={{ height: '50vh', border: 'none' }} active inverted>
                <Loader inline='centered' size='large' inverted>Loading</Loader>
            </Dimmer>
        </Segment>
    )

    const handlePaginationChange = (e, { activePage }) => {
        onPageChnage(activePage)
    }

    const paginationItem = (label, iconName) => {
        return {
            content: <Tooltip content={label}><Icon name={iconName} /></Tooltip>,
            icon: true
        }
    }
    const handleLimitChange = (e, { value }) => {
        onLimitChnage(value)
    }

    const paginationPanel = (
        paginated && pagination && 
        <Grid.Row style={{
            border: '1px solid rgba(34,36,38,.15)',
            borderTop: 'none',
            flex: 1
        }}>
            <div style={{ 
                width: '100%',
                textAlign: pagination && pagination.align ? pagination.align : 'right',
                margin: '0.2rem' 
            }}>
                <span>
                    <strong>
                        {` ${(pagination.page * pagination.limit - pagination.limit) + 1} `}
                    </strong>
                    <span>to</span>
                    <strong>
                        {
                        pagination.page * pagination.limit <= datasource.length ?
                            ` ${pagination.page * pagination.limit} ` :
                            ` ${datasource.length} `
                        }
                    </strong>
                    <span>of</span>
                    <strong>
                        {` ${pagination.total} `}
                    </strong>
                </span>
                <Dropdown className="limit-dropdown"
                    options={dropdownLimitOptions(limiRows)}
                    value={pagination.limit}
                    onChange={handleLimitChange}
                />
                <Pagination
                    pointing
                    secondary
                    activePage={pagination.page}
                    boundaryRange={boundaryRange}
                    onPageChange={handlePaginationChange}
                    siblingRange={siblingRange}
                    totalPages={pagination.totalPages}
                    // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                    ellipsisItem={showEllipsis ? undefined : null}
                    firstItem={paginationItem('First page', 'angle double left')}
                    lastItem={paginationItem('Last page', 'angle double right')}
                    prevItem={paginationItem('Prev page', 'angle left')}
                    nextItem={paginationItem('Next page', 'angle right')}
                />
            </div>
        </Grid.Row>
    )

    const dataTable = (
        <Grid.Row style={{
            overflow: 'auto',
            padding: 0,
            margin: 0,
            borderRadius: 0,
            flex: 8,
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderBottom: 'none'
        }}>
            <Table style={{ height: "fit-content", border: 'none', borderRadius: 0, textAlign: centered ? 'center' : '' }}
                selectable={selectable} striped={striped} sortable={sortable} celled
            >
                <Table.Header>
                    <Table.Row>
                        {
                            columns && columns.map(
                                col =>
                                    <Table.HeaderCell
                                        key={col.field}
                                        style={{ position: 'relative', ...col.style ? col.style : null }}
                                        sorted={sortable && sort && sort.sortField === col.field && col.sortable ? getSortData(sort.sortDir) : null}
                                        onClick={() => sortable && col.sortable && onSortChnage(col.field, sortDirection(sort, col.field))}
                                    >
                                        {col.headerName}
                                        {col.filter &&
                                            <ColumnFilter data={col} filter={filter} filterVisibility={filterVisibility} 
                                                toggleFilterVisibility={toggleFilterVisibility}
                                                setFilterInput={setFilterInput} setFilterDate={setFilterDate}
                                            />
                                        }
                                    </Table.HeaderCell>
                            )
                        }
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        displayDatasource && !loading ?
                            displayDatasource.length > 0 ?
                                displayDatasource.map((data, i) => (
                                    <Table.Row key={i}>
                                        {
                                            columns && columns.map(
                                                col =>
                                                    <Table.Cell className={col.className ? col.className : ''}
                                                        style={col.style ? col.style : null}
                                                    >
                                                        {
                                                            col.customRender ?
                                                                col.cellRender(data)
                                                                :
                                                                (data[col.field])
                                                        }
                                                    </Table.Cell>
                                            )
                                        }
                                    </Table.Row>
                                ))
                                :
                                <Table.Row>
                                    <Table.Cell colSpan={columns.length}>
                                        <NoData />
                                    </Table.Cell>
                                </Table.Row>
                            :
                            Loading
                    }
                </Table.Body>
            </Table>
        </Grid.Row>
    )


    return (
        <Grid onClick={hideAllFilters} style={{
            display: 'flex',
            height: '80vh',
            flexDirection: `${pagination && pagination.position == 'top' ? 'column-reverse' : 'column'}`,
            width: '100%',
            borderRadius: 0,
            margin: '1rem auto',
            padding: 0 
        }}>
            {dataTable}
            {pagination && paginationPanel}
        </Grid>
    )
}

export default ClientSideDatatable
