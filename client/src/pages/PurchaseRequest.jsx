import { MTable } from '../components';

const lists = [
  {
    _id: '1',
    item: 'Acetone',
    quantity: '5',
    unit: 'L',
    supplier: 'Sigma-Aldrich',
    dateReceived: '2023/06/21',
    status:
      'Pending to Team leader || Approved by Team Leader || Pending to Manager || Approved by Manager || Pending to Order || Orderd',
  },
  {
    _id: '2',
    item: 'Ethanol',
    quantity: '10',
    unit: 'L',
    supplier: 'Fisher Scientific',
    dateReceived: '2023/06/19',
    status: 'Pending to Team leader',
  },
  {
    _id: '3',
    item: 'Methanol',
    quantity: '8',
    unit: 'L',
    supplier: 'VWR',
    dateReceived: '2023/06/15',
    status: 'Pending to Team leader',
  },
  {
    _id: '3',
    item: 'Chemical X',
    quantity: '8',
    unit: 'L',
    supplier: 'VWR',
    dateReceived: '2023/06/15',
    status: 'Pending to Team leader',
  },
  {
    _id: '3',
    item: 'Chemical ABC',
    quantity: '78',
    unit: 'L',
    supplier: 'VWR',
    dateReceived: '2023/06/15',
    status: 'Pending to Team leader',
  },
];

const columns = [
  {
    name: 'item',
    label: 'Item',
  },
  {
    name: 'status',
    label: 'Status',
  },
  {
    name: 'quantity',
    label: 'Quantity',
  },
  {
    name: 'unit',
    label: 'Unit',
  },
  {
    name: 'supplier',
    label: 'Supplier',
  },
  {
    name: 'dateReceived',
    label: 'Date Received',
  },

  {
    name: '_id',
    label: 'Action',
    options: {
      customBodyRender: (value) => (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm bg-slate-800 hover:bg-slate-700">
            Action
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-slate-800 rounded-box w-52">
            <li className="flex gap-2 hover:bg-slate-700">
              <p onClick={() => console.log('Edit', value)}>
                <span>Edit</span>
              </p>
            </li>
            <li className="flex gap-2 hover:bg-slate-700">
              <p onClick={() => console.log('Delete', value)}>
                <span>Delete</span>
              </p>
            </li>
          </ul>
        </div>
      ),
      filter: false,
    },
  },
];

const options = {
  selectableRows: 'none',
  elevation: 0,
  rowsPerPage: 12,
  rowsPerPageOptions: [12, 20, 30],
};

function PurchaseRequest() {
  return <MTable className="text-slate-300" data={lists} columns={columns} options={options} />;
}

export default PurchaseRequest;
