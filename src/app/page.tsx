import PageTitle from '@/app/SharedComponents/PageTitle';
import Image from 'next/image';
import AboutPageBackground from '@/app/Components/AboutPageBackground';
import TelegramButton from './Components/TelegramButton';
import './AboutPage.scss';
import {
  EmailIcon,
  ExpoIcon,
  LinkedInIcon,
  GithubIcon,
  NextJSIcon,
  ReactIcon,
  ReduxIcon,
  ScssIcon,
  TailwindIcon,
  TimberbaseIcon,
  TypescriptIcon,
  UpworkIcon,
  CypressIcon,
  MongoDBIcon
} from '@/app/SharedComponents/Icons';


const UPWORK_URL = 'https://www.upwork.com/freelancers/~01961dbaad493ad31f?mp_source=share';
const LINKEDIN_URL = 'https://www.linkedin.com/in/andrew-khapoknysh/';
const GITHUB_URL = 'https://github.com/Haper/AKDemoPublic';
const EMAIL_URL = 'mailto:haperman@gmail.com';

const MainPage = () => {
  return (
    <article className="BasicPageMainContainer AboutPageMainContainer">
      <AboutPageBackground />
      <PageTitle title={'About'} />
      <div className={'BasicPageCenterContainer'}>
        <DeveloperBlock />
        <TechBlock />
        <ExperienceBlock />
        <AdditionalExperienceBlock />
      </div>
      <TelegramButton />
    </article>
  );
};

export default MainPage;


const DeveloperBlock = () => {
  return (
    <section className={'AboutPageBlockContainer AboutPageBlockContainerAnimated'}>
      <h3 className="text-2xl font-semibold">Software Developer:</h3>
      <br />
      <h4 className='text-xl font-semibold mb-2.5'>Andrew Khapoknysh</h4>
      <div className={'AboutPageItemsContainer'}>
        <ItemLink icon={<UpworkIcon width={22} height={22} />} href={UPWORK_URL}>Upwork</ItemLink>
        <ItemLink icon={<LinkedInIcon width={22} height={22} />} href={LINKEDIN_URL}>LinkedIn</ItemLink>
        <ItemLink icon={<GithubIcon width={22} height={22} />} href={GITHUB_URL}>GitHub</ItemLink>
        <ItemLink icon={<EmailIcon width={22} height={22} />} href={EMAIL_URL}>haperman@gmail.com</ItemLink>
      </div>
    </section>
  );
};

const TechBlock = () => {
  return (
    <section className={'AboutPageBlockContainer AboutPageBlockContainerAnimated1'}>
      <h3 className="text-2xl font-semibold">Technologies:</h3>
      <br />
      <div className={'AboutPageItemsContainer'}>
        <ItemLink icon={<ReactIcon width={22} height={22} />} href={'https://react.dev/'}>React</ItemLink>
        <ItemLink icon={<NextJSIcon width={22} height={22} />} href={'https://nextjs.org/'}>Next.js</ItemLink>
        <ItemLink icon={<ReduxIcon width={22} height={22} />} href={'https://redux.js.org/'}>Redux</ItemLink>
        <ItemLink icon={<Image width={24} height={24} src={'/zustand.png'} alt={''} />} href={'https://zustand-demo.pmnd.rs/'}>Zustand</ItemLink>
        <ItemLink icon={<TypescriptIcon width={22} height={22} />} href={'https://www.typescriptlang.org/'}>Typescript</ItemLink>
        <ItemLink icon={<MongoDBIcon width={22} height={22} />} href={'https://www.mongodb.com/'}>MongoDB</ItemLink>
        <ItemLink icon={<ExpoIcon width={22} height={22} />} href={'https://expo.dev/'}>Expo</ItemLink>
        <ItemLink icon={<ScssIcon width={22} height={22} />} href={'https://sass-lang.com/'}>SCSS</ItemLink>
        <ItemLink icon={<TailwindIcon width={22} height={22} />} href={'https://tailwindcss.com/'}>Tailwind CSS</ItemLink>
        <ItemLink icon={<CypressIcon width={22} height={22} />} href={'https://www.cypress.io/'}>Cypress</ItemLink>
      </div>
    </section>
  );
};

const ExperienceBlock = () => {
  return (
    <section className={'AboutPageBlockContainer AboutPageBlockContainerAnimated2 gap-2.5'}>
      <h3 className="text-2xl font-semibold">Experience:</h3>

      <div className='AboutPageSubContainer'>
        <h4 className='underline text-xl font-semibold'>Freelance</h4>
        <h5 className='text-base mb-2.5'>(Jan.2024 - Present)</h5>
        <h5 className='text-base'>Role: Frontend Software Developer</h5>
        <h5 className='text-base'>Tech: React, Next.js, Typescript, SCSS, Redux</h5>
      </div>

      <div className='AboutPageSubContainer'>
        <h4 className='underline text-xl font-semibold'>Timber Base GmbH</h4>
        <h5 className='text-base mb-2.5'>(Sep.2020 - Dec.2023)</h5>
        <h5 className='text-base'>Role: Frontend Software Developer</h5>
        <h5 className='text-base'>Tech: React, Typescript, SCSS, Redux</h5>
        <ItemLink icon={<TimberbaseIcon width={22} height={22} />} href={'https://timberbase.com/'}>timberbase.com</ItemLink>
      </div>

      <div className='AboutPageSubContainer'>
        <h4 className='underline text-xl font-semibold'>Bonpland Software GmbH</h4>
        <h5 className='text-base mb-2.5'>(Sep.2017 - Jul.2020)</h5>
        <h5 className='text-base'>Role: Mobile Software Developer</h5>
        <h5 className='text-base'>Tech: React-native, Expo, SCSS, Redux</h5>
        <ItemLink icon={<Image width={24} height={24} src={'/uberblick.png'} alt={''} />} href={'https://uberblick.io/'}>uberblick.io</ItemLink>
      </div>
    </section>
  );
};

const AdditionalExperienceBlock = () => {
  return (
    <section className={'AboutPageBlockContainer AboutPageBlockContainerAnimated3 gap-2.5'}>
      <h3 className="text-2xl font-semibold">Additional Experience:</h3>

      <div className='AboutPageSubContainer'>
        <h4 className='underline text-xl font-semibold'>Freelance</h4>
        <h5 className='text-base mb-2.5'>(Jan.2017 - May.2017)</h5>
        <h5 className='text-base'>Role: iOS Software Developer</h5>
        <h5 className='text-base'>Tech: Objective-C, Cocoa</h5>
      </div>

      <div className='AboutPageSubContainer'>
        <h4 className='underline text-xl font-semibold'>Componentix</h4>
        <h5 className='text-base mb-2.5'>(May.2014 - Dec.2016)</h5>
        <h5 className='text-base'>Role: iOS Software Developer</h5>
        <h5 className='text-base'>Tech: Objective-C, Swift, Cocoa</h5>
        <ItemLink icon={<Image width={24} height={24} src={'/componentix.png'} alt={''} />} href={'https://componentix.com/'}>componentix.com</ItemLink>
      </div>

      <div className='AboutPageSubContainer'>
        <h4 className='underline text-xl font-semibold'>ASD Code</h4>
        <h5 className='text-base mb-2.5'>(Dec.2013 - May.2014)</h5>
        <h5 className='text-base'>Role: Frontend Software Developer</h5>
        <h5 className='text-base'>Tech: Objective-C, Cocoa</h5>
        {/* <ItemLink icon={<Image width={24} height={24} src={'/componentix.png'} alt={''} />} href={'https://componentix.com/'}>componentix.com</ItemLink> */}
      </div>
    </section>
  );
};

const ItemLink = ({ icon, href, children }: { icon?: React.ReactNode, href: string, children: React.ReactNode, }) => {
  return (
    <a className={'AboutPageLink'} href={href} target={'_blank'}>
      {icon}
      {!!icon && <>&nbsp;</>}
      <h5 className='text-base'>{children}</h5>
    </a>
  );
};
