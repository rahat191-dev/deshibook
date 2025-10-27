"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false); // Mobile Hamburger Menu
  const [isOpenProfile, setIsOpenProfile] = useState(false); // Profile Menu
  const [showSearch, setShowSearch] = useState(false); // Mobile Search
  const pathname = usePathname();

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const IconButton = ({
    href,
    iconSrc,
    activeIconSrc,
    altText,
    onClick,
    noHover,
  }: {
    href?: string;
    iconSrc: string;
    activeIconSrc: string;
    altText: string;
    onClick?: () => void;
    noHover?: boolean;
  }) => {
    const isActive = href ? pathname === href : false;
    const imgSrc = noHover || !isActive ? iconSrc : activeIconSrc;

    const button = (
      <button
        onClick={onClick}
        className="w-8 h-8 rounded-2xl bg-green-700 p-1.5 flex items-center justify-center transition-all duration-300"
      >
        <img src={imgSrc} alt={altText} className="w-5 h-5" />
      </button>
    );

    return href ? <Link href={href}>{button}</Link> : button;
  };

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    if (!isOpenMenu) setIsOpenProfile(false);
  };

  const toggleProfile = () => {
    setIsOpenProfile(!isOpenProfile);
    if (!isOpenProfile) setIsOpenMenu(false);
  };

  return (
    <nav className="bg-green-900 text-white p-4 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="flex items-center gap-1.5">
          <Link href="/">
            <img src="/icons/brand.png" alt="Brand" className="w-8 h-8" />
          </Link>

          <div
            ref={searchRef}
            className={`flex items-center rounded-full px-2 py-1 transition-all duration-300 ${
              showSearch ? "bg-red-600 w-44" : "md:bg-red-600"
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              className={`bg-transparent text-white outline-none px-2 py-1 transition-all duration-300 ${
                showSearch
                  ? "w-36 opacity-100"
                  : "w-0 opacity-0 md:w-40 md:opacity-100 md:flex hidden"
              }`}
              autoFocus={showSearch}
            />

            {!showSearch && (
              <div className="flex cursor-pointer md:hidden transition-opacity duration-300">
                <IconButton
                  iconSrc="/icons/search.png"
                  activeIconSrc="/icons/search.png"
                  altText="Search"
                  onClick={() => setShowSearch(true)}
                  noHover
                />
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex space-x-10 items-center">
          <IconButton href="/" iconSrc="/icons/home.png" activeIconSrc="/icons/home-hover.png" altText="Home" />
          <IconButton href="/video" iconSrc="/icons/video.png" activeIconSrc="/icons/video-hover.png" altText="Video" />
          <IconButton href="/groups" iconSrc="/icons/group.png" activeIconSrc="/icons/group-hover.png" altText="Groups" />
        </div>

        <div className="flex space-x-2 items-center relative">
          <IconButton href="/post" iconSrc="/icons/post.png" activeIconSrc="/icons/post-hover.png" altText="Post" />
          <IconButton href="/chat" iconSrc="/icons/chat.png" activeIconSrc="/icons/chat-hover.png" altText="Chat" />
          <IconButton href="/notification" iconSrc="/icons/notification.png" activeIconSrc="/icons/notification-hover.png" altText="Notification" />

          <div className="relative">
            <IconButton
              iconSrc="/icons/profile.png"
              activeIconSrc="/icons/profile-hover.png"
              altText="Profile"
              onClick={toggleProfile}
            />
          </div>

          <div className="md:hidden relative">
            <IconButton iconSrc="/icons/menu.png" activeIconSrc="/icons/menu-hover.png" altText="Menu" onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {isOpenProfile && (
        <div className="absolute mt-4 w-94 bg-green-800 rounded-lg shadow-lg flex flex-col overflow-hidden
  left-1/2 -translate-x-1/2 md:left-auto md:right-1 md:translate-x-0">
          <Link href="/login" className="p-2 hover:bg-green-700 text-white" onClick={() => setIsOpenProfile(false)}>Login</Link>
          <Link href="/signup" className="p-2 hover:bg-green-700 text-white" onClick={() => setIsOpenProfile(false)}>Signup</Link>
        </div>
      )}

      {isOpenMenu && (
  <div className="absolute left-1/2 mt-4 w-94 bg-green-800 rounded-lg shadow-lg flex flex-col overflow-hidden md:hidden -translate-x-1/2">
    <Link
      href="/video"
      className="cursor-pointer flex items-center gap-2 p-2 hover:bg-green-700 text-white"
      onClick={() => setIsOpenMenu(false)}
    >
      <img src="/icons/video.png" alt="Video" className="w-5 h-5" />
      Video
    </Link>

    <Link
      href="/groups"
      className="cursor-pointer flex items-center gap-2 p-2 hover:bg-green-700 text-white"
      onClick={() => setIsOpenMenu(false)}
    >
      <img src="/icons/group.png" alt="Groups" className="w-5 h-5" />
      Groups
    </Link>
  </div>
)}
    </nav>
  );
}
