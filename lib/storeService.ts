import { prisma } from './prisma';
import { Prisma, Store as PrismaStore } from '@prisma/client';

export interface StoreTheme {
  primary: string;
  secondary: string;
  font: string;
  accent: string;
}

export interface StoreHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface StoreServiceItem {
  id: string;
  name: string;
  price?: string;
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  locationName: string;
  address: string;
  phone: string;
  email: string;
  imageUrl: string;
  mapUrl: string;
  theme: StoreTheme;
  services: StoreServiceItem[];
  hours: StoreHours;
  notificationEmail?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export async function getStores(): Promise<Store[]> {
  const stores = await prisma.store.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return stores.map((s: PrismaStore) => ({
    ...s,
    theme: s.theme as unknown as StoreTheme,
    services: s.services as unknown as StoreServiceItem[],
    hours: s.hours as unknown as StoreHours,
  }));
}

export async function getStoreBySlug(slug: string): Promise<Store | undefined> {
  const store = await prisma.store.findUnique({
    where: { slug },
  });
  if (!store) return undefined;
  return {
    ...store,
    theme: store.theme as unknown as StoreTheme,
    services: store.services as unknown as StoreServiceItem[],
    hours: store.hours as unknown as StoreHours,
  };
}

export async function addStore(store: Omit<Store, 'id'>): Promise<void> {
  await prisma.store.create({
    data: {
      ...store,
      theme: store.theme as unknown as Prisma.InputJsonValue,
      services: store.services as unknown as Prisma.InputJsonValue,
      hours: store.hours as unknown as Prisma.InputJsonValue,
    },
  });
}

export async function updateStore(slug: string, storeData: Partial<Store>): Promise<void> {
  await prisma.store.update({
    where: { slug },
    data: {
      ...storeData,
      theme: storeData.theme as unknown as Prisma.InputJsonValue,
      services: storeData.services as unknown as Prisma.InputJsonValue,
      hours: storeData.hours as unknown as Prisma.InputJsonValue,
    },
  });
}
