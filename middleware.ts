import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // Tu dominio principal
  const rootDomain = 'gestularia.com';

  // Ignora el dominio principal y las URLs de Vercel
  if (
    hostname === rootDomain ||
    hostname === `www.${rootDomain}` ||
    hostname.endsWith('.vercel.app')
  ) {
    return NextResponse.next();
  }

  // Extrae el subdominio
  const subdomain = hostname.replace(`.${rootDomain}`, '');

  // Reescribe la URL a una carpeta con el mismo nombre que el subdominio
  // Ejemplo: "tienda1.gestularia.com" -> "/tienda1"
  url.pathname = `/${subdomain}${url.pathname}`;
  
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
