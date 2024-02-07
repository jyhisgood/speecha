'use client';
import React, { ChangeEvent } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import { UploadProps } from '.';
import { onSuccessReturn } from './types';

const File = ({ onSuccess, onError }: UploadProps) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const uploadedFiles: onSuccessReturn[] = [];

    try {
      if (!files || files.length < 1) throw new Error(`File doesn't exist`);

      for (const file of Array.from(files)) {
        const reader = new FileReader();
        const onLoadPromise = new Promise<void>((resolve) => {
          reader.onload = async (e) => {
            if (!e.target) return;
            const title = file.name;
            const content = e.target.result as string;
            const fullPath = `/${file.webkitRelativePath}`;
            const path = fullPath.replace(/\/[^/]+$/, '');
            uploadedFiles.push({ title, content, fullPath, path });
            resolve();
          };
        });

        reader.readAsText(file);
        await onLoadPromise;
      }

      console.log(uploadedFiles);
      await onSuccess(uploadedFiles, 'files');
    } catch (error) {
      onError?.(error);
      console.error(error);
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
