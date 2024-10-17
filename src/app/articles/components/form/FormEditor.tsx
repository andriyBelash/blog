'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Завантаження ...</p>
})

interface Props {
  value: string,
  onChange: (value: string) => void
}

const FormEditor: React.FC<Props> = ({ value, onChange }) => {

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'video'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'link', 'video',
    'blockquote', 'code-block'
  ]


  return (
    <div className='h-[400px] flex flex-col'>
      <ReactQuill
        theme='snow'
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
        className="pb-[70px] h-[370px] bg-[var(--background)]"
      />
      <div className="mt-4 text-sm text-gray-600">
        Кількість символів: {value.length}
      </div>
    </div>
  )
}

export default FormEditor