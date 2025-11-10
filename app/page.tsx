import { getWelcome } from '@/lib/api';
import WelcomePage from './WelcomePage';

export const dynamic = 'force-dynamic';

async function getWelcomeData(locale: string) {
  try {
    const data = await getWelcome(locale);
    return data;
  } catch (error) {
    console.error('Error fetching welcome data:', error);
    return null;
  }
}

export default async function Home() {
  const dataEn = await getWelcomeData('en');
  const dataEs = await getWelcomeData('es');

  return <WelcomePage dataEn={dataEn} dataEs={dataEs} />;
}
