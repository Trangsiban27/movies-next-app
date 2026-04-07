'use client'
import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
    totalPages: any;
}

const PaginationCustom = ({ totalPages }: Props) => {
    console.log('totalPages: ', totalPages)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const getPages = () => {
        const pages: any[] = []

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(i)
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pages.push('ellipsis')
            }
        }

        // Loại bỏ các phần tử trùng lặp ellipsis liền kề
        return pages.filter((item, index) => !(item === 'ellipsis' && pages[index - 1] === 'ellipsis'))
    }

    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-10 mb-20">
            <PaginationContent>
                {/* Nút Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {/* Danh sách các số trang */}
                {getPages().map((page, index) => (
                    <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href={createPageURL(page)}
                                isActive={currentPage === page}
                            >
                                <span className={currentPage === page ? 'text-black' : 'text-white'}>{page}</span>
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Nút Next */}
                <PaginationItem>
                    <PaginationNext
                        href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationCustom