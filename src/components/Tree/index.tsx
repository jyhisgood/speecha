import React, { useState } from 'react';
import { TreeProvider, useDragContext } from './TreeProvider';

import type { TreeNodeType } from './TreeProvider';
import { findParentNode, isMyChildrenNode } from './utils';

type TreeProps = {
  data: TreeNodeType[];
};

const CHILDREN_TREE_PADDING = 20;

// 트리 노드를 렌더링하는 재귀적인 컴포넌트
const TreeNode: React.FC<{
  node: TreeNodeType;
  forceUpdate: () => void;
}> = ({ node, forceUpdate }) => {
  const {
    state: { dragOverNode, draggingNode, data, allowDropNode },
    dispatch,
  } = useDragContext();

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    dispatch({ type: 'UPDATE_DRAGGING_NODE', payload: node });
    event.dataTransfer.setData('text/plain', node.key);
    event.stopPropagation(); // 이벤트 버블링 중단
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    const parent = findParentNode(data, node.key, null) as TreeNodeType;

    if (draggingNode && dragOverNode) {
      const dropProhibited = isMyChildrenNode(draggingNode, dragOverNode.key); // 상위 노드를 하위 노드로 옮기는 것을 금지 (모순됨)
      const sameNodeLevel = draggingNode.key === dragOverNode.key; // 드래그 시작 노드로 이동 불가

      if (parent === null) {
        // 최상위 노드는 항상 이동 가능
        dispatch({ type: 'ALLOW_DROP_NODE' });
      }
      if (dropProhibited || sameNodeLevel) {
        dispatch({ type: 'BLOCK_DROP_NODE' });
      } else {
        dispatch({ type: 'ALLOW_DROP_NODE' });
      }
    }

    // 해당 노드가 children이 없다면 (파일이라면) 해당 노드 상위 노드 이동
    if (!node.children && parent) {
      dispatch({ type: 'UPDATE_DRAG_OVER_NODE', payload: parent });
    } else {
      dispatch({ type: 'UPDATE_DRAG_OVER_NODE', payload: node });
      event.stopPropagation(); // 이벤트 버블링 중단
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLIElement>) => {
    dispatch({ type: 'EMPTY_DRAG_OVER_NODE' });
    event.stopPropagation(); // 이벤트 버블링 중단
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation(); // 이벤트 버블링 중단
    dispatch({ type: 'EMPTY_DRAGGING_NODE' });

    // 드롭된 노드가 파일이라면 상위 노드(폴더)를 찾기 위함
    const parent = findParentNode(data, node.key, null);

    const droppedTargetId = !node.children && parent ? parent.key : node.key; // 타겟이 파일이라면 상위 노드(폴더)의 키를 찾음
    const draggedNodeId = event.dataTransfer.getData('text/plain');
    console.log(`Dragged Node ID: ${draggedNodeId}`);
    console.log(`Dropped Node ID: ${droppedTargetId}`);

    // 드롭이 완료되면 드롭 대상인 노드의 UI를 초기화
    dispatch({ type: 'EMPTY_DRAG_OVER_NODE' });
  };

  const handleToggle = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation(); // 이벤트 버블링 중단
    node.isExpanded = !node.isExpanded; // 상태를 직접 변경
    forceUpdate(); // 업데이트 함수 호출
  };

  return (
    <ul>
      <li
        key={node.key}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(event) => handleToggle(event)}
        style={{
          paddingLeft: CHILDREN_TREE_PADDING,
          backgroundColor:
            allowDropNode && dragOverNode?.key === node.key
              ? 'lightblue'
              : 'transparent', // 드래그 중인 노드가 해당 노드 위에 있을 때 배경색을 변경
        }}
      >
        <span style={{ cursor: 'pointer' }}>
          {node.isExpanded ? '▼ ' : '▶ '}
          {node.title}
        </span>
        {node.isExpanded && node.children && (
          <ul>
            {node.children
              .filter((child) => child.children) // children이 있는 노드(폴더)를 상단에 위치
              .sort((a, b) => a.title.localeCompare(b.title)) // 이름 순으로 정렬
              .map((child) => (
                <TreeNode
                  key={child.key}
                  node={child}
                  forceUpdate={forceUpdate}
                />
              ))}
            {node.children
              .filter((child) => !child.children) // children이 없는 노드(파일)를 하단에 위치
              .sort((a, b) => a.title.localeCompare(b.title)) // 이름 순으로 정렬
              .map((child) => (
                <TreeNode
                  key={child.key}
                  node={child}
                  forceUpdate={forceUpdate}
                />
              ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

// 트리 컴포넌트
const Tree = ({ data }: TreeProps) => {
  const [, forceUpdate] = useState<boolean>(false);

  return (
    <TreeProvider data={data}>
      <div>
        {data.map((node) => (
          <TreeNode
            key={node.key}
            node={node}
            forceUpdate={() => forceUpdate((prev) => !prev)}
          />
        ))}
      </div>
    </TreeProvider>
  );
};

export default Tree;
