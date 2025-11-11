import { getDressCode } from '@/lib/api';
import DressCodePage from './DressCodePage';

export const dynamic = 'force-dynamic';

async function getDressCodeData(locale: string) {
  try {
    const data = await getDressCode(locale);
    return data;
  } catch (error) {
    // console.error('Error fetching dress code data:', error);
    return null;
  }
}

export default async function DressCode() {
  const dataEn = await getDressCodeData('en');
  let dataEs = await getDressCodeData('es');

  if (!dataEs) dataEs = dataEn;

  return (
    <DressCodePage
      dataEn={dataEn}
      dataEs={dataEs}
    />
  );
}
