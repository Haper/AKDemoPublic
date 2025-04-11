import classNames from 'classnames';
import { LoaderIcon } from './Icons';
import './ListLoader.scss';

type ListLoaderProps = {
  ref: React.Ref<HTMLDivElement> | undefined,
  showLoader?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ListLoader = ({ ref, showLoader, ...props }: ListLoaderProps) => {
  return (
    <div {...props} ref={ref}
      className={classNames("ListLoaderMainContainer", props.className)}
    >
      {showLoader && <LoaderIcon className='LoaderIcon' />}
    </div>
  );
};

export default ListLoader;
