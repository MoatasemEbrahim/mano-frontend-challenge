import { useCallback, useState } from 'react';
import { useParseClaims } from './useParseClaims';
import { useValidateClaims } from './useValidateClaims';

export const useUploadClaims = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { parseClaims } = useParseClaims();
  const { validateClaims } = useValidateClaims();

  const uploadClaims = useCallback(async(claimsFile: File) => {
    setIsUploading(true);
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
      // TODO: Display validationResult.data in Ag-Grid
    } catch (error) {
      setErrors([error.message ?? "Failed to parse claims file"])
    }
    setIsUploading(false);
  }, [parseClaims, validateClaims])

  return {
    isUploading,
    errors,
    uploadClaims,
  }
};
