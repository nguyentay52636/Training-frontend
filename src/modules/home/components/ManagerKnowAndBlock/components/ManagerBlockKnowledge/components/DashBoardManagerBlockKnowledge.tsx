import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Library, BarChart3, Layers } from 'lucide-react'

interface DashBoardManagerBlockKnowledgeProps {
    totalBlocks: number
    totalKnowledges: number
    emptyBlocks: number
    avgKnowledgePerBlock: number
    filteredCount: number
    isLoading: boolean
}

type CardType = 'blocks' | 'knowledge' | 'empty' | 'average'

export default function DashBoardManagerBlockKnowledge({
    totalBlocks,
    totalKnowledges,
    emptyBlocks,
    avgKnowledgePerBlock,
    filteredCount,
    isLoading
}: DashBoardManagerBlockKnowledgeProps) {
    const [activeCard, setActiveCard] = useState<CardType | null>('blocks')
    const emptyBlocksPercent = Math.round((emptyBlocks / totalBlocks) * 100) || 0

    const getCardClassName = (cardType: CardType) => {
        return activeCard === cardType
            ? "bg-blue-700 text-white cursor-pointer hover:bg-blue-800 transition-all"
            : "cursor-pointer hover:bg-blue-50 transition-all"
    }

    const getTextClassName = (cardType: CardType) => {
        return activeCard === cardType ? "text-white" : "text-muted-foreground"
    }

    const handleCardClick = (cardType: CardType) => {
        setActiveCard(cardType === activeCard ? null : cardType)
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card
                className={getCardClassName('blocks')}
                onClick={() => handleCardClick('blocks')}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Tổng số khối kiến thức
                    </CardTitle>
                    <Layers className={`h-4 w-4 ${getTextClassName('blocks')}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalBlocks}</div>
                    <p className={`text-xs mt-1 ${getTextClassName('blocks')}`}>
                        {isLoading ? 'Đang tải...' : `${filteredCount} khối hiển thị`}
                    </p>
                </CardContent>
            </Card>

            <Card
                className={getCardClassName('knowledge')}
                onClick={() => handleCardClick('knowledge')}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Tổng số kiến thức
                    </CardTitle>
                    <BookOpen className={`h-4 w-4 ${getTextClassName('knowledge')}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalKnowledges}</div>
                    <p className={`text-xs mt-1 ${getTextClassName('knowledge')}`}>
                        Trong tất cả các khối kiến thức
                    </p>
                </CardContent>
            </Card>

            <Card
                className={getCardClassName('empty')}
                onClick={() => handleCardClick('empty')}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Khối không có kiến thức
                    </CardTitle>
                    <Library className={`h-4 w-4 ${getTextClassName('empty')}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{emptyBlocks}</div>
                    <p className={`text-xs mt-1 ${getTextClassName('empty')}`}>
                        {emptyBlocksPercent}% tổng số khối
                    </p>
                </CardContent>
            </Card>

            <Card
                className={getCardClassName('average')}
                onClick={() => handleCardClick('average')}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Trung bình kiến thức/khối
                    </CardTitle>
                    <BarChart3 className={`h-4 w-4 ${getTextClassName('average')}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{avgKnowledgePerBlock}</div>
                    <p className={`text-xs mt-1 ${getTextClassName('average')}`}>
                        Kiến thức trong mỗi khối
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
