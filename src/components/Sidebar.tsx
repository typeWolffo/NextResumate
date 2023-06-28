import Link from "next/link";
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
  return (
    <div className="flex flex-col justify-between bg-black">
      <div className="mx-2 flex flex-col items-center gap-6 pt-6">
        <Link href="/">
          <SelleoLogoIcon className="text-white" />
        </Link>
        {sidebarElements.map(({ href, icon: Icon }, index) => (
          <Link href={href} key={`${index}-${href}`}>
            <Icon className="text-white" />
          </Link>
        ))}
      </div>
      <div>
        <button>
          <LogoutIcon className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
