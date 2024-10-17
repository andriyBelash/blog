'use client'

import React, { useCallback, useState } from 'react'
import useImageUpload from "@/src/hooks/useImageUploader";
import Image from 'next/image';


const ImageUploader = () => {

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setPreview(URL.createObjectURL(file));
  }, [setPreview]);

  const imageUploader = useImageUpload({ onFileSelect: handleFileSelect });

  return (
    <div
      onDragOver={imageUploader.onDragOver}
      onDragLeave={imageUploader.onDragLeave}
      onDrop={imageUploader.onDrop}
      onChange={imageUploader.onChange}
    >
      <input id='article-file-upload' type="file" onChange={imageUploader.onChange} accept="image/*" className='hidden' />
      <label 
        htmlFor='article-file-upload'
        className={`w-full flex items-center justify-center h-[300px] cursor-pointer ${ imageUploader.isDragging ? 'border-[var(--blue)]' : 'hover:border-[var(--blue)] border-[var(--border)]'} border rounded-md border-dashed `}
      >
        {preview ? (
          <Image
            src={preview}
            alt="preview"
            width={300}
            height={300}
            quality={100}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span className='text-secondary-text'>Завантажте зображення</span>
        )}
      </label>
    </div>
  )
}

export default React.memo(ImageUploader)