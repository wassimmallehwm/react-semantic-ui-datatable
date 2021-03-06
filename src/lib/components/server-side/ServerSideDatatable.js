import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Pagination, Grid, Table, Segment, Dimmer, Loader, Icon, Dropdown } from 'semantic-ui-react';
import NoData from '../../utils/NoData';
import Tooltip from '../../utils/Tooltip'
import { dropdownLimitOptions, getSortData, initFilter, filtersDataReq, sortDirection, initFilterVisibility } from '../../utils';
import ColumnFilter from '../../utils/ColumnFilter';


const ServerSideDatatable = forwardRef(({
    loading = false,
    centered = false,
    selectable = true,
    striped = true,
    columns,
    datasource,
    paginated = false,
    limiRows = ['10', '15','25'],
    totalRows = 10,
    sortable = false,
    onQueryChange = () => {}
}, ref ) => {

    const [filter, setFilter] = useState(initFilter(columns))
    const [filterVisibility, setFilterVisibility] = useState(initFilterVisibility(columns))
    

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: totalRows
    })

    const {
        page,
        limit,
        total
    } = pagination;

    const [sortData, setSortData] = useState({
        sortField: null,
        sortDir: null
    })

    const {
        sortField,
        sortDir
    } = sortData;

    useEffect(() => {
        onQueryChange({
            pagination,
            sortData,
            filterData: filtersDataReq(filter)
        });
    }, [page, limit, sortData, filter])

    const onPageChnage = (page) => {
        setPagination({
            ...pagination,
            page: page
        })
    }
    

    const onSortChnage = (column, direction) => {
        setSortData({
            sortField: column,
            sortDir: direction
        })
    }

    const onLimitChnage = (value) => {
        setPagination({
            ...pagination,
            limit: value,
            page: 1
        })
    }

    const onFilterChnage = (data) => {
        setFilter(data)
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
    
    useImperativeHandle(ref, () => ({
        hideAllFilters: () => {
            let result = {};
            for (const [key, value] of Object.entries(filter)) {
                result[key] = { visible: false }
            }
            setFilterVisibility(result)
        }
      }));

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
            border: 'none',
            borderTop: '1px solid rgba(34,36,38,.15)',
            flex: 1,
            padding: 0
        }}>
            <div style={{ 
                width: '100%',
                textAlign: pagination && pagination.align ? pagination.align : 'right',
                margin: '0.2rem' 
            }}>
                <span>
                    <strong>
                        {` ${(page * limit - limit) + 1} `}
                    </strong>
                    <span>to</span>
                    <strong>
                        {` ${(page * limit) - limit + datasource.length} `}
                    </strong>
                    <span>of</span>
                    <strong>
                        {` ${totalRows} `}
                    </strong>
                </span>
                <Dropdown className="limit-dropdown"
                    options={dropdownLimitOptions(limiRows)}
                    value={limit}
                    onChange={handleLimitChange}
                />
                <Pagination
                    pointing
                    secondary
                    activePage={pagination.page}
                    boundaryRange={boundaryRange}
                    onPageChange={handlePaginationChange}
                    siblingRange={siblingRange}
                    totalPages={Math.ceil(totalRows / limit)}
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
            border: 'none'
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
                                        sorted={sortable && sortField && sortField === col.field && col.sortable ? getSortData(sortDir) : null}
                                        onClick={() => sortable && col.sortable && onSortChnage(col.field, sortDirection({sortField, sortDir}, col.field))}
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
                        datasource && !loading ?
                            datasource.length > 0 ?
                                datasource.map(data => (
                                    <Table.Row key={data._id}>
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
        <>
            {dataTable}
            {paginated == true && paginationPanel}
        </>
    )
})

export default ServerSideDatatable
