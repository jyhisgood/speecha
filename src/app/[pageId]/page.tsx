import Preview from '@/components/post/Preview';
import prisma from '@/lib/prisma';
import { NextPage, NextPageContext } from 'next';

interface PageProps {
  params: { pageId: number };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params: { pageId } }: PageProps) => {
  try {
    const page = await prisma.post.findFirst({ where: { id: Number(pageId) } });
    return <Preview {...page} />;
  } catch (error) {
    console.log(error);
  }
};

export default Page;
