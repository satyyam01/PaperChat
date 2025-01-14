'use client'


import { Inbox } from 'lucide-react'
import React from 'react'
import { useDropzone } from 'react-dropzone'


const FileUpload = () => {
    const {getRootProps, getInputProps} = useDropzone({
        accept: {'application/pdf' : [".pdf"]},
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles)
        }
    })
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({ className:'border-dashed border-2 border-gray-300 p-4 rounded-xl cursor-pointer bg-gray-100 py-8 flex justify-center items-center flex-col'
        })}>
            <input {...getInputProps()} />
            <>
            <Inbox className='w-10 h-10 text-blue-400' />
            <p className='mt-2 text-sm text-slate-400'>Drag and drop some files here</p>
            </>
        </div>
    </div>
  )
}

export default FileUpload