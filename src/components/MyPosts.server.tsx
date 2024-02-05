'use client';

import PostItem from './PostItem';
import { TitleWithId } from '@/types/post';
import { Tree } from 'antd';
import { FiFilePlus, FiFolderPlus } from 'react-icons/fi';
import useWorkspace from '@/store';

export const SideBarTopMenu = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button className="bg-black/10 py-3 rounded-lg flex justify-center items-center">
        <FiFilePlus size={18} />
      </button>
      <button className="bg-black/10 py-3 rounded-lg flex justify-center items-center">
        <FiFolderPlus size={18} />
      </button>
    </div>
  );
};

type Props = { postList: TitleWithId[] };

const MyPosts = ({ postList }: Props) => {
  const { workspaces } = useWorkspace();
  return (
    <div className="scroll-sidebar h-[calc(100%-30px)] overflow-y-scroll">
      <Tree treeData={workspaces} />
      {postList.map((item) => (
        <PostItem {...item} />
      ))}
    </div>
  );
};

export default MyPosts;
