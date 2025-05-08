import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import TableManagerKnowledge from './components/TableManagerKnowledge'
import DialogAddManagerKnowledge from './components/DialogAddManagerKnowledge'

export default function ManagerKnowledge() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingKnowledge, setEditingKnowledge] = useState<any>(null)

    const handleOpenAddDialog = () => {
        setEditingKnowledge(null)
        setIsDialogOpen(true)
    }

    const handleEditKnowledge = (knowledge: any) => {
        setEditingKnowledge(knowledge)
        setIsDialogOpen(true)
    }

    return (
        <div className="container p-6 mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Quản lý kiến thức</h1>
                <Button
                    onClick={handleOpenAddDialog}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Thêm kiến thức mới
                </Button>
            </div>

            <TableManagerKnowledge onEditKnowledge={handleEditKnowledge} />

            <DialogAddManagerKnowledge
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                editingKnowledge={editingKnowledge}
            />

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    )
}
