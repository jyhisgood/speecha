'use client';

import { TreeList } from '@/types/postFile';
import { FiFilePlus, FiFolderPlus } from 'react-icons/fi';
import { buildTreeAsPaths } from '@/lib/utils';
import Tree from './Tree';

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

type Props = { postList: TreeList[] };

const MyPosts = ({ postList }: Props) => {
  const paths = postList.map((post) => post.fullPath);
  // const treeData = buildTreeAsPaths(paths);

  return (
    <div className="scroll-sidebar h-[calc(100%-30px)] overflow-y-scroll">
      {/* <Tree data={treeData} /> */}
    </div>
  );
};

export default MyPosts;
