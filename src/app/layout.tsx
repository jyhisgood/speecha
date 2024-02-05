import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'regenerator-runtime/runtime';
import Container from '@/layouts/Container';
import Sidebar from '@/layouts/Sidebar';
import Main from '@/layouts/Main';
import { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Sidebar />
          <Main>{children}</Main>
        </Container>
      </body>
    </html>
  );
}
