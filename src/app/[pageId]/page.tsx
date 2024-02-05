import Preview from '@/components/post/Preview';
import prisma from '@/lib/prisma';
import { NextPage, NextPageContext } from 'next';

interface PageProps {
  params: { pageId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ params: { pageId } }: PageProps) => {
  try {
    const page = await prisma.post.findFirst({ where: { id: pageId } });
    return <Preview {...page} />;
  } catch (error) {}
};

export default Page;
