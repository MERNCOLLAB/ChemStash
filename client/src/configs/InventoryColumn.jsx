import { GoGear } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { GoLink } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';

export const inventoryColumns = (currentUser, handleUpdate, handleDelete, parseInput, renderFormula) => [
  {
    name: 'name',
  },
  {
    name: 'batch',
    label: 'Batch',
  },
  {
    name: 'molecularFormula',
    label: 'Molecular Formula',
    options: { customBodyRender: (value) => renderFormula(parseInput(value)) },
  },
  {
    name: 'lotNumber',
    label: 'Lot Number',
  },

  {
    name: 'purity',
    options: {
      filter: false,
    },
  },
  {
    name: 'location',
    options: {
      customBodyRender: (value) => (
        <p
          className={`capitalize px-3 py-1 inline-block rounded-full text-slate-300   ${
            value === 'Flammable Storage Cabinet'
              ? 'bg-rose-800'
              : value === 'Corrosive Storage Cabinet'
                ? 'bg-teal-800'
                : value === 'Refrigerator/Freezer'
                  ? 'bg-sky-800'
                  : value === 'General Storage Shelf'
                    ? 'bg-indigo-800'
                    : value === 'Oxidizer Storage Shelf'
                      ? 'bg-amber-800'
                      : value === 'Gas Cylinder Storage'
                        ? 'bg-slate-800'
                        : 'bg-fuchsia-800'
          }`}
        >
          {value}
        </p>
      ),
    },
  },
  {
    name: 'brand',
    options: {
      filter: false,
    },
  },
  {
    name: 'supply',
  },
  {
    name: 'amount',
  },
  {
    name: 'unit',
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
