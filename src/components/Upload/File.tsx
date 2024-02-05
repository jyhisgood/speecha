'use client';
import React, { ChangeEvent } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { UploadProps } from '.';

const File = ({ onSuccess, onError }: UploadProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    try {
      if (!files || files.length < 1) throw new Error(`File doesn't exist`);
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (!e.target) return;
          const title = file.name;
          const content = e.target.result as string;
          await onSuccess(title, content);
        };
        reader.readAsText(file);
      });
    } catch (error) {
      onError?.(error);
      console.log(error);
    }
  };

  return (
    <>
      <label htmlFor="fileSelector">
        <FiFilePlus size={42} />
      </label>
      <input
        className="hidden"
        type="file"
        id="fileSelector"
        multiple
        onChange={handleFileChange}
      />
    </>
  );
};

export default File;
