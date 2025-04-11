import NavHistoryTracker from "@/app/SharedComponents/NavHistoryTracker";
import LeftMenu from "@/app/SharedComponents/LeftMenu/LeftMenu";
import SWRegistrator from "@/app/SharedComponents/SWRegistrator";
import { ThemeProvider } from 'next-themes';
import '@/app/index.scss';
import '@/app/MainPage.scss';
import '@/app/SharedStyles/BasicGrid.scss';
import '@/app/SharedStyles/BasicList.scss';
import '@/app/SharedStyles/BasicPage.scss';
import '@/app/SharedStyles/Tailwind.scss';
import '@/app/SharedStyles/Variables.scss';


// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "AK Demo Site",
//   description: "AK Demo Site",
//   openGraph: {
//     title: "AK Demo Site",
//     description: "AK Demo Site",
//     url: "https://ak-demo-site.vercel.app/",
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
//   }
// };


export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AK Demo Site</title>
      </head>
      <body>
        <ThemeProvider>
          <LeftMenu />
          <NavHistoryTracker />
          <SWRegistrator />
          <main className="MainAppContainer">
            {props.children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
