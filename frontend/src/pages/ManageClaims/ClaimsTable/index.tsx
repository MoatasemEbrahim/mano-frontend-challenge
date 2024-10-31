import { FC, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { IClaimRecord } from '../../../types/claim';
import { columnDefs } from './columns';

interface IClaimsTableProps {
  claims: IClaimRecord[];
  isLoading: boolean;
}

const ClaimsTable: FC<IClaimsTableProps> = ({ claims, isLoading }) => {

  const [isClaimsApproved, setIsClaimsApproved] = useState<boolean>(false);
  const gridRef = useRef(null);

  const handleApproveClick = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 0) {
      showNotification({
        title: 'Warning',
        message: 'No claims selected',
        variant: 'warning',
        color: "orange"
      })
      return;
    }
    setIsClaimsApproved(true);
  }

  const handleGenerateFilesClick = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows)
    // map records and send to BE to generate files
    // navigate to MRF files listing route on success
  }

  return (
    <div>
      <p className='text-base font-medium text-lime-800 mt-6'>Please select claims to approve:</p>
      <div className='ag-theme-quartz w-full h-[calc(100vh-380px)] sm:h-[calc(100vh-300px)] mt-1 relative'>
        {isClaimsApproved && (
          <div className='absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 blur-sm bg-gray-500 z-10'/>
        )}
        <AgGridReact
          containerStyle={isClaimsApproved ? {pointerEvents: "none"} : {}}
          ref={gridRef}
          rowData={claims}
          columnDefs={columnDefs}
          rowSelection={{ mode: "multiRow" }}
          pagination={true}
          paginationPageSize={50}
        />
      </div>
      <div className="flex gap-6 mt-4">
        {isClaimsApproved ? (
          <>
            <Button
              onClick={() => {setIsClaimsApproved(false)}}
              variant="outline"
            >
              Edit
            </Button>
            <Button
              onClick={handleGenerateFilesClick}
              disabled={false}
              color='indigo'
              rightSection={isLoading ? null : <IconPlayerPlayFilled size={14} />}
            >
              {isLoading ? 'Generating MRF...' : 'Generate MRF'}
            </Button>
          </>
        ):(
          <Button
            onClick={handleApproveClick}
            disabled={false}
            variant="light" 
            color="indigo"
          >
            Approve
          </Button>
        )}
      </div>
    </div>
  )
};

export default ClaimsTable;
