// @ts-nocheck
'use client';
import React, { ChangeEvent } from 'react';
import { uid } from 'uid';
import { FiPlusCircle } from 'react-icons/fi';
import useWorkspace from '@/store';

import type { DataNode } from 'antd/es/tree';

const UploadDirectory = () => {
  const { addWorkspace } = useWorkspace();
  const buildTree = (paths: string[]): any => {
    return paths.reduce(
      (tree, filePath) => {
        const parts = filePath.split('/');
        let currentNode: any = tree;

        parts.forEach((part, index) => {
          const existingNode =
            currentNode.children &&
            currentNode.children.find((node: DataNode) => node.title === part);

          if (existingNode) {
            currentNode = existingNode;
          } else {
            const newNode = { title: part, key: uid() };

            if (!currentNode.children) currentNode.children = [];
            currentNode.children.push(newNode);
            currentNode = newNode;
          }

          if (index === parts.length - 1) {
            // currentNode.isFile = true;
            currentNode.key = uid();
          }
        });

        return tree;
      },
      { title: 'root', children: [] }
    ).children;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    try {
      if (!files || files.length < 1) throw new Error(`File doesn't exist`);
      const paths = Array.from(files).map((file) => file.webkitRelativePath);
      const [workspace] = buildTree(paths);
      addWorkspace(workspace);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <label htmlFor="folderSelector">
        <FiPlusCircle size={42} />
      </label>
      <input
        className="hidden"
        type="file"
        id="folderSelector"
        directory=""
        webkitdirectory=""
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadDirectory;
