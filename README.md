# react-semantic-ui-datatable

React datatable using semantic-ui library.

![alt text](/utils/screenshot.jpg?raw=true "Datatable")

## Columns definition
<table>
  <tr>
    <th>Attribute</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>headerName</td>
    <td>--</td>
    <td>The name of the column in the tbale header</td>
  </tr>
  <tr>
    <td>field</td>
    <td>--</td>
    <td>The name of attribute/field in the datasource</td>
  </tr>
  <tr>
    <td>sortable</td>
    <td>false</td>
    <td>The cell/column will be sortable</td>
  </tr>
  <tr>
    <td>filter</td>
    <td>false</td>
    <td>The cell/column will be filterable</td>
  </tr>
  <tr>
    <td>style</td>
    <td>--</td>
    <td>You can write your custom design to each cell</td>
  </tr>
  <tr>
    <td>filterOptions</td>
    <td>--</td>
    <td>
    You can change the filter type to date to display a datepicker :
    <pre lang="javascript">filterOptions: {
      type: 'date'
    }</pre>
    </td>
  </tr>
  <tr>
    <td>customRender</td>
    <td>false</td>
    <td> Defines weither the cell will display a text or a custom element</td>
  </tr>
  <tr>
    <td>cellRender</td>
    <td>--</td>
    <td>
    The element that will be displayed if <code>customRender: true</code>
    <pre lang="javascript">cellRender: (data) => {
      return (
          data.field
      )
    }</pre>
    </td>
  </tr>
</table>

## Datatable
<table>
  <tr>
    <th>Attribute</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>serverSide</td>
    <td>false</td>
    <td>The data will be fetched from server</td>
  </tr>
  <tr>
    <td>columns</td>
    <td>--</td>
    <td>The columns of the datatable (array of objects)</td>
  </tr>
  <tr>
    <td>datasource</td>
    <td>--</td>
    <td>the data of the datatable (array of objects)</td>
  </tr>
  <tr>
    <td>loading</td>
    <td>false</td>
    <td>Display loader while fetching data</td>
  </tr>
  <tr>
    <td>centered</td>
    <td>false</td>
    <td>Centered columns/cells</td>
  </tr>
  <tr>
    <td>striped</td>
    <td>true</td>
    <td>Display striped rows</td>
  </tr>
  <tr>
    <td>paginated</td>
    <td>false</td>
    <td>Display pagination panel</td>
  </tr>
  <tr>
    <td>sortable</td>
    <td>false</td>
    <td>Sortable datatable</td>
  </tr>
  <tr>
    <td>limiRows</td>
    <td><code>['10', '15','25']</code></td>
    <td>Limit rows displayed with pagination</td>
  </tr>
  <tr>
    <td>totalRows</td>
    <td><code>--</code></td>
    <td>Total data count</td>
  </tr>
  <tr>
    <td>onQueryChange</td>
    <td><code>(data) => {}</code></td>
    <td>listener methode for pagination, limit, sort and filters changes.
      <p>data param example: </p>
    <pre lang="javascript">
filterData: {
  createdAt: {
    date: true,
    from: "",
    to: ""
  },
  label: {
    value: ""
  }
  },
  pagination: {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 0,
  },
  sortData: {
    sortDir: 1,
    sortField: "label",
  }
    </pre>
    </td>
  </tr>
</table>


## Client side datasource example

```ruby
import { Datatable } from 'react-semantic-ui-datatable';

function App() {
  const colDefs = [
      {
        headerName: 'Label',
        field: 'label',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Created at',
        field: 'createdAt',
        customRender: true,
        sortable: true,
        filter: true,
        filterOptions: {
          type: 'date'
        },
        cellRender: (data) => {
          return (
            data.createdAt
          )
        }
      },
      {
        headerName: 'Actions',
        field: 'actions',
        className: 'actions-cell',
        customRender: true,
        style: {
          minWidth: "120px",
          textAlign: 'center'
        },
        cellRender: (data) => {
          return (
            <>
              <Button className="action-btn" onClick={() => console.log(data._id)} circular primary icon='edit' />
              <Button className="action-btn" onClick={() => console.log(data._id)} circular negative icon='trash' />
            </>
          )
        }
      }
    ]

    const datasource = [
      {
        "_id": "60b569bbe6ccce3ca086dc97",
        "label": "Lord watch",
        "createdAt": "2021-05-31",
      },
      {
        "_id": "60b57059e6ccce3ca086dc99",
        "label": "Shirt",
        "createdAt": "2021-05-31",
      },
      {
        "_id": "60b957829c55fb24e0e00ee8",
        "label": "Samsung Galaxy S9",
        "createdAt": "2021-06-03"
      }
    ]

    return (
      <Datatable sortable paginated columns={colDefs} datasource={datasource}/>
    );
}
```

## Server side datasource example

```ruby
import { Datatable } from 'react-semantic-ui-datatable';

function App() {
  const colDefs = [
      {
        headerName: 'Label',
        field: 'label',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Created at',
        field: 'createdAt',
        customRender: true,
        sortable: true,
        filter: true,
        filterOptions: {
          type: 'date'
        },
        cellRender: (data) => {
          return (
            data.createdAt
          )
        }
      },
      {
        headerName: 'Actions',
        field: 'actions',
        className: 'actions-cell',
        customRender: true,
        style: {
          minWidth: "120px",
          textAlign: 'center'
        },
        cellRender: (data) => {
          return (
            <>
              <Button className="action-btn" onClick={() => console.log(data._id)} circular primary icon='edit' />
              <Button className="action-btn" onClick={() => console.log(data._id)} circular negative icon='trash' />
            </>
          )
        }
      }
    ]

    const getServerSideData = (data) => {
      //get data from server
      setDatasource(result)
    }


    return (
      <Datatable serverSide onQueryChange={getServerSideData}
        columns={colDefs} totalRows={totalRows} datasource={datasource}
        paginated sortable
      />
    );
}
```