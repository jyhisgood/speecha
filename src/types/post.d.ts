import type { Post } from '@prisma/client';

export type TitleWithId = Pick<Post, 'id' | 'title'>;
export type Partial = Partial<Post>;
