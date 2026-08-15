export const dynamic = 'force-dynamic';

import { getStores } from '@/lib/storeService';
import StoreListWithLocation from '@/components/store/StoreListWithLocation';
import React from 'react';

export default async function RootPage() {
  const stores = await getStores();

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <StoreListWithLocation initialStores={stores} />
    </main>
  );
}
