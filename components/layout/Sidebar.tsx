'use client'
import { useUserStore } from '@/hooks/useUserStore';
import { Compass, ListMusic, LucideIcon, MoreHorizontal, PlaySquare, TrendingUp, Users } from 'lucide-react';
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

    useEffect(() => {
        setMounted(true);
    }, []);

    const checkActive = (itemUrl: string) => {
        if (!mounted) return false;
        if (itemUrl === '/') return pathname === '/';
        return pathname.startsWith(itemUrl);
    };

    return (
        <div className="flex flex-col h-full py-8 px-6">
            {/* Logo */}
            <div className="mb-10 px-2 cursor-pointer" onClick={() => router.push('/')}>
                <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">B</span>
                    Bean's.<span className="text-red-600 uppercase">Tub</span>
                </h1>
            </div>

            {/* News Feed Section */}
            <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-4 px-2 tracking-widest">News Feed</p>
                <nav className="space-y-2">
                    {MENU_ITEMS.map((item) => {
                        const isActive = checkActive(item.url);

                        return (
                            <button
                                key={item.label}
                                onClick={() => router.push(item.url)}
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

            <div className="">
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-4 px-2 tracking-widest">Following</p>

                <div className="space-y-4 px-2">
                    {FOLLOWING_USERS?.map(i => (
                        <div key={i?.name} className="flex items-center gap-3 hover:opacity-100 cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-gray-700 border border-white/10" style={{ backgroundImage: `url(${i?.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <span className="text-xs font-medium">{i?.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar