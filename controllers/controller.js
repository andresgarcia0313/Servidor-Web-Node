import HttpServer from '../server.js';
import ErrorUtility from '../utils/error.js';
import { readFile } from 'fs/promises';
import { createGzip } from 'zlib'; // Importar createGzip

class Controller {
  /**
   * Maneja la acción por defecto para la ruta raíz ("/").
   * 
   * @param {http.IncomingMessage} req - Objeto de solicitud HTTP entrante.
   * @param {http.ServerResponse} res - Objeto de respuesta del servidor HTTP.
   * @returns {Promise<void>} Una promesa que se resuelve una vez que se ha completado la manipulación de la solicitud.
   */
  static async defaultAction(req, res) {
    const filePath = 'public/index.html'; // Ruta del archivo index.html
    let contentType = HttpServer.getContentType(filePath); // Obtener el tipo de contenido MIME del archivo
    try {
      // Leer el contenido del archivo index.html
      const content = await readFile(filePath);
      if (contentType === "text/html") contentType = "text/html; charset=utf-8";
      // Verificar si el cliente admite la compresión gzip
      const acceptEncoding = req.headers['accept-encoding']?.trim();
      if (acceptEncoding?.match(/\b(?:gzip)\b/)) {
        console.log("Comprimio en controller")
        // Si el cliente admite la compresión gzip, comprimimos el contenido antes de enviarlo.
        const gzip = createGzip();
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip' // Indicar que el contenido está comprimido con gzip.
        });
        gzip.pipe(res); // Usar pipe para enviar el contenido comprimido al cliente.
        gzip.end(content); // Comprimir y enviar el contenido al cliente.
      } else {
        // Si el cliente no admite la compresión gzip, enviamos el contenido sin comprimir.
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    } catch (error) {
      // En caso de error, enviar una respuesta con código de estado 500 y mensaje de error
      console.error(error); // Agregamos esta línea para imprimir el error en la consola
      ErrorUtility.sendErrorResponse(res, 500, 'Error del servidor');
    }
  }

  // Si tienes más acciones para otras rutas, puedes agregar más métodos de acción aquí.
}

export default Controller;
