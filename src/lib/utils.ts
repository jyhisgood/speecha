import { DataNode } from 'antd/es/tree';
import { uid } from 'uid';

export const buildTreeAsPaths = (paths: string[]): any => {
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
          currentNode.key = uid();
        }
      });

      return tree;
    },
    { title: 'root', children: [] }
  ).children;
};
