"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import MenuIcon from "@/app/icons/MenuIcon";
import CloseIcon from "@/app/icons/CloseIcon";
import ProfileIcon from "@/app/icons/ProfileIcon";
import NotificationIcon from "@/app/icons/NotificationsIcon";
import HomeIcon from "@/app/icons/HomeIcon";
import ProjectsIcon from "@/app/icons/ProjectsIcon";
import TeamsIcon from "@/app/icons/TeamsIcon";
import EventsIcon from "@/app/icons/EventsIcon";
import ApplicationsIcon from "@/app/icons/ApplicationsIcon";
import LinkButton from "./LinkButton";
import { signOut } from "next-auth/react";
import { getNumOfNotifications } from "@/services/user.service";
import { useEffect } from "react";

function ModalDiv({children, onClick, isOpen, className, isLeft}) { 
  const translate = isLeft ? "-translate-x-full" : "translate-x-full";
  return <div 
    onClick={onClick} 
    className={`transform ${isOpen ? "translate-x-0": translate} 
        transition-transform 
        border border-solid border-gray-300 rounded 
        w-72 absolute z-10 bg-white ${className}`}>{children}
  </div>
}

function MenuLink({href, children, onClick}) { 
  return <li onClick={onClick} className="rounded mb-2 mx-2 p-1 hover:bg-gray-200">
    <Link className="flex" href={href}>{children}</Link>
  </li>
}

export default function Header({session}) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [notificationsNum, setNotificationsNum] = useState(0);

    useEffect(() => {
        getNumOfNotifications(session.user.id).then(n => {
            setNotificationsNum(n);
        })
    }, []);

    const closeMenu = () => setIsMenuOpen(false); 
    const openMenu = () => setIsMenuOpen(true); 
    const closeProfileMenu = () => setIsProfileMenuOpen(false);
    const openProfileMenu = () => setIsProfileMenuOpen(true);

    const pageHeader = pathname === "/" ? "Dashboard" 
        : pathname.charAt(1).toUpperCase() + pathname.slice(2).split("/")[0];

    const noHeaderRoutes = ["/login", "/signup"];

    return (
      <div>
        { noHeaderRoutes.includes(pathname) 
          ? <div></div> : 
          <div>
            <div onClick={closeMenu} className={`${isMenuOpen ? "visible" : "hidden"} absolute w-full h-screen bg-gray-950/50`}></div>
            <div onClick={closeProfileMenu} className={`${isProfileMenuOpen ? "visible" : "hidden"} absolute w-full h-screen bg-gray-950/50`}></div>
            <ModalDiv isLeft={true} isOpen={isMenuOpen} className="top-0 py-4">
                <Button onClick={closeMenu} className="absolute right-4 top-4"><CloseIcon/></Button>
                <h2 className="ml-4"><b>EESTEC Hub</b></h2>
                <ul className="mt-6">
                  <MenuLink onClick={closeMenu} href="/"><HomeIcon className="mr-1"/> Home</MenuLink>            
                  <MenuLink onClick={closeMenu} href="/projects"><ProjectsIcon className="mr-1"/> Projects</MenuLink>
                  <MenuLink onClick={closeMenu} href="/teams"><TeamsIcon className="mr-1"/> Teams</MenuLink>
                  <MenuLink onClick={closeMenu} href="/events"><EventsIcon className="mr-1"/> Events</MenuLink>
                  <MenuLink onClick={closeMenu} href="/applications"><ApplicationsIcon className="mr-1"/> Applications</MenuLink> {/* This should be hidden for non-admins */}
                </ul>
            </ModalDiv>
            <ModalDiv isLeft={false} isOpen={isProfileMenuOpen} className="top-0 right-0 py-4">
                <Button onClick={closeProfileMenu} className="absolute right-4 top-4"><CloseIcon/></Button>
                <h2 className="ml-3 mr-6 px-1"><b>{session?.user?.username ?? "Unknown username"}</b></h2>
                <h2 className="ml-3 mr-6 px-1">
                  {`${session?.user?.firstName} ${session?.user?.lastName}` ?? "Unknown name"}
                </h2>
                <ul className="mt-6">
                  <MenuLink onClick={closeProfileMenu} href={`/profile/${session?.user?.username}`}><ProfileIcon className="mx-1"/> Your profile</MenuLink>
                  <MenuLink onClick={closeProfileMenu} href={`/profile/${session?.user?.username}/projects`}><ProjectsIcon className="mx-1"/>Your projects</MenuLink>
                  <MenuLink onClick={closeProfileMenu} href={`/profile/${session?.user?.username}/teams`}><TeamsIcon className="mx-1"/>Your teams</MenuLink>
                  <MenuLink onClick={closeProfileMenu} href={`/profile/${session?.user?.username}/events`}><EventsIcon className="mx-1"/>Your events</MenuLink>
                  <MenuLink onClick={closeProfileMenu} href={`/profile/${session?.user?.username}/applications`}><ApplicationsIcon className="mx-1"/>Your applications</MenuLink> {/* This should be hidden for non-admins */}
                  <Button onClick={() => signOut()} className="ml-4 mt-4">Logout</Button>
                </ul> 
            </ModalDiv>
            <div className="flex justify-between items-center py-2 border border-solid border-gray-300">
                <div className="flex items-center">
                  <Button className="mx-2" onClick={openMenu}><MenuIcon/></Button>
                  <h1><b>{pageHeader}</b></h1>
                </div>
                <div>
                  <ul className="flex items-center">
                    <li className="mx-2">
                        <LinkButton className="flex relative z-0" href="/notifications">
                            <NotificationIcon className="mr-1"/>
                            Notifications 
                            <div className="flex justify-center rounded-full
                                            items-center absolute 
                                            -right-2 -bottom-2 
                                            border border-solid w-5 h-5 
                                            bg-gray-400 text-gray-100 text-xs">
                                {notificationsNum}
                            </div>
                        </LinkButton>
                    </li>
                    <li className="mx-2"><Button onClick={openProfileMenu}><ProfileIcon/></Button></li>
                  </ul>
                </div>
            </div> 
          </div>
        }
      </div>
    )
}
