import { useState, FC } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

interface IFileUploaderProps {
  allowedFormats?: ("text/csv" | "image/png" |"image/jpeg")[];
  onUpload: (file: File) => void;
  disabled: boolean;
  selectButtonLabel: string;
  uploadButtonLabel: string;
}

const FileUploader: FC<IFileUploaderProps> = ({
  selectButtonLabel,
  uploadButtonLabel,
  allowedFormats,
  disabled,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return;
    const fileType = selectedFile.type as typeof allowedFormats[number];
    if (!allowedFormats.includes(fileType)) {
      setError(`Please upload a file in a valid format such as: ${allowedFormats.join(', ')}`);
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleUploadButtonClick = () => {
    onUpload(file);
  }

  return (
    <div className="p-3 my-2 flex flex-col items-start rounded-lg border-[1px] border-x-stone-300">
      <div className='flex flex-col sm:flex-row items-center gap-5 w-full flex-wrap'>
        <div className='flex gap-2 sm:gap-4 flex-wrap me-auto'>
          <Group justify="center">
            <FileButton 
              disabled={disabled}
              onChange={handleFileChange}
              accept={allowedFormats.join(",")}
            >
              {(props) => <Button {...props} variant='default'>{selectButtonLabel}</Button>}
            </FileButton>
          </Group>
          {file && (
            <Text size="md">
              Selected file: <b>{file.name}</b>
            </Text>
          )}
        </div>
        <Button
          disabled={disabled || !file}
          className='me-auto sm:me-0 sm:ms-auto '
          rightSection={<IconUpload size={14} />}
          onClick={handleUploadButtonClick}
        >
          {uploadButtonLabel}
        </Button>
      </div>
      {error && (
        <Text size="sm" c="red" ta="center" mt="sm">
          {error}
        </Text>
      )}
    </div>
  );
}

export default FileUploader