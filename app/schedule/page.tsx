import { getSchedule } from '@/lib/api';
import SchedulePage from './SchedulePage';

export const dynamic = 'force-dynamic';

async function getScheduleData(locale: string) {
  try {
    const data = await getSchedule(locale);
    return data;
  } catch (error) {
    // console.error('Error fetching schedule data:', error);
    return null;
  }
}

export default async function Schedule() {
  const dataEn = await getScheduleData('en');
  let dataEs = await getScheduleData('es');

  if (!dataEs) dataEs = dataEn;

  return (
    <SchedulePage
      dataEn={dataEn}
      dataEs={dataEs}
    />
  );
}
