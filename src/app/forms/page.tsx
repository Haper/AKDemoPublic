import PageTitle from '@/app/SharedComponents/PageTitle';
import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';
import './Components/FormsPageBackground.scss';
import './FormsPage.scss';
import '@/app/SharedStyles/BasicForm.scss';

// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Forms Demo",
//   description: "Forms Demo",
//   openGraph: {
//     title: "Forms Demo",
//     description: "Forms Demo",
//     url: "https://ak-demo-site.vercel.app/forms",
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
//     title: "Forms Demo",
//     description: "Forms Demo",
//   },
// };

const FormsPage = async () => {
  return (
    <article className={'BasicPageMainContainer FormsPageMainContainer'}>
      <div className={'FormsPageBackground'} />

      <PageTitle title={'Forms and Components'} />
      <div className={'BasicPageCenterContainer'}>
        <SignInForm />
        <hr />
        <SignUpForm />
      </div>
    </article>
  );
};

export default FormsPage;
