import { useRef } from 'react';
import './TextArea.scss';

type TextAreaProps = {
  ref?: React.Ref<HTMLTextAreaElement | null>;
  label?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ label, ...props }: TextAreaProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const assignRef = (ref: HTMLTextAreaElement | null) => {
    inputRef.current = ref;
    if (typeof props.ref === 'function') {
      props.ref(ref);
      return () => {
        (props.ref as (instance: HTMLInputElement | null) => void)?.(null);
      };

    } else if (props.ref && 'current' in props.ref) {
      props.ref.current = ref;
      return () => {
        (props.ref as React.RefObject<HTMLTextAreaElement | null>).current = null;
      };
    }
  };

  return (
    <div className={'TextAreaMainContainer text-sm'}>
      <textarea {...props} ref={assignRef} />
      {label && <label htmlFor={props.id} className="TextAreaLabel">{label}</label>}
    </div>
  );
};

export default TextArea;
