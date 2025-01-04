"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "../Button";
import MenuIcon from "@/app/icons/MenuIcon";
import CloseIcon from "@/app/icons/CloseIcon";
import ProfileIcon from "@/app/icons/ProfileIcon";
import NotificationIcon from "@/app/icons/NotificationsIcon";
import HomeIcon from "@/app/icons/HomeIcon";
import ProjectsIcon from "@/app/icons/ProjectsIcon";
import TeamsIcon from "@/app/icons/TeamsIcon";
import EventsIcon from "@/app/icons/EventsIcon";
import ApplicationsIcon from "@/app/icons/ApplicationsIcon";
import LinkButton from "../LinkButton";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false); 
    const openMenu = () => setIsMenuOpen(true); 

    const MenuLink = ({href, children}) => 
      <li onClick={closeMenu} className="rounded mb-2 mx-2 p-1 hover:bg-gray-200">
        <Link className="flex" href={href}>{children}</Link>
      </li>

    const noHeaderRoutes = ["/login", "/signup"];

    return (
      <div>
        { noHeaderRoutes.includes(pathname) 
          ? <div></div>
          : <div>
          <div onClick={closeMenu} className={`${isMenuOpen ? "visible" : "hidden"} absolute w-full h-screen bg-gray-950/50`}></div>
            <div className="flex justify-between items-center mb-4 py-2 border border-solid border-gray-300">
                <div className={`${isMenuOpen ? "visible" : "hidden"} border border-solid border-gray-300 rounded py-4 w-72 absolute top-0 bg-white`}>
                    <Button onClick={closeMenu} className="absolute right-4 top-4"><CloseIcon/></Button>
                    <ul className="mt-10">
                      <MenuLink href="/"><HomeIcon className="mr-1"/> Home</MenuLink>            
                      <MenuLink href="/projects"><ProjectsIcon className="mr-1"/> Projects</MenuLink>
                      <MenuLink href="/teams"><TeamsIcon className="mr-1"/> Teams</MenuLink>
                      <MenuLink href="/events"><EventsIcon className="mr-1"/> Events</MenuLink>
                      <MenuLink href="/applications"><ApplicationsIcon className="mr-1"/> Applications</MenuLink> {/* This should be hidden for non-admins */}
                    </ul>
                </div>
                <Button className="mx-2" onClick={openMenu}><MenuIcon/></Button>
                <div>
                  <ul className="flex items-center">
                    <li onClick={closeMenu} className="mx-2"><LinkButton className="flex" href="/notifications"><NotificationIcon className="mr-1"/> Notifications</LinkButton></li>
                    <li onClick={closeMenu} className="mx-2"><LinkButton className="flex" href="/profile"><ProfileIcon/></LinkButton></li>
                  </ul>
                </div>
            </div> 
          </div>
        }
      </div>
    )
}
