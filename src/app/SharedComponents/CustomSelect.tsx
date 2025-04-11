'use client';

import { useId } from "react";
import type { GroupBase } from "react-select";
import Select, { components, InputProps } from "react-select";
import './CustomSelect.scss';


// const Select = dynamic(() => import('react-select'), { ssr: false });

type OptionType = { value: string, label: string; };
type OptionsType = OptionType | GroupBase<OptionType>;

const CustomSelect = ({ value, onChange, label, ...props }: any) => {
  const genId = useId();

  const handleChange = (option: any) => {
    onChange?.({
      target: { name: props.name, value: option?.value }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="custom-select-container" data-cy={props['data-cy']}>
      <Select
        onChange={handleChange}
        value={props.options.flatMap((option: OptionsType) => 'options' in option ? option.options : [option])
          .find((option: OptionType) => option.value === value)
        }
        className="custom-select-container text-sm"
        classNamePrefix={'custom-select'}
        // isSearchable={false}
        placeholder={''}
        instanceId={'custom-select'}
        id={genId}
        components={{ Input }}
        {...props}
      />
      {label && <label htmlFor={props.id || genId} className="CustomSelectLabel">{label}</label>}
    </div>
  );
};

export default CustomSelect;


const Input = (props: InputProps) => {
  return <components.Input {...props} inputMode="none" aria-activedescendant="" />;
};
