import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // --- ¡LÓGICA MEJORADA! ---

  // Define tus dominios principales. El middleware los ignorará.
  // Añade aquí cualquier otro dominio que uses.
  const mainDomains = [
    'gestularia.com',
    'www.gestularia.com',
    'prueba-gold-six.vercel.app',
  ];

  // Si el hostname actual es uno de los dominios principales, no hacemos nada.
  if (mainDomains.includes(hostname)) {
    return NextResponse.next();
  }

  // Si no es un dominio principal, asumimos que es un subdominio de tienda.
  // Extraemos el slug (la primera parte del hostname).
  const subdomain = hostname.split('.')[0];

  // Reescribimos la URL para que apunte a la página de la tienda.
  console.log(`Rewriting for subdomain: ${subdomain}`);
  url.pathname = `/_stores/${subdomain}${url.pathname}`;
  
  return NextResponse.rewrite(url);
}

// La configuración del matcher se mantiene igual.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
