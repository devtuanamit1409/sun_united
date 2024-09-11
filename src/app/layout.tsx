import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';
import TawkMessenger from './components/TawkMessenger';
import { environment } from '@/config';
import { parseStrapiObject } from '@/utils/strapi';

export const metadata: Metadata = {
  title: 'Sun United Technologies',
  description: '',
};

const getGlobalVariables = async () => {
  const { apiUrl, apiToken } = environment;

  const res = await fetch(`${apiUrl}/global`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: 'no-store',
  });
  const { data } = await res.json();

  return parseStrapiObject(data);
};

const getFooter = async () => {
  const { apiUrl, apiToken } = environment;

  const searchData = {
    populate: 'socials.icon, contacts',
  };
  const searchParams = new URLSearchParams(searchData).toString();

  const res = await fetch(`${apiUrl}/footer?${searchParams}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: 'no-store',
  });
  const { data } = await res.json();

  return parseStrapiObject(data);
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const globalVar = await getGlobalVariables();
  const footer = await getFooter();
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
        <Footer data={footer} />
        <div className='action-buttons'>
          <a href={`tel:${globalVar.phoneNumber}`}>
            <svg viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M24.4341 3.68767C23.9353 3.68062 23.4714 3.94267 23.22 4.37349C22.9685 4.8043 22.9685 5.33713 23.22 5.76794C23.4714 6.19876 23.9353 6.46081 24.4341 6.45376C31.3247 6.45376 36.8815 12.0106 36.8815 18.9011C36.8744 19.3999 37.1365 19.8638 37.5673 20.1153C37.9981 20.3667 38.5309 20.3667 38.9618 20.1153C39.3926 19.8638 39.6546 19.3999 39.6476 18.9011C39.6476 10.5155 32.8197 3.68767 24.4341 3.68767ZM12.3523 3.69848C11.8919 3.66268 11.4182 3.71368 10.9531 3.86236L8.96855 4.49805C7.00002 5.12687 5.49175 6.81201 5.00492 8.92991C3.84777 13.9623 5.23604 20.0888 9.16664 27.3092C13.0945 34.5204 17.3984 38.8562 22.0804 40.3166C24.0637 40.9353 26.2088 40.3898 27.7098 38.8832L29.2171 37.3687C30.6241 35.9561 30.8284 33.6575 29.6944 31.9914L27.4217 28.6526C26.4462 27.2198 24.7136 26.6116 23.1231 27.1417L19.6691 28.2943C19.2081 28.4483 18.691 28.3673 18.3185 28.0548C16.9124 26.8737 15.7194 25.4398 14.7402 23.7562C13.7592 22.0689 13.1262 20.3581 12.8403 18.6238C12.7657 18.1702 12.9388 17.711 13.2725 17.3938L16.2349 14.5827C17.4907 13.3915 17.8728 11.4758 17.1822 9.84653L15.5974 6.108C14.9999 4.69868 13.7335 3.80588 12.3523 3.69848ZM24.4341 9.21984C23.9353 9.21278 23.4714 9.47484 23.22 9.90565C22.9685 10.3365 22.9685 10.8693 23.22 11.3001C23.4714 11.7309 23.9353 11.993 24.4341 11.9859C28.2702 11.9859 31.3493 15.065 31.3493 18.9011C31.3423 19.3999 31.6043 19.8638 32.0351 20.1153C32.4659 20.3667 32.9988 20.3667 33.4296 20.1153C33.8604 19.8638 34.1225 19.3999 34.1154 18.9011C34.1154 13.5704 29.7648 9.21984 24.4341 9.21984ZM24.4341 14.752C23.9353 14.7449 23.4714 15.007 23.22 15.4378C22.9685 15.8686 22.9685 16.4015 23.22 16.8323C23.4714 17.2631 23.9353 17.5251 24.4341 17.5181C25.2146 17.5181 25.8172 18.1206 25.8172 18.9011C25.8101 19.3999 26.0722 19.8638 26.503 20.1153C26.9338 20.3667 27.4666 20.3667 27.8974 20.1153C28.3282 19.8638 28.5903 19.3999 28.5832 18.9011C28.5832 16.626 26.7092 14.752 24.4341 14.752Z'
                fill='white'
              />
            </svg>
          </a>
        </div>
        <TawkMessenger />
      </body>
    </html>
  );
}
