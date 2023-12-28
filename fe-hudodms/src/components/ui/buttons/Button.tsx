import "./Button.css";

type ButtonProps = {
  style?: React.CSSProperties;
  onClick?: () => void;
  label: string;
  type?: "submit" | "reset" | "button";
};

export const Button = ({ label, onClick, style, type }: ButtonProps) => {
  return (
    <div className="button-container" style={style}>
      <button onClick={onClick} type={type}>
        {label}
      </button>
    </div>
  );
};
