import APIError from '@/domain/api/APIError';
import classNames from 'classnames';
import './ListError.scss';

type ListErrorProps = {
  error: APIError;
  tryAgain?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const ListError = ({ error, tryAgain, ...props }: ListErrorProps) => {
  return (
    <div {...props} className={classNames("ListErrorMainContainer", props.className)}>
      <h4 className='text-xl'>{`${error?.code ? `${error.code}: ` : ''}${error.message}`}</h4>
      {tryAgain && <button onClick={tryAgain}>Try Again</button>}
    </div>
  );
};

export default ListError;
