class LoggerUtility {
  /**
   * Registra una solicitud en la consola con información sobre el método HTTP y la ruta solicitada.
   * 
   * @param {http.IncomingMessage} req - Objeto de solicitud HTTP entrante.
   * @returns {void}
   */
  static logRequest(req) {
    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(`[${new Date().toISOString()}] ${method} ${url.pathname}`);
  }

  /**
   * Registra un error en la consola junto con el mensaje de error.
   * 
   * @param {Error} error - Objeto de error.
   * @returns {void}
   */
  static logError(error) {
    console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
    // Puedes agregar aquí código adicional para enviar notificaciones por correo electrónico o almacenar los errores en un archivo de registro, dependiendo de tus necesidades.
  }
}

export default LoggerUtility;
