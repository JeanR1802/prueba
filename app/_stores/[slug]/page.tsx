import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

async function getStoreData(slug: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Variables de entorno de Supabase no encontradas.');
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: store, error } = await supabase
    .from('Store')
    .select('name, heroTitle')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGREST116') { // Ignoramos el error si no encuentra la fila
    console.error('Error de Supabase:', error);
  }
  
  return store;
}

export default async function StorePage({ params }: { params: { slug: string } }) {
  const store = await getStoreData(params.slug);

  if (!store) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Bienvenido a {store.name || 'tu tienda'}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Estás viendo la tienda del subdominio: <strong>{params.slug}</strong>
        </p>
    </main>
  );
}
