'use client';
import useWorkspace from '@/store';
import { FiFolderPlus, FiFilePlus } from 'react-icons/fi';
import _ from 'lodash';
import { Tree } from 'antd';

type Props = {};

const Aside = (props: Props) => {
  const { workspaces } = useWorkspace();
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-black/10 py-3 rounded-lg flex justify-center items-center">
          <FiFilePlus size={18} />
        </button>
        <button className="bg-black/10 py-3 rounded-lg flex justify-center items-center">
          <FiFolderPlus size={18} />
        </button>
      </div>

      <Tree treeData={workspaces} />
    </div>
  );
};

export default Aside;
