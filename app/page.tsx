import { CreateStoreForm } from './create-store-form';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Crea tu Tienda Online
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Elige un nombre único y lanza tu tienda en segundos.
        </p>
      </div>
      
      <CreateStoreForm />

    </main>
  );
}
