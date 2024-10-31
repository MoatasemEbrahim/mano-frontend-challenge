import { useCallback, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { listMRF } from '../services/claim';

export const useGetMRFFiles = () => {
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);

  const getFiles = useCallback(async () =>{
    setIsLoadingFiles(true);
    try {
      const response = await listMRF();
      const data = await response.json();
      setIsLoadingFiles(false);
      return data;
    } catch (e) {
      setIsLoadingFiles(false);
      showNotification({
        title: 'Error',
        message: 'Failed to load MRF files',
        variant: 'error',
        color: "red",
        autoClose: 2000,
      })
      return [];
    };
  },[]);

  return {
    getFiles,
    loading: isLoadingFiles,
  }
}
