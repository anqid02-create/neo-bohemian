import { NextResponse } from 'next/server';

import { getAllConfigs } from '@/shared/models/config';

async function getAccessToken(
  baseUrl: string,
  clientId: string,
  clientSecret: string
) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'paypal token failed');
  }

  return data.access_token as string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const orderID = String(body.orderID || '');
    if (!orderID) {
      return NextResponse.json(
        { ok: false, error: 'Missing orderID' },
        { status: 400 }
      );
    }

    const configs = await getAllConfigs();
    if (configs.paypal_enabled !== 'true') {
      return NextResponse.json(
        { ok: false, error: 'PayPal is disabled in ShipAny settings.' },
        { status: 400 }
      );
    }

    const clientId = configs.paypal_client_id || '';
    const clientSecret = configs.paypal_client_secret || '';
    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { ok: false, error: 'Missing PayPal credentials in ShipAny settings.' },
        { status: 400 }
      );
    }

    const baseUrl =
      configs.paypal_environment === 'production'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com';

    const accessToken = await getAccessToken(baseUrl, clientId, clientSecret);
    const response = await fetch(
      `${baseUrl}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(
      { ok: response.ok, ...data },
      { status: response.ok ? 200 : response.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Capture failed',
        details: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
