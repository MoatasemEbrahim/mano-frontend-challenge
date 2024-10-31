import { useCallback, useState } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useParseClaims } from './useParseClaims';
import { useValidateClaims } from './useValidateClaims';
import { IClaimRecord } from '../types/claim';


export const useUploadClaims = () => {
  const [uploadedClaims, setUploadedClaims] = useState<IClaimRecord[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { parseClaims } = useParseClaims();
  const { validateClaims } = useValidateClaims();

  const uploadClaims = useCallback(async(claimsFile: File) => {
    setIsUploading(true);
    showNotification({
      id: "load-data",
      title: 'Loading...',
      message: 'Analysing claims records',
    });
    try {
      const parsingResult = await parseClaims(claimsFile);
      if (parsingResult.errors.length > 0 ) {
        setErrors(parsingResult.errors);
        setIsUploading(false);
        return;
      }
      const validationResult = validateClaims(parsingResult.data);
      if (validationResult.errors.length > 0 ) {
        setErrors(validationResult.errors);
        setIsUploading(false);
        return;
      }
      setUploadedClaims(validationResult.data);
      setErrors([]);
      updateNotification({
        id: 'load-data',
        color: 'teal',
        title: 'Success',
        message: 'File was uploaded successfully',
        icon: <IconCheck size="14px" />,
        autoClose: 2000,
      })
    } catch (error) {
      setErrors([error?.message ?? "Failed to parse claims file"])
    }
    setIsUploading(false);
  }, [parseClaims, validateClaims])

  return {
    uploadedClaims,
    errors,
    isUploading,
    uploadClaims,
  }
};
