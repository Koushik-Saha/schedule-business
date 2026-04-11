import { getStoreBySlug } from '@/lib/storeService';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const { theme } = store;

  const dynamicStyles = `
    :root {
      --primary: ${theme.primary};
      --secondary: ${theme.secondary};
      --accent: ${theme.accent};
      --font-primary: '${theme.font}', sans-serif;
    }
  `;

  return (
    <section>
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      <div style={{ fontFamily: `var(--font-primary)` }}>
        {children}
      </div>
    </section>
  );
}
