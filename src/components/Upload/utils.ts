import { PostFile } from '@/types';
import _ from 'lodash';

export const extractFolders = (
  data: PostFile.Partial[]
): PostFile.Partial[] => {
  const folders: PostFile.Partial[] = [];
  data.forEach((item) => {
    const components = item.fullPath.split('/');
    if (components.length > 1) {
      // 폴더 경로인 경우
      const folderPath = components.slice(0, components.length - 1).join('/');
      if (!folders.includes(folderPath)) {
        folders.push({ ...item, fullPath: folderPath });
      }
    }
  });
  return _.uniqBy(folders, 'fullPath');
};
