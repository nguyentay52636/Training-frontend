"use client"

import React from 'react'
import PointStatistics from './components/PointStatistics'

export default function DashBoardManager() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6">
        <PointStatistics />
      </div>
    </div>
  )
}
