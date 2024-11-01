import { useCallback, useState } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { IClaimRecord } from '../types/claim';
import { useNavigate } from "react-router-dom";
import { createMRF } from '../services/claim';

export const useGenerateMRFFiles = () => {
  const [isGeneratingFiles, setIsGeneratingFiles] = useState<boolean>(false);
  const navigate = useNavigate();

  const generateFiles = useCallback(async (selectedRows: IClaimRecord[]) =>{
    setIsGeneratingFiles(true);
    showNotification({
      id: "generateFiles",
      title: 'Generating MRF files',
      message: 'Please wait while your MRF files are generated',
      variant:'success',
      loading: true,
      autoClose: 10 * 1000,
    });
    try {
      await createMRF(selectedRows);
      updateNotification({
        id: "generateFiles",
        title: 'Success',
        message: 'MRF files were generated successfully',
        icon: <IconCheck size="1rem" />,
        loading: false,
        autoClose: 2000,
      })
      navigate("/mrf-files");

    } catch {
      updateNotification({
        id: "generateFiles",
        title: 'Error',
        message: 'Failed to generate MRF files',
        variant: 'error',
        color: "red",
        loading: false,
        autoClose: 2000,
      })
    };
    setIsGeneratingFiles(false);
  },[navigate]);

  return {
    generateFiles,
    loading: isGeneratingFiles,
  }
}
