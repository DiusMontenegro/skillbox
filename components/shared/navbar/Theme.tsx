"use client";
import React from "react";
import { useThemeStore } from "@/store";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";

function Theme() {
    const { theme, setDark, setLight } = useThemeStore();

    return (
        <div>
            <Menubar className="relative border-none bg-transparent shadow-none">
                <MenubarMenu>
                    <MenubarTrigger>
                        {theme === "light" ? "☀️" : "🌙"}
                    </MenubarTrigger>
                    <MenubarContent className="absolute -right-12 mt-2 min-w-[110px] rounded border py-2">
                        <MenubarItem onClick={setDark}>🌙 Dark</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={setLight}>☀️ Light</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}

export default Theme;
