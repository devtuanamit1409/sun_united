export const environment = {
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
  apiUrl: `${process.env.NEXT_PUBLIC_API_HOST}${process.env.NEXT_PUBLIC_API_PREFIX}`,
  apiToken: process.env.NEXT_PUBLIC_API_TOKEN,

  tawkPropertyId: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
  tawkWidgetId: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
};
