import ProfileButton from "./ProfileButton";
import HeaderRoutes from "./HeaderRoutes";
import ScrollAwareWrapper from "./ScrollAwareWrapper";
import ThemeToggleButton from "./ThemeToggle";

const NavBar = () => {
  return (
    <ScrollAwareWrapper>
      <header className="transition-colors duration-300">
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between w-full mx-auto max-w-7xl">
          <HeaderRoutes />
          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            <ProfileButton />
          </div>
        </div>
      </header>
    </ScrollAwareWrapper>
  );
};

export default NavBar;