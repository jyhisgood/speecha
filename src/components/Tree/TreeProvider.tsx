import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

export interface TreeNodeType {
  key: string;
  title: string;
  children?: TreeNodeType[];
  isExpanded: boolean;
}

interface DragContextType {
  dragOverNode: TreeNodeType | null;
  draggingNode: TreeNodeType | null;
  data: TreeNodeType[];
  allowDropNode: boolean;
}
type TreeProviderProps = {
  data: TreeNodeType[];
} & PropsWithChildren;

type Action =
  | { type: 'UPDATE_DRAG_OVER_NODE'; payload: TreeNodeType | null }
  | { type: 'UPDATE_DRAGGING_NODE'; payload: TreeNodeType | null }
  | { type: 'EMPTY_DRAG_OVER_NODE' }
  | { type: 'EMPTY_DRAGGING_NODE' }
  | { type: 'BLOCK_DROP_NODE' }
  | { type: 'ALLOW_DROP_NODE' };

const initialState: DragContextType = {
  dragOverNode: null,
  draggingNode: null,
  data: [],
  allowDropNode: true,
};

const DragContext = createContext<{
  state: DragContextType;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useDragContext = () => {
  const { state, dispatch } = useContext(DragContext);
  if (!state || !dispatch) {
    throw new Error('useDragContext must be used within a TreeProvider');
  }
  return { state, dispatch };
};

const reducer = (state: DragContextType, action: Action): DragContextType => {
  switch (action.type) {
    case 'UPDATE_DRAG_OVER_NODE':
      return { ...state, dragOverNode: action.payload };
    case 'UPDATE_DRAGGING_NODE':
      return { ...state, draggingNode: action.payload };
    case 'BLOCK_DROP_NODE':
      return { ...state, allowDropNode: false };
    case 'ALLOW_DROP_NODE':
      return { ...state, allowDropNode: true };
    case 'EMPTY_DRAG_OVER_NODE':
      return { ...state, dragOverNode: null };
    case 'EMPTY_DRAGGING_NODE':
      return { ...state, draggingNode: null };
    default:
      return state;
  }
};

export const TreeProvider = ({ children, data }: TreeProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    data: data,
  });

  return (
    <DragContext.Provider value={{ state, dispatch }}>
      {children}
    </DragContext.Provider>
  );
};
