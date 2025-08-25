import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { hostname } = req.nextUrl;

  // Obtiene el dominio base de la URL de Vercel (ej: vercel.app)
  // Esto es para que funcione tanto en preview como en producción.
  const mainDomain = hostname.split('.').slice(-2).join('.');

  // Extrae el subdominio
  const subdomain = hostname.replace(`.${mainDomain}`, '');

  // Si no es el dominio principal y no es 'www', lo consideramos un subdominio de tienda
  if (subdomain && subdomain !== 'www') {
    console.log(`Rewriting for subdomain: ${subdomain}`);
    // Reescribe la URL internamente a la página de la tienda
    url.pathname = `/_stores/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Si no es un subdominio, no hace nada
  return NextResponse.next();
}

// Configuración para que el middleware se ejecute en todas las rutas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
