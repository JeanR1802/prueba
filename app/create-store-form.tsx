'use client';

import { useFormStatus } from 'react-dom';
import { createStoreAction } from './actions';

// Pequeño componente para mostrar "Creando..." en el botón mientras se envía
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {pending ? 'Creando...' : 'Crear Tienda'}
    </button>
  );
}

export function CreateStoreForm() {
  return (
    <form action={createStoreAction} className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full max-w-lg">
      <div className="relative w-full">
        <input
          type="text"
          name="slug"
          required
          pattern="[a-z0-9\-]+"
          minLength={3}
          placeholder="nombre-de-tu-tienda"
          className="w-full p-3 pr-28 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">.gestularia.com</span>
      </div>
      <SubmitButton />
    </form>
  );
}
