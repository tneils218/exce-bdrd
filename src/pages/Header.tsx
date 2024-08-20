import { ModeToggle } from "@/components/themes/mode-toggle";
import { HomeIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between h-full p-4">
        <div className="flex items-center">
          <HomeIcon className="w-6 h-6" />
          <span className="ml-2 text-xl font-bold">MyLogo</span>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
