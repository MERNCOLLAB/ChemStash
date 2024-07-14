import { GoGear } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { GoLink } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';
import getTagClass from '../helpers/TagColors';

export const inventoryColumns = (currentUser, handleUpdate, handleDelete, parseInput, renderFormula) => [
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
    name: 'lotNumber',
    label: 'Lot Number',
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
        <div className="btn btn-sm  bg-slate-800 hover:bg-slate-700">
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
          <div tabIndex={0} role="button" className="btn btn-sm  bg-slate-800 hover:bg-slate-700 ">
            <GoGear />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu   shadow bg-slate-800 rounded-box w-52">
            <li className="flex gap-2 hover:bg-slate-700">
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
              <li className="flex gap-2 hover:bg-slate-700">
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
