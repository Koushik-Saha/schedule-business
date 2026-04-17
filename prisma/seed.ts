import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultHours = {
  monday: '10:00 AM - 8:00 PM',
  tuesday: '10:00 AM - 8:00 PM',
  wednesday: '10:00 AM - 8:00 PM',
  thursday: '10:00 AM - 8:00 PM',
  friday: '10:00 AM - 8:00 PM',
  saturday: '10:00 AM - 8:00 PM',
  sunday: '11:00 AM - 6:00 PM',
};

const defaultServices = [
  { id: '1', name: 'iPhone Screen Repair', price: '$89 - $329' },
  { id: '2', name: 'Samsung Screen Repair', price: '$109 - $399' },
  { id: '3', name: 'Battery Replacement', price: '$49 - $119' },
  { id: '4', name: 'Charging Port Repair', price: '$59 - $99' },
  { id: '5', name: 'Water Damage Diagnostics', price: '$49 - $149' },
];

const stores = [
  {
    slug: 'maxsb01',
    name: 'Max Phone Repair & Accessories',
    locationName: 'La Cumbre Plaza – Santa Barbara',
    address: '110 S Hope Ave Ste. H123, Santa Barbara, CA 93105',
    phone: '(818) 402-4931',
    email: 'sb@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=110+S+Hope+Ave+Ste+H123+Santa+Barbara+CA+93105&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 34.4374,
    longitude: -119.7201,
    theme: { primary: '#0f172a', secondary: '#334155', accent: '#3b82f6', font: 'Inter' },
    services: defaultServices,
    hours: defaultHours,
  },
  {
    slug: 'maxlv01',
    name: 'Max Phone Repair & Accessories',
    locationName: 'Town Square – Las Vegas',
    address: '7400 Las Vegas Blvd S Unit TT38, Las Vegas, NV 89123',
    phone: '(424) 406-6202',
    email: 'maxlv@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=7400+Las+Vegas+Blvd+S+Unit+TT38+Las+Vegas+NV+89123&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.0499,
    longitude: -115.1733,
    theme: { primary: '#0f172a', secondary: '#334155', accent: '#3b82f6', font: 'Inter' },
    services: defaultServices,
    hours: defaultHours,
  },
  {
    slug: 'maxlv02',
    name: 'Max Phone Repair & Accessories',
    locationName: 'Grand Bazaar Shops (near Starbucks) – Las Vegas',
    address: '775 S Grand Central Pkwy Unit 95, Las Vegas, NV 89106',
    phone: '',
    email: 'maxlv@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=775+S+Grand+Central+Pkwy+Unit+95+Las+Vegas+NV+89106&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.1746,
    longitude: -115.1985,
    theme: { primary: '#0f172a', secondary: '#334155', accent: '#3b82f6', font: 'Inter' },
    services: defaultServices,
    hours: defaultHours,
  },
  {
    slug: 'maxlv03',
    name: 'Max Phone Repair & Accessories',
    locationName: 'Grand Bazaar Shops (near Victoria\'s Secret) – Las Vegas',
    address: '775 S Grand Central Pkwy Unit 20, Las Vegas, NV 89106',
    phone: '',
    email: 'maxlv@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=775+S+Grand+Central+Pkwy+Unit+20+Las+Vegas+NV+89106&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.1746,
    longitude: -115.1985,
    theme: { primary: '#0f172a', secondary: '#334155', accent: '#3b82f6', font: 'Inter' },
    services: defaultServices,
    hours: defaultHours,
  },
  {
    slug: 'lv01',
    name: 'Las Vegas Phone Repair & Accessories',
    locationName: 'Town Square Mall – Las Vegas',
    address: '7400 Las Vegas Blvd S Unit TT42, Las Vegas, NV 89123',
    phone: '(424) 406-6202',
    email: 'maxlv@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=7400+Las+Vegas+Blvd+S+Unit+TT42+Las+Vegas+NV+89123&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.0499,
    longitude: -115.1733,
    theme: { primary: '#7c3aed', secondary: '#5b21b6', accent: '#a78bfa', font: 'Outfit' },
    services: defaultServices,
    hours: defaultHours,
  },
  {
    slug: 'fp01',
    name: 'Fast Phone Repair & Accessories',
    locationName: 'Town Square (Entrance-C Kiosk) – Las Vegas',
    address: '7400 S Las Vegas Blvd Entrance-C, Unit TT45, Las Vegas, NV 89123',
    phone: '',
    email: 'maxlv@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=7400+S+Las+Vegas+Blvd+Las+Vegas+NV+89123&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.0499,
    longitude: -115.1733,
    theme: { primary: '#dc2626', secondary: '#991b1b', accent: '#f87171', font: 'Roboto' },
    services: defaultServices,
    hours: defaultHours,
  },
  {
    slug: 'fixupsb01',
    name: 'FixUp - Phone Repair & Accessories',
    locationName: 'State Street – Santa Barbara',
    address: '619 A State St, Santa Barbara, CA 93101',
    phone: '(805) 857-4226',
    email: 'sb@fixupllc.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=619+A+State+St+Santa+Barbara+CA+93101&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 34.4231,
    longitude: -119.6994,
    theme: { primary: '#0891b2', secondary: '#0e7490', accent: '#06b6d4', font: 'Inter' },
    services: defaultServices,
    hours: defaultHours,
  },
  {
    slug: 'fixup01',
    name: 'FixUp - Phone Repair & Accessories',
    locationName: 'Grand Bazaar Shops (near Nike) – Las Vegas',
    address: '775 S Grand Central Pkwy Unit 32, Las Vegas, NV 89106',
    phone: '',
    email: 'support@fixupllc.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/store-exterior.png',
    mapUrl: 'https://maps.google.com/maps?q=775+S+Grand+Central+Pkwy+Unit+32+Las+Vegas+NV+89106&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.1746,
    longitude: -115.1985,
    theme: { primary: '#0891b2', secondary: '#0e7490', accent: '#06b6d4', font: 'Inter' },
    services: defaultServices,
    hours: defaultHours,
  },
];

async function main() {
  console.log('Seeding stores...');

  for (const store of stores) {
    await prisma.store.upsert({
      where: { slug: store.slug },
      update: {
        name: store.name,
        locationName: store.locationName,
        address: store.address,
        phone: store.phone,
        email: store.email,
        notificationEmail: store.notificationEmail,
        imageUrl: store.imageUrl,
        mapUrl: store.mapUrl,
        latitude: store.latitude,
        longitude: store.longitude,
        theme: store.theme,
        services: store.services,
        hours: store.hours,
      },
      create: store,
    });
    console.log(`  ✓ ${store.slug} — ${store.name} (${store.locationName})`);
  }

  console.log('\nAll stores seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
