'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createStoreAction(formData: FormData) {
  const slug = formData.get('slug') as string;

  // 1. Conectar a Supabase (usa las claves que Vercel le provee)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 2. Insertar la nueva tienda en la tabla 'Store'
  // Asegúrate de que tu tabla se llame 'Store' con 'S' mayúscula
  const { error } = await supabase.from('Store').insert({
    slug: slug,
    name: `Tienda ${slug}`, // Datos por defecto
    status: 'NOT_BUILT',
    // Puedes añadir más campos por defecto aquí si quieres
  });

  if (error) {
    // Si algo sale mal, por ahora solo lo mostraremos en los logs de Vercel
    console.error('Error al insertar en Supabase:', error);
    // Podríamos redirigir a una página de error en el futuro
    return;
  }

  // 3. Si todo sale bien, refrescamos la página y redirigimos
  revalidatePath('/'); // Le dice a Next.js que el contenido de la home puede haber cambiado
  redirect('/'); // Redirige al usuario a la página de inicio
}
