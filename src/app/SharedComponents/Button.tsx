import classNames from 'classnames';
import './Button.scss';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={classNames('ButtonMainContainer', props.className)}>
      {children}
    </button>
  );
};

export default Button;
