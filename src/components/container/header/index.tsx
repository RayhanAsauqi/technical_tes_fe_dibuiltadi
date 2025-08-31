// components/app-header.tsx
import { Menu, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDarkMode } from "@/lib/context/dark-mode";

type SearchProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

interface AppHeaderProps {
  title?: string;
  subTitle?: string;
  onMenuClick?: () => void;
  search?: SearchProps;
}

export function AppHeader(props: AppHeaderProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {props.onMenuClick && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={props.onMenuClick}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}

          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {props.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              {props.subTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {props.search && (
            <div className="hidden md:flex max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder={props.search?.placeholder}
                  value={props.search?.value}
                  onChange={(e) => props.search?.onChange?.(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900"
                />
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-300"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
      </div>

      {props.search && (
        <div className="md:hidden border-t bg-white/95 dark:bg-gray-900/95 backdrop-blur px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder={props.search?.placeholder}
              value={props.search?.value}
              onChange={(e) => props.search?.onChange?.(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900"
            />
          </div>
        </div>
      )}
    </header>
  );
}
