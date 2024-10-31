import { useState, useEffect, useCallback, useMemo } from 'react'
import { useGetMRFFiles } from '~/hooks/useListMRFFiles';
import { Table } from '@mantine/core';

const ListMRFFiles = () => {
  const [files, setFiles] = useState<Record<string,string>[]>([]);
  const { getFiles, loading } = useGetMRFFiles();
  
  const fetchFiles = useCallback(async () => {
    const result = await getFiles();
    setFiles(result.data);
  },[getFiles]);

  useEffect(() => {
    fetchFiles();
  },[fetchFiles])

  const rows = useMemo(() => files.map((file) => (
    <tr key={file.title}>
      <td>{file.title}</td>
      <td>{file.data[0]["Claim Type"]}</td>
    </tr>
  )),[files]);

  return (
    <div>
      <p className='text-xl'>MRF Files:</p>
      <div className='mt-6'>
        {loading ? (
          <p>Loading...</p>
        ):( // TODO(enhancement): convert nested ternary operator to a function outside the JSX for better readability.
          files.length > 0 ? (
            <div className='max-w-5xl bg-slate-100 p-4 rounded-md'>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th className='text-start'>File</th>
                    <th className='text-start'>Claim Type</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
            ):(
              <p>No MRF files found</p>
            )
        )
      }
      </div>
    </div>
  )
}

export default ListMRFFiles;
