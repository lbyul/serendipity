import "./Header.css";

const Header = ({ title, titleLeft, titleRight, leftChild, rightChild }) => {
  return (
    <header className="header">
      {leftChild && <nav className="header-left">{leftChild}</nav>}

      {titleLeft || titleRight ? (
        <div className="header-center">
          {titleLeft}
          {title && <h1 className="title">{title}</h1>}
          {titleRight}
        </div>
      ) : (
        title && <h1 className="header-center title">{title}</h1>
      )}

      {rightChild && <nav className="header-right">{rightChild}</nav>}
    </header>
  );
};

export default Header;
