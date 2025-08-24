import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="header__title">Where in the world?</h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
