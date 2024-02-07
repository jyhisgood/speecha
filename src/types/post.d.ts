import type { Post } from '@prisma/client';

export type TreeList = Pick<Post, 'id' | 'title' | 'path'>;
export type Partial = Partial<Post>;
