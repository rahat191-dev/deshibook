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

  // 🔹 Close menus on outside click
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

  // 🔸 Icon Button component
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

  // 🔹 Handle menu toggle: close other menu if open
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

        {/* Left Side */}
        <div className="flex items-center gap-1.5">
          <Link href="/">
            <img src="/icons/brand.png" alt="Brand" className="w-8 h-8" />
          </Link>

          {/* Search Box */}
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
              <div className="flex md:hidden transition-opacity duration-300">
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

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          <IconButton href="/" iconSrc="/icons/home.png" activeIconSrc="/icons/home-hover.png" altText="Home" />
          <IconButton href="/about" iconSrc="/icons/video.png" activeIconSrc="/icons/video-hover.png" altText="Video" />
          <IconButton href="/groups" iconSrc="/icons/group.png" activeIconSrc="/icons/group-hover.png" altText="Groups" />
        </div>

        {/* Right Buttons */}
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

  {isOpenProfile && (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-green-800 rounded-lg shadow-lg flex flex-col overflow-hidden">
      <Link href="/login" className="px-4 py-2 hover:bg-green-700 text-white text-center" onClick={() => setIsOpenProfile(false)}>Login</Link>
      <Link href="/signup" className="px-4 py-2 hover:bg-green-700 text-white text-center" onClick={() => setIsOpenProfile(false)}>Signup</Link>
    </div>
  )}
</div>


          {/* Mobile Hamburger */}
          <div className="md:hidden relative">
            <IconButton iconSrc="/icons/menu.png" activeIconSrc="/icons/menu-hover.png" altText="Menu" onClick={toggleMenu} />
          </div>
        </div>
      </div>

      {isOpenMenu && (
  <div className="absolute left-1/2 mt-4 w-94 bg-green-800 rounded-lg shadow-lg flex flex-col overflow-hidden md:hidden -translate-x-1/2">
    <IconButton href="/" iconSrc="/icons/home.png" activeIconSrc="/icons/home-hover.png" altText="Home" />
    <IconButton href="/about" iconSrc="/icons/video.png" activeIconSrc="/icons/video-hover.png" altText="Video" />
    <IconButton href="/groups" iconSrc="/icons/group.png" activeIconSrc="/icons/group-hover.png" altText="Groups" />
  </div>
)}


    </nav>
  );
}
