import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // --- LÓGICA BASADA EN EL EJEMPLO OFICIAL DE VERCEL ---

  // Obtenemos el dominio raíz desde las variables de entorno.
  // Es más flexible que tener una lista fija en el código.
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'gestularia.com';

  console.log(`[Middleware] Hostname: ${hostname}, Root Domain: ${rootDomain}`);

  // Si el hostname es exactamente el dominio raíz (con o sin www),
  // no hacemos nada y mostramos la página principal.
  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    console.log('[Middleware] Es un dominio principal. No se reescribe.');
    return NextResponse.next();
  }

  // Si el hostname es diferente, extraemos el subdominio.
  // Esta lógica extrae "tienda" de "tienda.gestularia.com".
  const subdomain = hostname.replace(`.${rootDomain}`, '');

  // Evitamos que las URLs de Vercel (ej: prueba-gold-six.vercel.app)
  // se traten como subdominios.
  if (subdomain === hostname) {
     console.log('[Middleware] Es una URL de Vercel o un dominio no relacionado. No se reescribe.');
     return NextResponse.next();
  }

  console.log(`[Middleware] Subdominio de tienda detectado: "${subdomain}"`);

  // Reescribimos la ruta para que apunte a la página de la tienda.
  const rewritePath = `/_stores/${subdomain}${url.pathname}`;
  console.log(`[Middleware] Reescribiendo la ruta a: ${rewritePath}`);
  url.pathname = rewritePath;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
