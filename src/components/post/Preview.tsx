'use client';

import { useMemo, useState } from 'react';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { useToggle, useWindowSize } from 'react-use';
import { Switch } from 'antd';
import dayjs from 'dayjs';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import type { PostSchema } from '@/types';

const Preview = ({ title, content, createdAt }: PostSchema) => {
  const { height } = useWindowSize();
  const [isViewer, toggleViewer] = useToggle(true);
  const editorProps = useMemo(
    () => ({
      initialValue: content || ' ',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      hideModeSwitch: true,
      height: `${height}px`,
      usageStatistics: false,
      useCommandShortcut: true,
    }),
    [height]
  );
  return (
    <div className="h-full overflow-y-scroll p-4 flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <h1 className="text-center text-2xl font-bold grow">{title}</h1>
          <Switch defaultChecked onChange={toggleViewer} />
        </div>
        <p className="text-center text-neutral-500">
          {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
        </p>
      </div>

      {isViewer ? (
        <div className="w-[1200px] m-auto ">
          <Viewer {...editorProps} />
        </div>
      ) : (
        <Editor
          {...editorProps}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      )}
    </div>
  );
};

export default Preview;
