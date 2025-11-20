import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { useLocation } from "react-router-dom";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const location = useLocation();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Desktop Navbar Content */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <Link
            color={location.pathname === "/" ? "primary" : "foreground"}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={
              location.pathname === "/configurations" ? "primary" : "foreground"
            }
            href="/configurations"
          >
            Configuraties
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Navbar Content */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarItem>
          <Link
            color={location.pathname === "/" ? "primary" : "foreground"}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={
              location.pathname === "/configurations" ? "primary" : "foreground"
            }
            href="/configurations"
          >
            Configuraties
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
