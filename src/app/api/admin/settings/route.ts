import { NextResponse } from 'next/server';

import { getAllConfigs } from '@/shared/models/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isPublic = searchParams.get('public') === '1';

  if (!isPublic) {
    return NextResponse.json(
      { ok: false, error: 'Only public settings are exposed here.' },
      { status: 403 }
    );
  }

  const configs = await getAllConfigs();

  return NextResponse.json({
    ok: true,
    settings: {
      paypal: {
        enabled: configs.paypal_enabled === 'true',
        mode: configs.paypal_environment === 'production' ? 'live' : 'sandbox',
        clientId: configs.paypal_client_id || '',
        currency: configs.legacy_premium_currency || 'USD',
        amount: configs.legacy_premium_amount || '9.99',
        intent: 'CAPTURE',
      },
    },
  });
}
