'use client'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useRef } from 'react';

import { environment } from '@/config';

export default function TawkMessenger() {
  const tawkMessengerRef = useRef(null);

  if (!environment.tawkPropertyId || !environment.tawkWidgetId) {
    return null;
  }

  const customStyle = {
    visibility: {
      desktop: {
        xOffset: 16,
        yOffset: 16,
        position: 'br'
      },
      mobile: {
        xOffset: 16,
        yOffset: 16,
        position: 'br'
      }
    }
  };

  return (
    <TawkMessengerReact
      propertyId={environment.tawkPropertyId}
      widgetId={environment.tawkWidgetId}
      ref={tawkMessengerRef}
      customStyle={customStyle}
    />
  )
}
