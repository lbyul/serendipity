import "./Header.css";

const Header = ({ title, leftChild, rightChild }) => {
  return (
    <header className="header">
      <nav className="header-left">{leftChild}</nav>
      <h1 className="header-center">{title}</h1>
      <nav className="header-right">{rightChild}</nav>
    </header>
  );
};

export default Header;
