import { FC } from 'react';

interface IClaimUploadErrorsProps {
  errors: string[];
}

const ClaimUploadErrors: FC<IClaimUploadErrorsProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }
  return (
    <>
      <div>
        <h4 className='text-lg text-red-900 font-semibold'>Errors:</h4>
      </div>
      <div>
        {errors.map((error) => (
          <div key={error}>
            <p className='text-sm text-red-700'>
              {error}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ClaimUploadErrors;
