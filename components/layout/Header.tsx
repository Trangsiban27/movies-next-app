'use client'
import { IMAGE_BASE_URL } from '@/constants/imageBaseUrl'
import { useSidebar } from '@/hooks/useSidebar'
import { useUserStore } from '@/hooks/useUserStore'
import { Bell, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const { toggle, isOpen } = useSidebar()
    const { user } = useUserStore()

    const handleButtonClick = () => {
        toggle()
    }

    return (
        <div className="w-full flex items-center justify-between">
            {/* Nút Back */}
            <button className="p-2.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleButtonClick()}>
                {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            {/* Thanh Search bự ở giữa */}
            <div className="flex-1 max-w-xl mx-8 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Search everything"
                    className="w-full bg-white/5 border border-white/5 py-2.5 pl-12 pr-4 rounded-2xl outline-none focus:border-white/20 focus:bg-white/10 transition-all text-sm"
                />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2.5 text-gray-400 hover:text-white transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-600 rounded-full border-2 border-[#0D0D0D]" />
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 cursor-pointer">
                            <img
                                src={`${IMAGE_BASE_URL}${user?.avatar?.tmdb?.avatar_path}`}
                                alt="User"
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/avatar-default.svg";
                                }}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="start">
                        <DropdownMenuItem
                            className='cursor-pointer'
                            onClick={() => {
                                router.push(`/profile/${user?.id}`)
                            }}
                        >
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className='cursor-pointer'
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div >
    )
}

export default Header