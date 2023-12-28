import React from "react";
import "./RadioButton.css";

type RadioButtonProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
};

export const RadioButton = ({
  label,
  value,
  checked,
  onChange,
  style,
}: RadioButtonProps) => {
  const handleClick = () => {
    onChange(value);
  };

  return (
    <div className="radio-buttons" style={style}>
      <input
        type="radio"
        id={`radio-${value}`}
        value={value}
        checked={checked}
        onChange={handleClick}
        className="radio-input"
      />
      <label
        htmlFor={`radio-${value}`}
        className={`button ${checked ? "active" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};
