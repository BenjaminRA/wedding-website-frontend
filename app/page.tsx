import { getWelcome } from '@/lib/api';
import WelcomePage from './WelcomePage';

export const dynamic = 'force-dynamic';

async function getWelcomeData(locale: string) {
  try {
    const data = await getWelcome(locale);
    return data;
  } catch (error) {
    // console.log('Error fetching welcome data:', error);
    return null;
  }
}

export default async function Home() {
  const dataEn = await getWelcomeData('en');
  let dataEs = await getWelcomeData('es');

  if (!dataEs) dataEs = dataEn;

  return (
    <WelcomePage
      dataEn={dataEn}
      dataEs={dataEs}
    />
  );
}
