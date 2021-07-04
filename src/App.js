import { Button, Image } from 'semantic-ui-react';
import Datatable from './lib/components/Datatable';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const imageUrl = 'http://localhost:4000/public/images/products/';

  const colDefs = [
    {
      headerName: 'Image',
      field: 'image',
      customRender: true,
      style: {
        textAlign: 'center'
      },
      cellRender: (data) => {
        return (
          <Image style={{ width: '50px', height: '50px' }}  src={imageUrl + data.images[0]} avatar />
        )

      }
    },
    {
      headerName: 'Reference',
      field: 'ref',
      sortable: true,
      filter: true
    },
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
      headerName: 'Updated at',
      field: 'updatedAt',
      customRender: true,
      sortable: true,
      filter: true,
      filterOptions: {
        type: 'date'
      },
      cellRender: (data) => {
        return (
          data.updatedAt
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
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref 01",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref 02",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref 03",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref 04",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref 05",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref 06",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref 07",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref 08",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref 09",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref 10",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref 11",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref 12",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref 13",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref 14",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref_2 01",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref_2 02",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref_2 03",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref_2 04",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref_2 05",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref_2 06",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref_2 07",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref_2 08",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref_2 09",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    {
      "_id": "60b569bbe6ccce3ca086dc97",
      "images": [
        "product_1625011171146"
      ],
      "ref": "ref_2 10",
      "label": "Lord watch",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b57059e6ccce3ca086dc99",
      "images": [
        "product_1625011204142"
      ],
      "ref": "ref_2 11",
      "label": "Shirt",
      "createdAt": "2021-05-31",
      "updatedAt": "2021-06-08"
    },
    {
      "_id": "60b957829c55fb24e0e00ee8",
      "images": [
        "product_1625011218051"
      ],
      "ref": "ref_2 12",
      "label": "Samsung Galaxy S9",
      "createdAt": "2021-06-03",
      "updatedAt": "2021-06-03"
    },
    // {
    //   "_id": "60b569bbe6ccce3ca086dc97",
    //   "images": [
    //     "product_1625011171146"
    //   ],
    //   "ref": "ref_2 13",
    //   "label": "Lord watch",
    //   "createdAt": "2021-05-31",
    //   "updatedAt": "2021-06-08"
    // },
    // {
    //   "_id": "60b57059e6ccce3ca086dc99",
    //   "images": [
    //     "product_1625011204142"
    //   ],
    //   "ref": "ref_2 14",
    //   "label": "Shirt",
    //   "createdAt": "2021-05-31",
    //   "updatedAt": "2021-06-08"
    // }
  ]

  return (
    <div className="App">
      <Datatable sortable paginated columns={colDefs} datasource={datasource}/>
    </div>
  );
}

export default App;
