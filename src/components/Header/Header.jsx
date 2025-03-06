import "./Header.css";

const Header = ({ title, leftChild, rightChild }) => {
  return (
    <header className="header">
      {leftChild && <nav className="header-left">{leftChild}</nav>}
      {title && <h1 className="header-center">{title}</h1>}
      {rightChild && <nav className="header-right">{rightChild}</nav>}
    </header>
  );
};

export default Header;
