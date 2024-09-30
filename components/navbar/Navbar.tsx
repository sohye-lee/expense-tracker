import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";
import ModeSwitch from "./ModeSwitch";
import Logo from "./Logo";


function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-background">
        <div className="container flex flex-row justify-between items-center flex-wrap gap-4 py-3">
          <Logo />
          <div className="hidden md:block min-w-72">
              <NavSearch />
          </div>
          <div className="flex gap-4 items-center">
            <LinksDropdown />
            <ModeSwitch />
          </div>
        </div>
    </nav>
  )
}

export default Navbar;