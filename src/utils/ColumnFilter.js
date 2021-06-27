import React from 'react'
import { Button, Input, Icon, Dropdown } from 'semantic-ui-react'

const ColumnFilter = ({ data, filter, toggleFilterVisibility, setFilterInput, setFilterDate }) => {

    const displayFilters = (col) => {
        if (col.filter) {

            const onClearIconClick = (name, toFrom) => {
                if (toFrom) {
                    setFilterDate(name, toFrom, '')
                } else {
                    setFilterInput(name, '')
                }
            }

            const clearIcon = (name, toFrom) => (
                <Icon link name="x" style={{ cursor: 'pointer' }}
                    onClick={() => onClearIconClick(name, toFrom)} />
            )

            if (col.filterOptions && col.filterOptions.type) {
                if (col.filterOptions.type == "date") {
                    return (
                        <div style={{ display: filter[col.field].visible ? '' : 'none' }} className="date-filter-container">
                            <span>From :</span>
                            <Input className="date-filter-input"
                                value={filter[col.field]['from'].value}
                                icon={clearIcon(col.field, 'from')} size="mini" placeholder="Filter"
                                onChange={(e) => setFilterDate(col.field, 'from', e.target.value)}
                                type="date"
                            />
                            <span>To :</span>
                            <Input className="date-filter-input"
                                value={filter[col.field]['to'].value}
                                icon={clearIcon(col.field, 'to')} size="mini" placeholder="Filter"
                                onChange={(e) => setFilterDate(col.field, 'to', e.target.value)}
                                type="date"
                            />
                        </div>
                    )
                }
            } else {
                return (
                    <Input className="filter-input" onChange={(e) => setFilterInput(col.field, e.target.value)}
                        value={filter[col.field].value} icon={clearIcon(col.field, null)}
                        type="text" size="mini" placeholder="Filter"
                    />
                )
            }

        }
        return null
    }

    return (
        <>
            <Button id={`${data.field}-filter-btn`} icon="filter" className="filter-btn"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleFilterVisibility(data.field) }}
            />
            <Dropdown closeOnBlur={false} id={`${data.field}-filter-dropdown`}
                className="filter-dropdown" multiple
                open={filter[data.field].visible}
            >
                <Dropdown.Menu>
                    <Dropdown.Menu scrolling>
                        <Dropdown.Item key={data.field}>
                            {displayFilters(data)}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ColumnFilter
