import { getVenue } from '@/lib/api';
import VenuePage from './VenuePage';

export const dynamic = 'force-dynamic';

async function getVenueData(locale: string) {
  try {
    const data = await getVenue(locale);
    return data;
  } catch (error) {
    console.error('Error fetching venue data:', error);
    return null;
  }
}

export default async function Venue() {
  const dataEn = await getVenueData('en');
  const dataEs = await getVenueData('es');

  return <VenuePage dataEn={dataEn} dataEs={dataEs} />;
}
