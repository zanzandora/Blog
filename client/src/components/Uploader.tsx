import { useState, ReactNode, useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useToast } from '@/hooks/use-toast';
import { CommonError, MediaFile } from '@/types';

interface UploaderProps {
  type: string;
  onError?: (err: CommonError) => void;
  onProgress?: (percent: number) => void;
  children?: ReactNode;
  setData: (data: MediaFile) => void;
}

const Uploader = ({
  onError,
  onProgress,
  children,
  type,
  setData,
}: UploaderProps) => {
  const [, setProgress] = useState<number>(0);
  const toastShownRef = useRef(false);
  const ref = useRef<HTMLInputElement>(null);
  const { toast, dismiss } = useToast();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/upload-auth`
      );
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error('Authentication error:', error);
      throw new Error('Authentication request failed');
    }
  };

  // Handler for upload progress
  const handleUploadProgress = (progressEvent: ProgressEvent) => {
    if (progressEvent.lengthComputable) {
      const percent = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      setProgress(percent);
      onProgress?.(percent);
      if (onProgress) onProgress(percent);

      // Show uploading toast only once at the start
      if (!toastShownRef.current && percent > 0 && percent < 100) {
        toast({
          className: 'bg-blue-500 text-white',
          title: 'Uploading...',
          description: 'Please wait until the file is finished Uploading..',
          duration: 999999, // keep until dismissed
        });
        toastShownRef.current = true;
      }

      // When upload completes, hide the uploading toast
      if (toastShownRef.current && percent === 100) {
        dismiss('uploading-toast');
        toastShownRef.current = false;
      }
    }
  };

  // Handler for upload success
  const handleSuccess = (res: MediaFile) => {
    setProgress(100);
    onProgress?.(100);
    // Dismiss uploading toast if still showing
    dismiss('uploading-toast');
    // Show success toast
    toast({
      className: 'bg-green-500 text-white',
      title: 'Upload successfull !',
    });
    toastShownRef.current = false;

    setData(res);
  };

  // Handler for upload error
  const handleError = (err: CommonError) => {
    setProgress(0);
    onProgress?.(0);
    dismiss('uploading-toast');
    toastShownRef.current = false;
    if (onError) onError(err);
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        // fileName={fileName}
        useUniqueFileName
        onUploadProgress={handleUploadProgress}
        onSuccess={handleSuccess}
        onError={handleError}
        ref={ref}
        style={{ display: 'none' }}
        accept={`${type}/*`}
      />
      <div className='cursor-pointer' onClick={() => ref.current?.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Uploader;
