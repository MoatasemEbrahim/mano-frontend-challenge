import { useCallback } from 'react';
import { ClaimSchema } from '../utils/helpers/claims';
import { IClaimRecord } from '../types/claim'
import { showNotification, cleanNotifications } from '@mantine/notifications';

export const useValidateClaims = () => {

  const validateClaims = useCallback((records: IClaimRecord[]) => {
    const validatedClaims: IClaimRecord[] = [];
    const validationErrors: string[] = [];

    records.forEach((claim, index) => {
      const parsedClaim = ClaimSchema.safeParse(claim);
      if (parsedClaim.success) {
        validatedClaims.push(claim);
      } else {
        const row = index + 2;// Considering header is row 1
        const errorMessage = `Row ${row}: ${parsedClaim.error.errors.map(e => `\n Field: ${e.path[0]} => ${e.message}`)}`;
        validationErrors.push(errorMessage);
      }
    });

    if (validationErrors.length > 0) {
      cleanNotifications();
      showNotification({
        title: 'Error',
        message: 'Claims validation failed, please upload a valid file',
        variant: 'error',
        color: "red"
      });
    }

    return { data: validatedClaims, errors: validationErrors}
  }, []);

  return {
    validateClaims,
  }
}
