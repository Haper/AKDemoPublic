import { useState, useRef } from 'react';
import {
  ClearIcon,
  HidePassIcon,
  ShowPassIcon
} from './Icons';
import './TextInput.scss';

type TextInputProps = {
  leftIcon?: React.ReactNode,
  showClearButton?: boolean,
  ref?: React.Ref<HTMLInputElement | null>;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({ leftIcon, showClearButton = false, label, ...props }: TextInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = '';
      if (props.onChange) {
        props.onChange({ target: { ...inputRef.current, value: '' } } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const assignRef = (ref: HTMLInputElement | null) => {
    inputRef.current = ref;
    if (typeof props.ref === 'function') {
      props.ref(ref);
      return () => {
        (props.ref as (instance: HTMLInputElement | null) => void)?.(null);
      };

    } else if (props.ref && 'current' in props.ref) {
      props.ref.current = ref;
      return () => {
        (props.ref as React.RefObject<HTMLInputElement | null>).current = null;
      };
    }
  };

  const isPassword = props.type === 'password';
  const showPassword = isPassword && isPasswordVisible;

  return (
    <div className={'TextInputMainContainer text-sm'}>
      {leftIcon}
      <input {...props} type={showPassword ? 'text' : props.type} ref={assignRef} />
      {showClearButton &&
        <div className={'TextInputRightButtonContainer'} onClick={onClear}>
          <ClearIcon width={24} height={24} />
        </div>
      }
      {isPassword &&
        <div className={'TextInputRightButtonContainer'} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
          {showPassword ? <HidePassIcon width={24} height={24} /> : <ShowPassIcon width={24} height={24} />}
        </div>
      }
      {label && <label htmlFor={props.id} className="TextInputLabel">{label}</label>}
    </div>
  );
};

export default TextInput;
