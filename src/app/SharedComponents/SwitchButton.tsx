import classNames from "classnames";
import './SwitchButton.scss';


type ButtonPropsType = {
  offIcon: React.ReactNode;
  onIcon: React.ReactNode;
  size?: number;
  checked?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const SwitchButton = ({ onIcon, offIcon, size = 48, checked, ...props }: ButtonPropsType) => {
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(event);
  };

  return (
    <div {...props} onClick={onClick} className={'SwitchButtonMainContainer'}>
      <div className={classNames('SwitchButtonIconContainer', checked && 'On')}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {offIcon}
        {onIcon}
      </div>
    </div>
  );
};

export default SwitchButton;
