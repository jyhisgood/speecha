import Preview from '@/components/post/Preview';
import prisma from '@/lib/prisma';
import { PostSchema } from '@/types';

interface PageProps {
  params: { pageId: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params: { pageId } }: PageProps) => {
  try {
    const page = (await prisma.post.findFirst({
      where: { id: Number(pageId) },
    })) as PostSchema;
    return <Preview {...page} />;
  } catch (error) {
    console.log(error);
  }
};

export default Page;
