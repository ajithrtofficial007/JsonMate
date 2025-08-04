"use client";
import { WorkbenchContext } from "@/context/workbench";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

export default function Navbar(){
    var {setIsSidebarOpen} = useContext(WorkbenchContext);
    return (
        <div className="h-[5%] px-2 w-full bg-blue-600 flex justify-between items-center">
            <FontAwesomeIcon icon={faBars} onClick={(e) => setIsSidebarOpen(status => !status)} className="cursor-pointer"/>
            <h3>JsonMate</h3>
            <button className="cursor-pointer bg-white">Share Config</button>
        </div>
    )
}