import type { PostFile } from '@prisma/client';

export type TreeList = Pick<PostFile, 'id' | 'fullPath', 'path'>;
export type Partial = Partial<PostFile>;

export type CreatePayload = Omit<PostFile, 'id' | 'createdAt' | 'folderId'>;
