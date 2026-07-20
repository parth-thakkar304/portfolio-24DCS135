function Header({ name, subtitle, themeColor }) {
  const headerStyle = themeColor ? { color: themeColor } : {};
  
  return (
    <header className="header-section">
      <div className="header-title-wrapper">
        <h1 className="header-name" style={headerStyle}>
          {name}
        </h1>
      </div>
      <p className="header-subtitle">{subtitle || "Student Portfolio"}</p>
    </header>
  );
}

export default Header;