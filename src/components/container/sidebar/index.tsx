import { useState, useEffect } from "react";
import { Users, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { sidebarItems } from "@/lib/constants/sidebar";
import Cookies from "js-cookie";
import { Logout } from "@/lib/api/auth-api";

type ImprovedSidebarProps = {
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
};

interface UserData {
  name: string;
  email: string;
  profileImage?: string;
  roleName: string;
}

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

const getInitialSidebarState = () => {
  if (typeof window === "undefined") return false;
  return !getIsMobile();
};

export function Sidebar({ className, isOpen: controlledIsOpen, onToggle }: ImprovedSidebarProps) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isMobile, setIsMobile] = useState(() => getIsMobile());
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(() => getInitialSidebarState());
  const location = useLocation();

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setUserData({
          name: user.name || "User",
          email: user.email || "",
          profileImage: user.profileImage,
          roleName: user.roleName || "User",
        });
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/" && location.pathname === "/") {
      return true;
    }
    if (href !== "/" && location.pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    onToggle?.(newIsOpen);
  };

  const handleLinkClick = () => {
    if (isMobile && isOpen) {
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(false);
      }
      onToggle?.(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = getIsMobile();
      setIsMobile(mobile);
      if (mobile && controlledIsOpen === undefined) {
        setInternalIsOpen(false);
        onToggle?.(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [controlledIsOpen, onToggle]);

  const handleLogout = async () => {
    await Logout();
    navigate("/auth");
  };

  const userOptions = [
    {
      value: "profile",
      label: "Profile",
      to: "/profile",
      icon: User,
      action: () => setComboboxOpen(false),
    },
    {
      value: "logout",
      label: "Logout",
      icon: LogOut,
      action: handleLogout,
    },
  ];

  return (
    <>
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={handleToggle} />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground border transition-all duration-300",
          isMobile ? (isOpen ? "w-64" : "w-0 overflow-hidden") : isOpen ? "w-64" : "w-16",
          className
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {isOpen && <h2 className="text-xl font-bold truncate">Dashboard</h2>}
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
            onClick={handleToggle}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-3 px-2">
            {sidebarItems.map((item) => {
              const isActive = isLinkActive(item.href);

              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isActive ? "bg-sidebar-primary/60" : " hover:bg-sidebar-accent ",
                      !isOpen && "justify-center"
                    )}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {isOpen && <span className="ml-3 truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={cn("p-4 border-t border-sidebar-border", isMobile && !isOpen && "hidden")}>
          <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                role="combobox"
                aria-expanded={comboboxOpen}
                className={cn(
                  "w-full justify-between h-auto p-2 hover:bg-sidebar-accent text-sidebar-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0 overflow-hidden">
                    {userData?.profileImage ? (
                      <img
                        src={userData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users size={16} />
                    )}
                  </div>

                  {isOpen && (
                    <div className="ml-3 min-w-0 text-left">
                      <p className="text-sm font-medium truncate">{userData?.name || "User"}</p>
                      <p className="text-xs text-sidebar-foreground/60 truncate">
                        {userData?.email || userData?.roleName || ""}
                      </p>
                    </div>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {userOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        asChild
                        className={cn(
                          "cursor-pointer p-3",
                          option.value === "logout" && "text-red-600 focus:text-red-600"
                        )}
                      >
                        {option.to ? (
                          <Link
                            to={option.to}
                            onClick={() => setComboboxOpen(false)}
                            className="flex items-center w-full"
                          >
                            <option.icon className="mr-2 h-4 w-4" />
                            {option.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              option.action?.();
                            }}
                            className="flex items-center w-full text-left"
                          >
                            <option.icon className="mr-2 h-4 w-4" />
                            {option.label}
                          </button>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </aside>
    </>
  );
}
