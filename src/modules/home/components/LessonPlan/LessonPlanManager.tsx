import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LessonPlanTable from './LessonPlanTable';
import AddLessonPlanDialog from './AddLessonPlanDialog';
import { useState } from 'react';

export default function LessonPlanManager() {
  const [addLessonPlanDialogOpne, setAddLessonPlanDialogOpne] = useState(false);

  return (
    <>
      <div className=' space-y-4'>
        <Card className='w-full p-5 '>
          <div className=' flex  items-center justify-between'>
            <h1 className=' text-xl font-bold'>Thông tin chung</h1>

            <Button>Thêm thông tin chung</Button>
          </div>
        </Card>
        <LessonPlanTable />
      </div>
      <AddLessonPlanDialog
        onClose={() => setAddLessonPlanDialogOpne(false)}
        open={addLessonPlanDialogOpne}
      />
    </>
  );
}
