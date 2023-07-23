class ErrorUtility {
  /**
   * Envía una respuesta de error al cliente con el código de estado y el mensaje especificados.
   * 
   * @param {http.ServerResponse} res - Objeto de respuesta del servidor HTTP.
   * @param {number} statusCode - Código de estado del error.
   * @param {string} message - Mensaje del error.
   * @returns {void}
   */
  static sendErrorResponse(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>${statusCode} ${message}</h1>`);
  }
}

export default ErrorUtility;
