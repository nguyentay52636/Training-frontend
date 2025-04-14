import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ManagerLectureSkeleton({ children }: { children?: React.ReactNode }) {
    return (
        <>
            {children || <Outlet />}
        </>
    )
}
