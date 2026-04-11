'use server';

import { addStore, updateStore, Store } from './storeService';

// ... existing code ...

export async function updateStoreAction(formData: FormData, storeSlug: string) {
  const name = formData.get('name') as string;
  const locationName = formData.get('locationName') as string;
  const address = formData.get('address') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const notificationEmail = formData.get('notificationEmail') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const mapUrl = formData.get('mapUrl') as string;
  const latitude = parseFloat(formData.get('latitude') as string);
  const longitude = parseFloat(formData.get('longitude') as string);
  const primaryColor = formData.get('primaryColor') as string;
  const secondaryColor = formData.get('secondaryColor') as string;
  const accentColor = formData.get('accentColor') as string;
  const font = formData.get('font') as string;

  const hours = {
    monday: formData.get('monday') as string,
    tuesday: formData.get('tuesday') as string,
    wednesday: formData.get('wednesday') as string,
    thursday: formData.get('thursday') as string,
    friday: formData.get('friday') as string,
    saturday: formData.get('saturday') as string,
    sunday: formData.get('sunday') as string,
  };

  await updateStore(storeSlug, {
    name,
    locationName,
    address,
    phone,
    email,
    imageUrl,
    mapUrl,
    latitude,
    longitude,
    theme: { primary: primaryColor, secondary: secondaryColor, accent: accentColor, font },
    hours,
    notificationEmail
  });

  redirect(`/admin`);
}
import { prisma } from './prisma';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createStoreAction(formData: FormData) {
  const name = formData.get('name') as string;
  const locationName = formData.get('locationName') as string;
  const address = formData.get('address') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const notificationEmail = formData.get('notificationEmail') as string;
  const imageUrl = (formData.get('imageUrl') as string) || '/images/store-exterior.png';
  const mapUrl = formData.get('mapUrl') as string;
  const latitude = parseFloat(formData.get('latitude') as string);
  const longitude = parseFloat(formData.get('longitude') as string);
  const primaryColor = formData.get('primaryColor') as string;
  const secondaryColor = formData.get('secondaryColor') as string;
  const accentColor = formData.get('accentColor') as string;
  const font = formData.get('font') as string;

  const hours = {
    monday: formData.get('monday') as string,
    tuesday: formData.get('tuesday') as string,
    wednesday: formData.get('wednesday') as string,
    thursday: formData.get('thursday') as string,
    friday: formData.get('friday') as string,
    saturday: formData.get('saturday') as string,
    sunday: formData.get('sunday') as string,
  };

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + locationName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  await addStore({
    slug,
    name,
    locationName,
    address,
    phone,
    email,
    imageUrl,
    mapUrl,
    latitude,
    longitude,
    theme: { primary: primaryColor, secondary: secondaryColor, accent: accentColor, font },
    services: [
      { id: '1', name: 'iPhone Screen Repair', price: '$89 - $329' },
      { id: '2', name: 'Samsung Screen Repair', price: '$109 - $399' },
      { id: '3', name: 'Battery Replacement', price: '$49 - $119' },
      { id: '4', name: 'Charging Port Repair', price: '$59 - $99' },
      { id: '5', name: 'Water Damage Diagnostics', price: '$49 - $149' }
    ],
    hours,
    notificationEmail
  });

  redirect(`/admin`);
}

export async function bookAppointmentAction(formData: FormData, storeSlug: string) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const phoneModel = formData.get('phoneModel') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const issue = formData.get('issue') as string;

  const store = await prisma.store.findUnique({
    where: { slug: storeSlug }
  });

  if (!store) throw new Error("Store not found");

  // Save to DB
  await prisma.appointment.create({
    data: {
      storeId: store.id,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      phoneModel: phoneModel,
      issue: issue,
      date: new Date(date),
      time: time,
    }
  });

  // Send Email via Resend
  if (store.notificationEmail) {
    try {
      await resend.emails.send({
        from: 'FixUp <appointments@resend.dev>',
        to: store.notificationEmail,
        subject: `New Appointment: ${name} (${phoneModel})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h1 style="color: #0f172a; margin-bottom: 24px;">New Appointment Request</h1>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 8px 0;"><strong>Store:</strong> ${store.name} (${store.locationName})</p>
              <p style="margin: 8px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${time}</p>
            </div>

            <div style="margin-bottom: 24px;">
              <h3 style="color: #64748b; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Customer Details</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>Phone Model:</strong> ${phoneModel}</p>
            </div>

            <div>
              <h3 style="color: #64748b; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Description of Issue</h3>
              <p style="background: #f1f5f9; padding: 16px; border-radius: 8px; color: #334155;">${issue}</p>
            </div>
          </div>
        `
      });
    } catch (error) {
      console.error("Email failed:", error);
    }
  }

  return { success: true };
}
