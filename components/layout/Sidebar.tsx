'use client'
import { useSidebar } from '@/hooks/useSidebar';
import { useUserStore } from '@/hooks/useUserStore';
import { Compass, ListMusic, LucideIcon, MoreHorizontal, PlaySquare, TrendingUp, Users, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface MenuItem {
    icon: LucideIcon;
    label: string;
    url: string;
}

const MENU_ITEMS: MenuItem[] = [
    { icon: Compass, label: "Browse", url: '/' },
    { icon: TrendingUp, label: "Trending", url: '/trending-movies' },
    { icon: ListMusic, label: "Favorite List", url: '/favorites' },
];

const FOLLOWING_USERS = [
    {
        name: 'John Smith',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        name: 'Emily Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        name: 'Michael Brown',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        name: 'Sophia Davis',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        name: 'Daniel Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
];

const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    const { isOpen, toggle } = useSidebar()

    useEffect(() => {
        setMounted(true);
    }, []);

    const checkActive = (itemUrl: string) => {
        if (!mounted) return false;
        if (itemUrl === '/') return pathname === '/';
        return pathname.startsWith(itemUrl);
    };



    return (
        <>
            {/* Overlay cho Mobile: Hiện khi Sidebar mở */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-99 lg:hidden"
                    onClick={toggle}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 h-full bg-[#0D0D0D] border-r border-white/5 z-100 transition-transform duration-300 ease-in-out w-70
                ${isOpen ? "translate-x-0 lg:block" : "-translate-x-full lg:hidden"}
                lg:static lg:translate-x-0
            `}>
                <div className="flex flex-col h-full py-8 px-6">
                    {/* Logo & Close Button (Mobile) */}
                    <div className="flex items-center justify-between mb-10 px-2">
                        <div className="cursor-pointer" onClick={() => { router.push('/'); if (isOpen) toggle(); }}>
                            <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                                <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">B</span>
                                <span className="text-white">Bean's.</span>
                                <span className="text-red-600 uppercase">Tub</span>
                            </h1>
                        </div>

                        {/* Nút đóng chỉ hiện trên Mobile */}
                        <button onClick={toggle} className="lg:hidden text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    {/* News Feed Section */}
                    <div className="mb-8">
                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-4 px-4 tracking-[0.2em]">News Feed</p>
                        <nav className="space-y-2">
                            {MENU_ITEMS.map((item) => {
                                const isActive = checkActive(item.url);
                                return (
                                    <button
                                        key={item.label}
                                        onClick={() => {
                                            router.push(item.url);
                                            if (isOpen) toggle(); // Đóng sidebar sau khi chọn trên mobile
                                        }}
                                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                            ? "bg-[#E50914] text-white shadow-xl shadow-red-900/30 translate-x-1"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        <item.icon
                                            size={20}
                                            strokeWidth={isActive ? 2.5 : 2}
                                            className={`transition-colors ${isActive ? "text-white" : "group-hover:text-white"}`}
                                        />
                                        <span className={`text-sm transition-all ${isActive ? "font-semibold" : "font-medium"}`}>
                                            {item.label}
                                        </span>
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Following Section */}
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-4 px-4 tracking-[0.2em]">Following</p>
                        <div className="space-y-4 px-2">
                            {/* ... (Giữ nguyên list FOLLOWING_USERS) */}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar