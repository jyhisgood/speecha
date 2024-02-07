import Preview from '@/components/post/Preview';
import prisma from '@/lib/prisma';
import { PostFileSchema } from '@/types';

interface PageProps {
  params: { pageId: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params: { pageId } }: PageProps) => {
  try {
    const page = (await prisma.postFile.findFirst({
      where: { id: Number(pageId) },
    })) as PostFileSchema;
    return <Preview {...page} />;
  } catch (error) {
    console.log(error);
  }
};

export default Page;
