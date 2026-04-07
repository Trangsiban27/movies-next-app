'use client'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { useSidebar } from '@/hooks/useSidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    const { isOpen } = useSidebar()

    return (
        <div className="flex h-screen w-full bg-[#0D0D0D] text-gray-100 overflow-hidden">
            {/* 1. Sidebar bên trái - Cố định độ rộng */}
            <aside className={`hidden md:flex flex-col border-r border-white/5 bg-[#0D0D0D] ${isOpen ? 'w-65' : 'w-0 -ml-65 md:ml-0 md:w-0 overflow-hidden border-none'}`}>
                <Sidebar />
            </aside>

            {/* 2. Vùng Content bên phải */}
            <div className="flex flex-1 flex-col relative overflow-hidden">
                {/* Header nằm trên cùng của vùng content */}
                <header className="h-20 flex items-center px-8 z-20">
                    <Header />
                </header>

                {/* Main Content với thanh cuộn riêng */}
                <main className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                    <div className="max-w-400 mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default layout