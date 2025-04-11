import type { ChangeEventHandler, RefAttributes } from 'react';
import { useCallback, useId, useImperativeHandle, useRef } from "react";
import type { PhoneInputProps, PhoneInputRefType } from "react-international-phone";
import { PhoneInput as _PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';
import './PhoneInput.scss';

type PhoneInputPropsType = Omit<PhoneInputProps, 'onChange'>
  & RefAttributes<PhoneInputRefType>
  & {
    onChange: ChangeEventHandler<HTMLInputElement>;
    label?: string;
    id?: string;
    'data-cy'?: string;
  };

const PhoneInput = ({ onChange, label, id, ...props }: PhoneInputPropsType) => {
  const genId = useId();
  const inputRef = useRef<PhoneInputRefType>(null);

  useImperativeHandle<PhoneInputRefType, PhoneInputRefType>(
    props.ref,
    () => {
      return (inputRef.current
        ? {
          ...inputRef.current,
          focus: (options?) => {
            inputRef.current?.focus(options);
          },
          get value() {
            return inputRef.current!.state.phone;
          },
          set value(newValue: string) {
            if (inputRef.current) {
              inputRef.current.value = newValue;
            }
          },
        }
        : null
      );
    }
  );

  const changeHandler = useCallback((phone: string) => {
    onChange?.({
      target: { name: props.name, value: phone }
    } as React.ChangeEvent<HTMLInputElement>);
  }, [onChange, props.name]);

  return (
    <div className="flex relative" id={id || genId} data-cy={props['data-cy']}>
      <_PhoneInput
        onChange={changeHandler}
        {...props}
        ref={inputRef}
      />
      {label && <label htmlFor={id || genId} className="PhoneInputLabel">{label}</label>}
    </div>
  );
};

export default PhoneInput;
