"use client";

import Button from "@/app/components/Button"
import PenIcon from "@/app/icons/PenIcon"
import { useState, useEffect, useRef } from "react";

export default function EditButton({ className, uploadHandler }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleClick = () => {
        console.log(menuOpen);
        setMenuOpen(!menuOpen);
    };
    const menuRef = useRef(null);
    const fileInputRef = useRef(null);

    const uploadPhoto = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        uploadHandler(file);
    }

    useEffect(() => {
        const handleOutsideClick = (e) => { 
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [menuOpen])

    return <div ref={menuRef}>
        <Button onClick={handleClick} className={`bg-white flex items-center ${className}`}>
            <PenIcon className="mr-1"/>Edit
        </Button>
        <div className={`${!menuOpen ? "hidden" : ""} py-1 relative -top-10 flex flex-col bg-white border rounded`}>
            <button onClick={uploadPhoto} className="hover:bg-blue-400 hover:text-white">Upload photo...</button>
            <button className="hover:bg-blue-400 hover:text-white">Remove photo</button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden"/>
    </div>
}



