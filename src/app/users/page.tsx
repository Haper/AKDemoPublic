import { Suspense } from 'react';
import DummyJsonLink from '@/app/SharedComponents/DummyJsonLink';
import PageTitle from '@/app/SharedComponents/PageTitle';
import ScrollToTopButton from '@/app/SharedComponents/ScrollToTopButton';
import SearchBar from '@/app/SharedComponents/SearchBar';
import UsersTable from './Components/UserTable';
import './UsersPage.scss';

// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Users Demo",
//   description: "Users Demo",
//   openGraph: {
//     title: "Users Demo",
//     description: "Users Demo",
//     url: "https://ak-demo-site.vercel.app/users",
//     siteName: "AK Demo Site",
//     images: [
//       {
//         url: "https://ak-demo-site.vercel.app/og.png",
//         width: 800,
//         height: 600,
//       },
//     ],
//     locale: "en-US",
//     type: "website",
//   },
//   twitter: {
//     title: "Users Demo",
//     description: "Users Demo",
//     card: "summary_large_image",
//     images: ["https://ak-demo-site.vercel.app/og.png"],
//   },
//   robots: "index,follow",
// };

const UsersPage = async () => {
  return (
    <article className={'BasicPageMainContainer UsersPageMainContainer'}>
      <PageTitle title={'Users Demo'}>
        <Suspense><SearchBar /></Suspense>
      </PageTitle>
      <div className={'BasicPageCenterContainer'}>
        <Suspense><UsersTable /></Suspense>
        <ScrollToTopButton />
      </div>
      <DummyJsonLink />
    </article>
  );
};

export default UsersPage;
