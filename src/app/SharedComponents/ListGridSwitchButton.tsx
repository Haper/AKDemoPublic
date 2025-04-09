import SwitchButton from "./SwitchButton";
import { ListIcon, GridIcon } from "./Icons";
import './ListGridSwitchButton.scss';

type ButtonPropsType = {
  size: number;
  checked?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const ListGridSwitchButton = ({ size = 48, ...props }: ButtonPropsType) => {
  return (
    <div className={'ListGridSwitchButtonMainContainer'}>
      <SwitchButton title={props.checked ? 'List View' : 'Grid View'} {...props}
        offIcon={<ListIcon width={size} height={size} />}
        onIcon={<GridIcon width={size} height={size} />}
      />
    </div>
  );
};

export default ListGridSwitchButton;
