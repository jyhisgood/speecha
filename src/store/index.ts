import { create } from 'zustand';
import type { TreeDataNode } from 'antd';

interface AppState {
  workspaces: TreeDataNode[] | [];
  addWorkspace: (workspace: TreeDataNode) => void;
}

const useWorkspace = create<AppState>((set) => ({
  workspaces: [],
  addWorkspace: (newWorkspace: TreeDataNode) =>
    set((state) => ({ workspaces: [...state.workspaces, newWorkspace] })),
}));

export default useWorkspace;
