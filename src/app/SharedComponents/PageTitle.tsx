import LeftMenuButton from "./LeftMenuButton";
import './PageTitle.scss';

type PageTitleType = {
  title: string;
} & React.PropsWithChildren;

const PageTitle = ({ title, children }: PageTitleType) => {
  return (
    <header className={'BasicPageTitleContainer'}>
      <LeftMenuButton />
      <h2 className="flex-1 text-3xl font-bold TruncatedText">{title}</h2>
      {children}
    </header>
  );
};

export default PageTitle;
