import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // --- ¡LÓGICA MEJORADA CON LOGS DE DEPURACIÓN! ---

  // Log para cada petición que entra al middleware
  console.log(`[Middleware] Hostname recibido: ${hostname}`);

  const mainDomains = [
    'gestularia.com',
    'www.gestularia.com',
    'prueba-gold-six.vercel.app',
  ];

  // Comprobamos si el hostname es uno de los dominios principales
  if (mainDomains.includes(hostname)) {
    console.log(`[Middleware] El hostname es un dominio principal. No se reescribe.`);
    return NextResponse.next();
  }

  // Si llegamos aquí, no es un dominio principal. Lo tratamos como subdominio.
  const subdomain = hostname.split('.')[0];
  console.log(`[Middleware] El hostname es un subdominio: "${subdomain}"`);

  // Reescribimos la ruta para que apunte a la página de la tienda
  const rewritePath = `/_stores/${subdomain}${url.pathname}`;
  console.log(`[Middleware] Reescribiendo la ruta a: ${rewritePath}`);
  url.pathname = rewritePath;
  
  return NextResponse.rewrite(url);
}

// La configuración del matcher se mantiene igual.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
