import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // --- ¡LÓGICA MEJORADA Y MÁS ROBUSTA! ---

  console.log(`[Middleware] Hostname recibido: ${hostname}`);

  // Comprobamos si el hostname es un dominio principal o una URL de Vercel.
  if (
    hostname === 'gestularia.com' ||
    hostname === 'www.gestularia.com' ||
    hostname.endsWith('.vercel.app') // Esto ignora todas las URLs de Vercel.
  ) {
    console.log(`[Middleware] El hostname es un dominio principal o de Vercel. No se reescribe.`);
    return NextResponse.next();
  }

  // Si no es ninguno de los anteriores, es un subdominio de tienda.
  const subdomain = hostname.split('.')[0];
  console.log(`[Middleware] El hostname es un subdominio de tienda: "${subdomain}"`);

  // Reescribimos la ruta para que apunte a la página de la tienda.
  const rewritePath = `/_stores/${subdomain}${url.pathname}`;
  console.log(`[Middleware] Reescribiendo la ruta a: ${rewritePath}`);
  url.pathname = rewritePath;
  
  return NextResponse.rewrite(url);
}

// La configuración del matcher se mantiene igual.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
