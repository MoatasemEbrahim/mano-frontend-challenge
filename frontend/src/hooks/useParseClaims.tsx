import Papaparse from "papaparse";
import { showNotification } from '@mantine/notifications';
import { IPapaparseResult, IPapaparseClaimsResult } from "../utils/helpers/Papaparse";
import { useCallback } from "react";

export const useParseClaims = () => {

  const onClaimsParseSuccess = useCallback(() => {
    // TODO-FIX: Notifications are rendered outside the viewport
    showNotification({
      title: 'Loading...',
      message: 'Analysing claims records',
    });
  }, []);

  const onClaimsParseError = useCallback(() => {
    showNotification({
      title: 'Error',
      message: 'Failed to parse claims, please upload a valid file',
    });
  }, []);

  // This function return custom promise to avoid the callback and manage the excusion order.
  const parseClaims: (claimsFile: File) => Promise<IPapaparseClaimsResult> = useCallback((claimsFile) => {
    return new Promise(function(complete, error) {
      Papaparse.parse(claimsFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results: IPapaparseResult) => { 
          onClaimsParseSuccess();
          const mappedErrors = results.errors.map(({ row, code, message}) => {
            const errorMessage = (row ? `Row: ${row} => ` : "") + `Code= "${code}";  Message= ${message}.`;
            return errorMessage;
          });
          complete({...results, errors: mappedErrors });
        },
        error: () => {
          onClaimsParseError();
          error();
        } 
      });
    });
  },[onClaimsParseSuccess, onClaimsParseError]);

  return {
    parseClaims,
  }
};
