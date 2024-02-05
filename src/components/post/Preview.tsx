'use client';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import type { Post } from '@/types';

const Preview = ({ title, content }: Post.Partial) => {
  return (
    <Editor
      initialValue={content || ' '} // 글 수정 시 사용
      initialEditType="markdown" // wysiwyg & markdown
      previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
      hideModeSwitch={true}
      height="100%"
      theme={''} // '' & 'dark'
      usageStatistics={false}
      useCommandShortcut={true}
    />
  );
};

export default Preview;
