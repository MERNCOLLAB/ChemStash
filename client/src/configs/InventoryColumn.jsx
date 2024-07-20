import { GoGear } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { CiCircleMinus } from 'react-icons/ci';
import { GoLink } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';
import getTagClass from '../helpers/TagColors';

const renderFormula = (formula) => {
  return formula.map((element, index) =>
    element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
  );
};
export const inventoryColumns = (currentUser, parseInput, handleConsume, handleUpdate, handleDelete) => [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'batch',
    label: 'Batch',
  },
  {
    name: 'molecularFormula',
    label: 'Formula',
    options: { customBodyRender: (value) => renderFormula(parseInput(value)) },
  },
  {
    name: 'casNumber',
    label: 'CAS Number',
  },

  {
    name: 'purity',
    label: 'Purity',
    options: {
      filter: false,
    },
  },
  {
    name: 'location',
    label: 'Location',
    options: {
      customBodyRender: (value) => <p className={`px-1.5 py-[3px] rounded-lg ${getTagClass(value)}`}>{value}</p>,
    },
  },
  {
    name: 'brand',
    label: 'Brand',
    options: {
      filter: false,
    },
  },
  {
    name: 'supply',
    label: 'Supply',
    options: {
      customBodyRender: (value, anotherData) => {
        const rowData = anotherData.rowData;
        const updatedSupply = rowData[anotherData.columnIndex + 1];
        return <p>{`${updatedSupply} out of ${value}`}</p>;
      },
    },
  },
  {
    name: 'updatedSupply',
    label: 'Updated Supply',
    options: {
      display: false,
    },
  },
  {
    name: 'amount',
    label: 'Amount',
  },
  {
    name: 'unit',
    label: 'Unit',
  },
  {
    name: 'dateReceived',
    label: 'Date Received',
  },
  {
    name: 'expiryDate',
    label: 'Expiry Date',
  },
  {
    name: 'hazardClassification',
    label: 'Hazards',
  },
  {
    name: 'sds',
    label: 'SDS',
    options: {
      customBodyRender: (value) => (
        <div className="btn btn-sm border-none bg-white-0 hover:bg-gray0">
          <a href={value}>
            <GoLink />
          </a>
        </div>
      ),
      filter: false,
    },
  },
  {
    name: 'remarks',
    label: 'Remarks',
    options: {
      filter: false,
    },
  },
  {
    name: '_id',
    label: 'Action',
    options: {
      customBodyRender: (value) => (
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn btn-sm  border-none bg-white0 hover:bg-gray0 ">
            <GoGear />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu   shadow bg-white0 rounded-box w-52">
            <li className="flex gap-2 hover:bg-gray0">
              <p
                onClick={() => {
                  handleConsume(value);
                }}
              >
                <span>
                  <CiCircleMinus />
                </span>
                <span>Consume </span>
              </p>
            </li>
            <li className="flex gap-2 hover:bg-gray0">
              <p
                onClick={() => {
                  handleUpdate(value);
                }}
              >
                <span>
                  <CiEdit />
                </span>
                <span>Edit </span>
              </p>
            </li>
            {currentUser.role === 'chemist' ? null : (
              <li className="flex gap-2 hover:bg-gray0">
                <p
                  onClick={
                    currentUser.role === 'chemist'
                      ? null
                      : () => {
                          handleDelete(value);
                        }
                  }
                >
                  <span>
                    <MdDeleteOutline />
                  </span>
                  <span>Delete</span>
                </p>
              </li>
            )}
          </ul>
        </div>
      ),

      filter: false,
    },
  },
];
