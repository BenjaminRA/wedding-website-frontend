import { getGifts } from '@/lib/api';
import GiftsPage from './GiftsPage';

export const dynamic = 'force-dynamic';

async function getGiftsData(locale: string) {
  try {
    const data = await getGifts(locale);
    return data;
  } catch (error) {
    console.error('Error fetching gifts data:', error);
    return null;
  }
}

export default async function Gifts() {
  const dataEn = await getGiftsData('en');
  const dataEs = await getGiftsData('es');

  return <GiftsPage dataEn={dataEn} dataEs={dataEs} />;
}
