import { renderHook, act } from '@testing-library/react-hooks';
import { useValidateClaims } from '../hooks/useValidateClaims'; // Adjust the path accordingly
import { ClaimSchema } from '../utils/helpers/claims';
import { IClaimRecord } from '../types/claim';
import { showNotification, cleanNotifications } from '@mantine/notifications';
import { validClaim, inValidClaim } from './mocks/claim';
import { ZodError } from 'zod';

jest.mock('../utils/helpers/claims', () => ({
  ClaimSchema: {
    safeParse: jest.fn(),
  },
}));

const mockedClaimSchema = ClaimSchema as jest.Mocked<typeof ClaimSchema>;

it('should return all claims as valid with no errors and no notifications when all claims are valid', () => {
  const claims: IClaimRecord[] = [validClaim, validClaim];
  
  mockedClaimSchema.safeParse.mockImplementation(() => ({ success: true, data: validClaim }));

  const { result } = renderHook(() => useValidateClaims());
  let output;
  
  act(() => {
    output = result.current.validateClaims(claims);
  });

  // Assert
  expect(output).toEqual({ data: claims, errors: [] });
  expect(mockedClaimSchema.safeParse).toHaveBeenCalledTimes(claims.length);
  expect(showNotification).not.toHaveBeenCalled();
  expect(cleanNotifications).not.toHaveBeenCalled();
});

it('should return only valid claims, record errors, and show notifications when some claims are invalid', () => {
  const claims: IClaimRecord[] = [validClaim, inValidClaim];
  
  mockedClaimSchema.safeParse
    .mockImplementationOnce(() => ({ success: true, data: validClaim }))
    .mockImplementationOnce(() => ({
      success: false,
      error: {
        errors: [
          { path: ['Claim ID'], message: 'Claim ID must be a number', code: "invalid_type", expected: "string", received: null },
        ],
      } as ZodError,
    }));

  const { result } = renderHook(() => useValidateClaims());
  let output;
  
  act(() => {
    output = result.current.validateClaims(claims);
  });

  expect(output).toEqual({
    data: [validClaim],
    errors: ['Row 3: \n Field: Paid => Amount must be positive'],
  });
  expect(mockedClaimSchema.safeParse).toHaveBeenCalledTimes(claims.length);
  expect(cleanNotifications).toHaveBeenCalledTimes(1);
  expect(showNotification).toHaveBeenCalledWith({
    title: 'Error',
    message: 'Claims validation failed, please upload a valid file',
    variant: 'error',
    color: "red",
  });
});


it('should return no valid claims, all record errors, and show notifications when all claims are invalid', () => {
  const claims: IClaimRecord[] = [inValidClaim, inValidClaim];
  
  mockedClaimSchema.safeParse.mockImplementation(() => ({
    success: false,
    error: {
      errors: [
        { path: ['Claim ID'], message: 'Claim ID must be a number', code: "invalid_type", expected: "string", received: null },
      ],
    } as ZodError,
  }));

  const { result } = renderHook(() => useValidateClaims());
  let output;
  
  act(() => {
    output = result.current.validateClaims(claims);
  });

  expect(output).toEqual({
    data: [],
    errors: [
      'Row 3: \n Field: Paid => Amount must be positive',
      'Row 4: \n Field: Paid => Amount must be positive',
    ],
  });
  expect(mockedClaimSchema.safeParse).toHaveBeenCalledTimes(claims.length);
  expect(cleanNotifications).toHaveBeenCalledTimes(1);
  expect(showNotification).toHaveBeenCalledWith({
    title: 'Error',
    message: 'Claims validation failed, please upload a valid file',
    variant: 'error',
    color: "red",
  });
});


it('should return empty data and errors with no notifications when an empty array is provided', () => {
  const claims: IClaimRecord[] = [];
  
  const { result } = renderHook(() => useValidateClaims());
  let output;
  
  act(() => {
    output = result.current.validateClaims(claims);
  });

  expect(output).toEqual({ data: [], errors: [] });
  expect(mockedClaimSchema.safeParse).not.toHaveBeenCalled();
  expect(cleanNotifications).not.toHaveBeenCalled();
  expect(showNotification).not.toHaveBeenCalled();
});

