'use client';

import CustomSelect from "@/app/SharedComponents/CustomSelect";
import './SalutationSelection.scss';


const options = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' },
];

const SalutationSelection = (props: any) => {
  return (
    <CustomSelect options={options} {...props} />
  );
};

export default SalutationSelection;
