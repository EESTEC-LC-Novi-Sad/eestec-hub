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

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
      setIsOpen(false);
    }
    const openMenu = () => {
      setIsOpen(true);
    }

    const noHeaderRoutes = ["/login", "/signup"];
    return (
      <div>
        { noHeaderRoutes.includes(pathname) ? <div></div>
          : <div className="flex justify-between mb-4 py-4 border border-solid border-gray-300">
              <div className={`${isOpen ? "visible" : "hidden"} border border-solid border-gray-300 rounded py-4 w-72 absolute top-0 bg-white`}>
                  <Button onClick={closeMenu} className="absolute right-4 top-4"><CloseIcon/></Button>
                  <ul className="mt-10">
                    <li onClick={closeMenu} className="rounded mb-2 mx-2 p-1 hover:bg-gray-200"><Link className="flex" href="/"><HomeIcon className="mr-1"/> Home</Link></li>
                    <li onClick={closeMenu} className="rounded mb-2 mx-2 p-1 hover:bg-gray-200"><Link className="flex" href="/projects"><ProjectsIcon className="mr-1"/> Projects</Link></li>
                    <li onClick={closeMenu} className="rounded mb-2 mx-2 p-1 hover:bg-gray-200"><Link className="flex" href="/teams"><TeamsIcon className="mr-1"/>Teams</Link></li>
                    <li onClick={closeMenu} className="rounded mb-2 mx-2 p-1 hover:bg-gray-200"><Link className="flex" href="/events"><EventsIcon className="mr-1"/>Events</Link></li>
                    <li onClick={closeMenu} className="rounded mb-2 mx-2 p-1 hover:bg-gray-200"><Link className="flex" href="/applications"><ApplicationsIcon className="mr-1"/>Applications</Link></li> {/* This should be hidden for non-admins */}
                  </ul>
              </div>
              <Button className="mx-2" onClick={openMenu}><MenuIcon/></Button>
              <div>
                <ul className="flex">
                  <li onClick={closeMenu} className="mx-2"><Link href="/notifications"><NotificationIcon/></Link></li>
                  <li onClick={closeMenu} className="mx-2"><Link href="/profile"><ProfileIcon/></Link></li>
                </ul>
              </div>
            </div> 
        }
      </div>
    )
}
