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

const techServices = [
  { id: '1', name: 'iPhone Screen Repair', price: '$89 - $189' },
  { id: '2', name: 'Samsung Screen Repair', price: '$99 - $249' },
  { id: '3', name: 'Battery Replacement', price: '$49 - $89' },
  { id: '4', name: 'Charging Port Repair', price: '$59 - $99' },
  { id: '5', name: 'Water Damage Diagnostics', price: '$49' },
];

const jewelryServices = [
  { id: '1', name: 'Ear Piercing', price: '$30 - $60' },
  { id: '2', name: 'Nose Piercing', price: '$35 - $65' },
  { id: '3', name: 'Belly Piercing', price: '$45 - $75' },
  { id: '4', name: 'Jewelry Custom Fitting', price: '$15 - $40' },
  { id: '5', name: 'Piercing Aftercare Checkup', price: 'Free' },
];

const toyServices = [
  { id: '1', name: 'Toy Personalization & Engraving', price: '$10 - $25' },
  { id: '2', name: 'Premium Gift Wrapping', price: '$5 - $15' },
  { id: '3', name: 'Complex Toy Assembly', price: '$20 - $50' },
  { id: '4', name: 'Collector Pre-Order Reservation', price: 'Free' },
  { id: '5', name: 'Toy Safety & Diagnostics', price: 'Free' },
];

const stores = [
  {
    slug: 'fast-phone-repair-las-vegas',
    name: 'Fast Phone Repair & Accessories',
    locationName: 'Town Square – Las Vegas',
    address: '7400 S Las Vegas Blvd, Unit TT45, Las Vegas, NV 89123',
    phone: '(805) 732-5832',
    email: 'support@maxissue.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/fast-phone-repair.jpg',
    mapUrl: 'https://maps.google.com/maps?q=7400+S+Las+Vegas+Blvd+Unit+TT45+Las+Vegas+NV+89123&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.0598,
    longitude: -115.1718,
    theme: { brand: 'max', brandName: 'Max Universal Inc.', primary: '#0f172a', secondary: '#1e293b', accent: '#3b82f6', font: 'Outfit' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'fixup-phone-repair-las-vegas',
    name: 'FixUp Phone Repair & Accessories',
    locationName: 'Las Vegas North Premium Outlets – Las Vegas',
    address: '905 S Grand Central Pkwy, Las Vegas, NV 89106',
    phone: '(818) 482-3605',
    email: 'Support@fixupphone.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/fixup-phone-repair.jpg',
    mapUrl: 'https://maps.google.com/maps?q=905+S+Grand+Central+Pkwy+Las+Vegas+NV+89106&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.1648,
    longitude: -115.1583,
    theme: { brand: 'fixup', brandName: 'FixUp LLC', primary: '#022c22', secondary: '#064e3b', accent: '#10b981', font: 'Inter' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'fixup-phone-repair-lynwood',
    name: 'FixUp Phone Repair & Accessories | Reparación de Celulares',
    locationName: 'Lynwood, CA',
    address: '3100 E Imperial Hwy, Store M1002, Lynwood, CA 90262',
    phone: '(805) 857-4225',
    email: 'Support@fixupphone.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/fixup-lynwood.jpg',
    mapUrl: 'https://maps.google.com/maps?q=3100+E+Imperial+Hwy+Store+M1002+Lynwood+CA+90262&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 33.9312,
    longitude: -118.2127,
    theme: { brand: 'fixup', brandName: 'FixUp LLC', primary: '#022c22', secondary: '#064e3b', accent: '#10b981', font: 'Inter' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'fixup-phone-repair-santa-barbara',
    name: 'FixUp Phone Repair & Accessories',
    locationName: 'State Street – Santa Barbara',
    address: '619 A State St, Santa Barbara, CA 93101',
    phone: '(805) 857-4226',
    email: 'sb@fixupllc.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/fixup-santa-barbara.jpg',
    mapUrl: 'https://maps.google.com/maps?q=619+A+State+St+Santa+Barbara+CA+93101&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 34.4231,
    longitude: -119.6994,
    theme: { brand: 'fixup', brandName: 'FixUp LLC', primary: '#022c22', secondary: '#064e3b', accent: '#10b981', font: 'Inter' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'las-vegas-phone-repair',
    name: 'Las Vegas Phone Repair & Accessories',
    locationName: 'Inside the Shopping Mall – Las Vegas',
    address: '7400 Las Vegas Blvd S, Unit TT42, Las Vegas, NV 89123',
    phone: '(424) 406-6202',
    email: 'support@maxissue.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/las-vegas-phone-repair.jpg',
    mapUrl: 'https://maps.google.com/maps?q=7400+Las+Vegas+Blvd+S+Unit+TT42+Las+Vegas+NV+89123&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.0598,
    longitude: -115.1718,
    theme: { brand: 'max', brandName: 'Max Universal Inc.', primary: '#0f172a', secondary: '#1e293b', accent: '#3b82f6', font: 'Outfit' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'max-body-jewelry-ventura',
    name: 'Max Body Jewelry',
    locationName: 'Pacific View Mall – Ventura',
    address: '3301 E Main St, Unit Z33, Ventura, CA 93003',
    phone: '(818) 482-3605',
    email: 'support@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/max-body-jewelry.jpg',
    mapUrl: 'https://maps.google.com/maps?q=3301+E+Main+St+Unit+Z33+Ventura+CA+93003&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 34.2736,
    longitude: -119.2312,
    theme: { brand: 'freedom', brandName: 'Freedom Shopping LLC', primary: '#1e1b4b', secondary: '#312e81', accent: '#6366f1', font: 'Outfit' },
    services: jewelryServices,
    hours: defaultHours,
  },
  {
    slug: 'max-body-jewelry-west-covina',
    name: 'Max Body Jewelry',
    locationName: 'West Covina Mall – West Covina',
    address: '112 Plaza Dr #292, West Covina, CA 91790',
    phone: '(818) 482-3605',
    email: 'support@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/max-body-jewelry-west-covina.jpg',
    mapUrl: 'https://maps.google.com/maps?q=112+Plaza+Dr+292+West+Covina+CA+91790&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 34.0699,
    longitude: -117.9272,
    theme: { brand: 'freedom', brandName: 'Freedom Shopping LLC', primary: '#1e1b4b', secondary: '#312e81', accent: '#6366f1', font: 'Outfit' },
    services: jewelryServices,
    hours: defaultHours,
  },
  {
    slug: 'max-phone-repair-grand-central',
    name: 'Max Phone Repair & Accessories',
    locationName: 'In Front of Starbucks – Las Vegas',
    address: '775 S Grand Central Pkwy, Unit 95, Las Vegas, NV 89106',
    phone: '(805) 857-4223',
    email: 'support@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/max-phone-repair.jpg',
    mapUrl: 'https://maps.google.com/maps?q=775+S+Grand+Central+Pkwy+Unit+95+Las+Vegas+NV+89106&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.1627,
    longitude: -115.1592,
    theme: { brand: 'max', brandName: 'Max Universal Inc.', primary: '#0f172a', secondary: '#1e293b', accent: '#3b82f6', font: 'Outfit' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'max-phone-repair-town-square',
    name: 'Max Phone Repair & Accessories',
    locationName: 'Town Square – Las Vegas',
    address: '7400 Las Vegas Blvd S, Unit TT38, Las Vegas, NV 89123',
    phone: '(424) 406-6202',
    email: 'support@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/max-phone-repair.jpg',
    mapUrl: 'https://maps.google.com/maps?q=7400+Las+Vegas+Blvd+S+Unit+TT38+Las+Vegas+NV+89123&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.0598,
    longitude: -115.1718,
    theme: { brand: 'max', brandName: 'Max Universal Inc.', primary: '#0f172a', secondary: '#1e293b', accent: '#3b82f6', font: 'Outfit' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'max-phone-repair-outlet-54',
    name: 'Max Phone Repair & Accessories',
    locationName: 'Premium Outlets Unit 54 – Las Vegas',
    address: '875 S Grand Central Pkwy, Unit 54, Las Vegas, NV 89106',
    phone: '(818) 482-3605',
    email: 'support@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/max-phone-repair.jpg',
    mapUrl: 'https://maps.google.com/maps?q=875+S+Grand+Central+Pkwy+Unit+54+Las+Vegas+NV+89106&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 36.1638,
    longitude: -115.1588,
    theme: { brand: 'max', brandName: 'Max Universal Inc.', primary: '#0f172a', secondary: '#1e293b', accent: '#3b82f6', font: 'Outfit' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'max-phone-repair-santa-barbara',
    name: 'Max Phone Repair & Accessories',
    locationName: 'La Cumbre Plaza – Santa Barbara',
    address: '110 S Hope Ave, Ste H123, Santa Barbara, CA 93105',
    phone: '(818) 482-3605',
    email: 'support@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/max-phone-repair.jpg',
    mapUrl: 'https://maps.google.com/maps?q=110+S+Hope+Ave+Ste+H123+Santa+Barbara+CA+93105&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 34.4374,
    longitude: -119.7201,
    theme: { brand: 'max', brandName: 'Max Universal Inc.', primary: '#0f172a', secondary: '#1e293b', accent: '#3b82f6', font: 'Outfit' },
    services: techServices,
    hours: defaultHours,
  },
  {
    slug: 'max-toys-ventura',
    name: 'Max Toys',
    locationName: 'Pacific View Mall – Ventura',
    address: '3301 E Main St, Unit Z30A, Ventura, CA 93003',
    phone: '(805) 857-4227',
    email: 'support@maxphonefix.com',
    notificationEmail: 'rakibul2237@gmail.com',
    imageUrl: '/images/max-toys.jpg',
    mapUrl: 'https://maps.google.com/maps?q=3301+E+Main+St+Unit+Z30A+Ventura+CA+93003&t=&z=15&ie=UTF8&iwloc=&output=embed',
    latitude: 34.2736,
    longitude: -119.2312,
    theme: { brand: 'freedom', brandName: 'Freedom Shopping LLC', primary: '#1e1b4b', secondary: '#312e81', accent: '#6366f1', font: 'Outfit' },
    services: toyServices,
    hours: defaultHours,
  },
];

async function main() {
  console.log('Clearing existing stores and appointments...');
  await prisma.appointment.deleteMany({});
  await prisma.store.deleteMany({});

  console.log('Seeding updated stores (12 total)...');
  for (const store of stores) {
    await prisma.store.create({
      data: {
        slug: store.slug,
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
