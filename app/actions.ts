'use server';

import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function createStoreAction(formData: FormData) {
  const slug = formData.get('slug') as string;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.from('Store').insert({
    slug: slug,
    name: `Tienda ${slug}`,
    status: 'NOT_BUILT',
  });

  if (error) {
    console.error('Error al insertar en Supabase:', error);
    return;
  }

  // --- ¡CAMBIO IMPORTANTE AQUÍ! ---
  // Ahora redirigimos al subdominio recién creado.
  // NOTA: Cambia "prueba-gold-six.vercel.app" por el dominio principal de tu proyecto en Vercel.
  const domain = 'gestularia.com';
  const newUrl = `https://${slug}.${domain}`;
  
  redirect(newUrl);
}
