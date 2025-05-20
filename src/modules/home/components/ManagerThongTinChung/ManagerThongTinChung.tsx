import { Card } from '@/components/ui/card';
import ThongTinChungTable from './ThongTinChungTable';
import AddThongTinChungDialog from './AddThongTinChungDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ManagerThongTinChung() {
  const [addThongTinChungDialogOpne, setAddThongTinChungDialogOpne] = useState(false);

  return (
    <>
      <div className=' space-y-4'>
        <Card className='w-full p-5 '>
          <div className=' flex  items-center justify-between'>
            <h1 className=' text-xl font-bold'>Thông tin chung</h1>

            <Button>Thêm thông tin chung</Button>
          </div>
        </Card>
        <ThongTinChungTable />
      </div>
      <AddThongTinChungDialog
        onClose={() => setAddThongTinChungDialogOpne(false)}
        open={addThongTinChungDialogOpne}
      />
    </>
  );
}
