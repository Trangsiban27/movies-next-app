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
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/hooks/useSearchStore'
import { searchKeyword } from '@/services/tmdb'

const Header = () => {
    const searchContainerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { toggle, isOpen } = useSidebar()
    const { user } = useUserStore()
    const {
        isLoading,
        keywords,
        fetchKeywords
    } = useSearchStore()

    const [searchQuery, setSearchQuery] = useState("");
    const [isShow, setIsShow] = useState(false);

    const handleButtonClick = () => {
        toggle()
    }

    const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const handleClickKeyword = (keyword: { id: string, name: string }) => {
        router.push(`/search-results?query=${keyword?.name}`)
        setSearchQuery(keyword?.name)
        setIsShow(false)
    }

    useEffect(() => {
        if (searchQuery.length < 3) {
            return;
        }

        const handler = setTimeout(() => {
            fetchKeywords(searchQuery, 0).then((res) => {
                setIsShow(true)
            })
        }, 500);

        return () => {
            clearTimeout(handler);
            setIsShow(false)
        };
    }, [searchQuery])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
                setIsShow(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return (() => {
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [])

    console.log('keywords: ', keywords)

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
                    value={searchQuery}
                    type="text"
                    placeholder="Search everything"
                    className="w-full bg-white/5 border border-white/5 py-2.5 pl-12 pr-4 rounded-2xl outline-none focus:border-white/20 focus:bg-white/10 transition-all text-sm"
                    onChange={handleSearchKeyword}
                />

                {(keywords?.length > 0 && isShow) && (
                    <div ref={searchContainerRef} className="absolute h-100 overflow-y-scroll scroll-smooth top-full left-0 w-full mt-2 bg-black border border-white/10 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden backdrop-blur-xl">
                        {keywords.length > 0 ? (
                            keywords.map((item) => (
                                <div
                                    key={item.id}
                                    className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors"
                                    onClick={() => handleClickKeyword(item)}
                                >
                                    <Search size={14} className="text-gray-500" />
                                    <span className="text-sm text-gray-300">{item.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-gray-500">
                                Searching for "{searchQuery}"...
                            </div>
                        )}
                    </div>
                )}
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