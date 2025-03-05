import "./Button.css";

const renderArrow = (direction) => {
  switch (direction) {
    case "left":
      return <span className="button-arrow-left">{"<"}</span>;
    case "right":
      return <span className="button-arrow-right">{">"}</span>;
    case "down":
      return <span className="button-arrow-down">{">"}</span>;
    default:
      return null;
  }
};

const Button = ({ text, type, onClick, arrow, arrowDirection, imageUrl }) => {
  return (
    <button className={`button button-${type}`} onClick={onClick}>
      {text && <span className="button-text">{text}</span>}
      {arrow && renderArrow(arrowDirection)}
      {imageUrl && (
        <img src={imageUrl} alt="button icon" className="button-img" />
      )}
    </button>
  );
};

export default Button;
