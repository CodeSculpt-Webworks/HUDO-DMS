import React, { ChangeEvent } from "react";
import "./TextInput.css";

type TextInputProps = {
  style?: React.CSSProperties;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
};

export const TextInput = ({
  style,
  label,
  placeholder,
  value,
  onChange,
  disabled,
  id,
  name,
}: TextInputProps) => {
  return (
    <div className="textinput-container" style={style}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
