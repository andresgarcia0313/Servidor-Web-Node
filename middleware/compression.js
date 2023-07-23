import { createGzip } from 'zlib';

class CompressionMiddleware {
  static async compress(req, res, next) {
    const acceptEncoding = req.headers['accept-encoding']?.trim();
    console.log(acceptEncoding);
    if (!acceptEncoding?.match(/\b(?:gzip)\b/)) {
      // Si el cliente no admite la compresión gzip, simplemente llamamos a la función next() sin comprimir el contenido.
      if (typeof next === 'function') {
        await next(); // Asegurarnos de que next() se ejecute correctamente antes de continuar.
      }
    } else {
      console.log("sin implementar aquì la compression.js");
    }
  }
}

export default CompressionMiddleware;
