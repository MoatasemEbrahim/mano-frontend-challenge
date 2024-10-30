import ClaimUploadErrors from './ClaimUploadErrors';
import FileUploader from '../../components/FileUploader';
import { useUploadClaims } from '../../hooks/useUploadClaims';

const ManageClaims = () => {
  const { uploadClaims, isUploading, errors } = useUploadClaims();

  return (
    <div>
      <h3 className='text-xl'>Manage Claims:</h3>
      <div>
        <FileUploader
          selectButtonLabel='Select claims file'
          uploadButtonLabel='Upload claims'
          allowedFormats={["text/csv"]}
          disabled={isUploading}
          onUpload={uploadClaims}
        />
      </div>
      <ClaimUploadErrors errors={errors} />
    </div>
  )
}

export default ManageClaims;
