import DummyJsonLink from '@/app/SharedComponents/DummyJsonLink';
import PageTitle from '@/app/SharedComponents/PageTitle';
import SearchBar from '@/app/SharedComponents/SearchBar';
import ProductsMainView from './Components/ProductsMainView';
import ProductViewSwitchButton from './Components/ProductViewSwitchButton';
import { Suspense } from 'react';

// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Products Demo",
//   description: "Products Demo",
//   openGraph: {
//     title: "Products Demo",
//     description: "Products Demo",
//     url: "https://ak-demo-site.vercel.app/products",
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
//     title: "Products Demo",
//     description: "Products Demo",
//   },
// };

const ProductsPage = async () => {
  return (
    <article className={'BasicPageMainContainer'}>
      <PageTitle title={'Products Demo'}>
        <Suspense><SearchBar /></Suspense>
        <ProductViewSwitchButton />
      </PageTitle>
      <div className={'BasicPageCenterContainer'}>
        <ProductsMainView />
      </div>
      <DummyJsonLink />
    </article>
  );
};

export default ProductsPage;
