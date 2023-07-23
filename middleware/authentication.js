class AuthenticationMiddleware {
  /**
   * Middleware para permitir el acceso a todos los visitantes sin autenticación.
   * 
   * @param {http.IncomingMessage} req - Objeto de solicitud HTTP entrante.
   * @param {http.ServerResponse} res - Objeto de respuesta del servidor HTTP.
   * @param {function} next - Función para pasar la solicitud al siguiente middleware o controlador.
   * @returns {void}
   */
  static authenticate(req, res, next) {
    // Como no se requiere autenticación, simplemente llamamos a la función next() para pasar la solicitud al siguiente middleware o controlador.
    next();
  }
}

export default AuthenticationMiddleware;
