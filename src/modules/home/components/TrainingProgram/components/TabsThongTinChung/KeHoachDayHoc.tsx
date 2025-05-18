import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import Schedule from '../Schedule/Schedule';

export default function KeHoachDayHoc() {
    return (
        <TabsContent value='schedule'>
            <Schedule />
        </TabsContent>
    )
}
