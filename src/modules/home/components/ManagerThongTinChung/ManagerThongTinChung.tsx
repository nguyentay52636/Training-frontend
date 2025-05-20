import { Card } from '@/components/ui/card';
import ThongTinChungTable from './ThongTinChungTable';
import AddThongTinChungDialog from './AddThongTinChungDialog';

export default function ManagerThongTinChung() {
  return (
    <div className=' space-y-4'>
      <Card className='w-full p-5 '>
        <div className=' flex  items-center justify-between'>
          <h1 className=' text-xl font-bold'>Thông tin chung</h1>
          <AddThongTinChungDialog />
        </div>
      </Card>
      <ThongTinChungTable />
    </div>
  );
}
