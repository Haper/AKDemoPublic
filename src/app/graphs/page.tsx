import PageTitle from '@/app/SharedComponents/PageTitle';
import Graph from './Components/Graph';
import ParallaxBackground from './Components/ParallaxBackground';
import './GraphsPage.scss';

// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Diagrams Demo",
//   description: "Diagrams Demo",
//   openGraph: {
//     title: "Diagrams Demo",
//     description: "Diagrams Demo",
//     url: "https://ak-demo-site.vercel.app/diagrams",
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
//     title: "Diagrams Demo",
//     description: "Diagrams Demo",
//   }
// };

const GraphsPage = () => {
  return (
    <article className="BasicPageMainContainer DiagramsPageMainContainer">
      <ParallaxBackground />

      <PageTitle title={'Graphs'} />

      <div className={'BasicPageCenterContainer'}>
        <Graph />
      </div>
    </article>
  );
};

export default GraphsPage;
