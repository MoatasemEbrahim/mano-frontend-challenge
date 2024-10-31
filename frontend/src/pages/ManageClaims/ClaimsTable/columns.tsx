import { ColDef } from 'ag-grid-community';
import { IconTrashX } from '@tabler/icons-react';
import { IClaimRecord } from '../../../types/claim';

// TODO(enhancement): use cellRenderers to:
// 1. display cells like "billed" and "status" in a better display (toggle, chip, etc...
// 2. render editing cells with proper components like a dropdown for status, etc...
export const columnDefs: ColDef<IClaimRecord>[] = [
  { headerName: 'Claim ID', field: 'Claim ID', sortable: true, filter: true, editable: true },
  { headerName: 'Claim Status', field: 'Claim Status', minWidth: 100, sortable: true, filter: true, editable: true },
  { headerName: 'Allowed', field: 'Allowed', sortable: true, filter: true, editable: true },
  { headerName: 'Billed', field: 'Billed', sortable: true, filter: 'agNumberColumnFilter', editable: true },
  { headerName: 'Paid', field: 'Paid', sortable: true, filter: 'agDateColumnFilter', editable: true },
  { headerName: 'Provider ID', field: 'Provider ID', sortable: true, filter: true, editable: true },
  { headerName: 'Provider Name', field: 'Provider Name', sortable: true, filter: true, editable: true },
  { headerName: 'Subscriber ID', field: 'Subscriber ID', sortable: true, filter: true, editable: true },
  { headerName: 'Member Sequence', field: 'Member Sequence', sortable: true, filter: "agNumberColumnFilter", editable: true },
  { headerName: 'Payment Status Date', field: 'Payment Status Date', sortable: true, filter: "agDateColumnFilter", editable: true },
  { headerName: 'Service Date', field: 'Service Date', sortable: true, filter: "agDateColumnFilter", editable: true },
  { headerName: 'Received Date', field: 'Received Date', sortable: true, filter: "agDateColumnFilter", editable: true },
  { headerName: 'Entry Date', field: 'Entry Date', sortable: true, filter: "agDateColumnFilter", editable: true },
  { headerName: 'Processed Date', field: 'Processed Date', sortable: true, filter: "agDateColumnFilter", editable: true },
  { headerName: 'Paid Date', field: 'Paid Date', sortable: true, filter: true, editable: true },
  { headerName: 'Payment Status', field: 'Payment Status', sortable: true, filter: true, editable: true },
  { headerName: 'Group Name', field: 'Group Name', sortable: true, filter: true, editable: true },
  { headerName: 'Group ID', field: 'Group ID', sortable: true, filter: true, editable: true },
  { headerName: 'Division Name', field: 'Division Name', sortable: true, filter: true, editable: true },
  { headerName: 'Division ID', field: 'Division ID', sortable: true, filter: true, editable: true },
  { headerName: 'Plan', field: 'Plan', sortable: true, filter: true, editable: true },
  { headerName: 'Plan ID', field: 'Plan ID', sortable: true, filter: true, editable: true },
  { headerName: 'Place of Service', field: 'Place of Service', sortable: true, filter: true, editable: true },
  { headerName: 'Claim Type', field: 'Claim Type', sortable: true, filter: true, editable: true },
  { headerName: 'Procedure Code', field: 'Procedure Code', sortable: true, filter: true, editable: true },
  { headerName: 'Member Gender', field: 'Member Gender', sortable: true, filter: true, editable: true },
  {
    headerName: 'Actions',
    width: 80,
    cellRenderer: (params) => (
      <button onClick={() => params.api.applyTransaction({ remove: [params.data] })}><IconTrashX size={20} /></button>
    ),
  },
];