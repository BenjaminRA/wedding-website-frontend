import { getGallery } from '@/lib/api';
import GalleryPage from './GalleryPage';

export const dynamic = 'force-dynamic';

async function getGalleryData(locale: string) {
  try {
    const data = await getGallery(locale);
    return data;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return null;
  }
}

export default async function Gallery() {
  const dataEn = await getGalleryData('en');
  const dataEs = await getGalleryData('es');

  return <GalleryPage dataEn={dataEn} dataEs={dataEs} />;
}
