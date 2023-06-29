import cx from "classnames";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import AccessibilityIcon from "public/icons/accessibility.svg";
import LogoutIcon from "public/icons/logout.svg";
import MobileIcon from "public/icons/mobile.svg";
import SelleoLogoIcon from "public/icons/new-selleo-logo.svg";
import PaletteIcon from "public/icons/palette.svg";
import SettingsIcon from "public/icons/settings.svg";
import { type ComponentType } from "react";

type SidebarElement = {
  href: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const sidebarElements: SidebarElement[] = [
  { href: "/", icon: AccessibilityIcon },
  { href: "/", icon: PaletteIcon },
  { href: "/", icon: MobileIcon },
  { href: "/settings", icon: SettingsIcon },
];
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

function Sidebar() {
  const router = useRouter();

  const getNavItemClasses = (href: string) => {
    return cx("p-2 rounded-lg transition-colors hover:bg-neutral-600", {
      "bg-neutral-600": router.pathname === href,
    });
  };

  return (
    <div className="flex flex-col justify-between bg-black">
      <div className="mx-2 flex flex-col items-center gap-6 pt-6">
        <Link href="/">
          <SelleoLogoIcon className="text-white" />
        </Link>
        {sidebarElements.map(({ href, icon: Icon }, index) => (
          <Link
            href={href}
            key={`${index}-${href}`}
            className={getNavItemClasses(href)}
          >
            <Icon className="text-white" />
          </Link>
        ))}
      </div>
      <div className="mx-2 items-center pb-6">
        <button
          className="rounded-lg p-2 transition-colors hover:bg-neutral-600"
          onClick={() => void signOut()}
        >
          <LogoutIcon className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
