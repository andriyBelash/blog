import { useState, useCallback, DragEvent, ChangeEvent } from 'react';

interface UseImageUploadProps {
  onFileSelect: (file: File) => void;
}

interface UseImageUploadReturn {
  isDragging: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useImageUpload = ({ onFileSelect }: UseImageUploadProps): UseImageUploadReturn => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    console.log('onDragOver');
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFile = (file: File) => {
    onFileSelect(file);
  };

  return {
    isDragging,
    onDragOver,
    onDragLeave,
    onDrop,
    onChange
  };
};

export default useImageUpload;