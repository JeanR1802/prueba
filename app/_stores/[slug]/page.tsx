// No vamos a buscar en la base de datos por ahora,
// solo queremos confirmar que la página se muestra.

export default async function StorePage({ params }: { params: { slug: string } }) {
  
  // Si llegamos aquí, significa que el middleware y el enrutamiento funcionan.
  
  return (
    <main style={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f9ff',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1e3a8a' }}>
          ¡Página Encontrada!
        </h1>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem', color: '#374151' }}>
          El subdominio detectado es: <strong style={{ color: '#1d4ed8' }}>{params.slug}</strong>
        </p>
        <p style={{ marginTop: '2rem', color: '#6b7280' }}>
          Si ves esto, el sistema de subdominios funciona.
        </p>
      </div>
    </main>
  );
}
