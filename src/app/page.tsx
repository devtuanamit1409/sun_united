'use server';

import { parseStrapiObject } from '@/utils/strapi';
import { environment } from '@/config';
import Home from './components/Home';

// TODO
const getHome = async () => {
  const { apiUrl, apiToken } = environment;

  const searchData = {
    populate: [
      'bannerBackground',
      'bannerButton',
      'values.icon',
      'aboutButton',
      'services.icon',
      'serviceButton',
      'projects.thumbnail',
      'clientButton',
      'customers.logo',
    ].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();

  const res = await fetch(`${apiUrl}/home?${searchParams}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: 'no-store',
  });
  const { data } = await res.json();

  return parseStrapiObject(data);
};

const PageHome = async () => {
  const data = await getHome();

  return <Home data={data} />;
};

export default PageHome;
