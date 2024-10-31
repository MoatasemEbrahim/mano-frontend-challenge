import Papaparse from "papaparse";
import { showNotification, cleanNotifications } from '@mantine/notifications';
import { IPapaparseResult, IPapaparseClaimsResult } from "../utils/helpers/Papaparse";
import { useCallback } from "react";

export const useParseClaims = () => {
  const onError = useCallback(() => {
    cleanNotifications();
    showNotification({
      title: 'Error',
      message: 'Failed to parse claims, please upload a valid file',
      variant: 'error',
      color: "red"
    });
  }, []);

  // This function return custom promise to avoid the callback and manage the excusion order.
  const parseClaims: (claimsFile: File) => Promise<IPapaparseClaimsResult> = useCallback((claimsFile) => {
    return new Promise(function(complete, error) {
      Papaparse.parse(claimsFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results: IPapaparseResult) => { 
          const mappedErrors = results.errors.map(({ row, code, message}) => {
            const errorMessage = (row ? `Row: ${row} => ` : "") + `Code= "${code}";  Message= ${message}.`;
            return errorMessage;
          });
          if (results.errors.length > 0) {
            onError();
          }
          complete({...results, errors: mappedErrors });
        },
        error: () => {
          onError();
          error();
        } 
      });
    });
  },[onError]);

  return {
    parseClaims,
  }
};
