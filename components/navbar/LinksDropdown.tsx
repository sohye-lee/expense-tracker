import { Button } from "@/components/ui/button"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserIcon from "./UserIcon";
import { links } from "@/utils/links";
import Link from "next/link";
import NavSearch from "./NavSearch";
import SignOutLink from "./SignOutLink";
import { SignedIn, SignedOut, SignIn, SignInButton } from "@clerk/nextjs";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-2 flex items-center gap-2">
          <HamburgerMenuIcon />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 data-[side=right] right-2">
        <DropdownMenuItem className=" block md:hidden">
          <NavSearch />
        </DropdownMenuItem>

        <SignedIn>
          <DropdownMenuLabel>Welcome back!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {links.filter(link => link.access == 'user').map(link => <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize" target={link.target || '_self'}>
                {link.label}
              </Link>
            </DropdownMenuItem>)}
          </DropdownMenuGroup>
        </SignedIn>
        <SignedOut>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <SignInButton>
                <button className="">
                  Login
                </button>
              </SignInButton>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </SignedOut>
          <DropdownMenuItem>
            <Link href="/contact">
              Contact
            </Link>
        </DropdownMenuItem>
        <SignedIn>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {links.filter(link => link.access == 'admin').map((link) => <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize">
                {link.label}
              </Link>
            </DropdownMenuItem>)}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown;