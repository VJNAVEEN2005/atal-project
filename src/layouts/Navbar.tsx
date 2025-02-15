"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "../lib/utlis";
import Navbar_menu from "../Data/Navbar_details";

export function NavbarDemo() {
  return (
    <div className="w-full  flex items-center justify-center border-b-4 rounded-3xl border-customBlue pt-2">
      <Navbar className="top-4 sticky" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("top-10 inset-x-0  mx-auto z-50", className)}
      style={{ position: "sticky" }}
    >
      <Menu setActive={setActive}>
        {Navbar_menu.map((ele, index) => {
          return (
            <MenuItem
              setActive={setActive}
              key={index}
              active={ele.drop === "active" ? active : null}
              item={ele.Title}
              link={ele.link}
            >
              <div className="flex flex-col space-y-4 text-sm">
                {ele.dropList?.map((listItem, index) => {
                  return (
                    <HoveredLink to={listItem.link} key={index}>
                      {listItem.title}
                    </HoveredLink>
                  );
                })}
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
