class SecurityMiddleware {
  static checkSecurity(req, res, next) {
    // Implementa aquí las medidas de seguridad necesarias, como control de acceso, detección de ataques, etc.

    // Ejemplo: Permitir el acceso desde cualquier origen (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Ejemplo: Implementar encabezados de seguridad adicionales para mitigar vulnerabilidades
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
 
    // Llamamos a la función next() solo si hay un siguiente middleware o controlador.
    if (typeof next === 'function') next();
    
  }
}

export default SecurityMiddleware;

