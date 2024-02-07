import { TreeNodeType } from './TreeProvider';

// 부모 노드를 찾는 함수
export const findParentNode = (
  nodes: TreeNodeType[],
  nodeId: string,
  parent: TreeNodeType | null
): TreeNodeType | null => {
  for (const node of nodes) {
    if (node.key === nodeId) {
      return parent;
    }
    if (node.children) {
      const foundParent = findParentNode(node.children, nodeId, node);
      if (foundParent) {
        return foundParent;
      }
    }
  }
  return null;
};

export const isMyChildrenNode = (
  node: TreeNodeType,
  targetNodeKey: string
): boolean => {
  if (!node.children) {
    return false; // 자식 노드가 없으면 false 반환
  }

  // 자식 노드를 순회하면서 타겟 노드를 찾음
  for (const childNode of node.children) {
    if (
      childNode.key === targetNodeKey ||
      isMyChildrenNode(childNode, targetNodeKey)
    ) {
      return true; // 자식 노드 중에 타겟 노드가 있으면 true 반환
    }
  }

  return false; // 자식 노드 중에 타겟 노드가 없으면 false 반환
};
