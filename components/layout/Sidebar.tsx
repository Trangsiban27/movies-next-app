import { Compass, ListMusic, MoreHorizontal, PlaySquare, TrendingUp, Users } from 'lucide-react';
import React from 'react'

const MENU_ITEMS = [
    { icon: Compass, label: "Browse", active: true },
    { icon: TrendingUp, label: "Trending", active: false },
    { icon: Users, label: "Following", active: false },
    { icon: PlaySquare, label: "Your Videos", active: false },
    { icon: ListMusic, label: "Playlist", active: false },
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
    return (
        <div className="flex flex-col h-full py-8 px-6">
            {/* Logo */}
            <div className="mb-10 px-2">
                <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs">B</span>
                    Bean's.<span className="text-red-600 uppercase">Tub</span>
                </h1>
            </div>

            {/* News Feed Section */}
            <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-4 px-2 tracking-widest">News Feed</p>
                <nav className="space-y-1">
                    {MENU_ITEMS.map((item) => (
                        <button
                            key={item.label}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${item.active
                                ? "bg-[#E50914] text-white shadow-lg shadow-red-900/20"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Following Section (Mini) */}
            <div className="">
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-4 px-2 tracking-widest">Following</p>
                {/* Placeholder cho list bạn bè */}
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