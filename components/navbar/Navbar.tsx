import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";
import ModeSwitch from "./ModeSwitch";
import Logo from "./Logo";
import UserIcon from "./UserIcon";


function Navbar() {
  return (
    <nav className="border-b">
        <div className="container flex flex-row justify-between items-center flex-wrap gap-4 py-3">
            <Logo />
            <NavSearch />
            <div className="flex gap-4 items-center">
              <LinksDropdown />
              <UserIcon />
              <ModeSwitch />
            </div>
        </div>
    </nav>
  )
}

export default Navbar;