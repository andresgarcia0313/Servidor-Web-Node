import { createServer } from 'http';
import { extname, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Router from './router.js';
import Controller from './controllers/controller.js';
import SecurityMiddleware from './middleware/security.js';
import CompressionMiddleware from './middleware/compression.js';
import AuthenticationMiddleware from './middleware/authentication.js';
import ErrorUtility from './utils/error.js';
import LoggerUtility from './utils/logger.js';

dotenv.config();

export default class HttpServer {
  constructor(port) {
    this.port = process.env.PORT || 8080;
    this.publicFolder = join(dirname(fileURLToPath(import.meta.url)), 'public');
    this.defaultFile = 'index.html';
    this.server = createServer(this.requestHandler.bind(this));
    this.router = new Router();
    this.configureRoutes();
  }
  configureRoutes() {
    this.router.addRoute('GET', '/', Controller.defaultAction);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Servidor en funcionamiento en http://localhost:${this.port}/`);
    });
  }

  async requestHandler(req, res) {
    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    SecurityMiddleware.checkSecurity(req, res);
    AuthenticationMiddleware.authenticate(req, res, () => {
      const route = this.router.findRoute(method, url.pathname);
      if (route) {
        try {
          LoggerUtility.logRequest(req);
          route.handler(req, res);
        } catch (error) {
          LoggerUtility.logError(error);
          ErrorUtility.sendErrorResponse(res, 500, 'Error del servidor');
        }
      } else
        ErrorUtility.sendErrorResponse(res, 404, 'Página no encontrada');
    });
    CompressionMiddleware.compress(req, res);

  }

  static getContentType(filePath) {
    const ext = extname(filePath);
    switch (ext) {
      case '.html':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'text/javascript';
      case '.json':
        return 'application/json';
      case '.xml':
        return 'application/xml';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      case '.svg':
        return 'image/svg+xml';
      case '.woff':
        return 'font/woff';
      case '.woff2':
        return 'font/woff2';
      case '.ttf':
        return 'font/ttf';
      case '.otf':
        return 'font/otf';
      case '.pdf':
        return 'application/pdf';
      case '.mp3':
        return 'audio/mpeg';
      case '.mp4':
        return 'video/mp4';
      case '.wav':
        return 'audio/wav';
      default:
        return 'text/plain';
    }
  }
}
// Agregar un manejador para los errores no controlados
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:');
  console.error(error);
  process.exit(1);
});

// Agregar un manejador para las promesas no manejadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:');
  console.error(reason);
  process.exit(1);
});

const server = new HttpServer();
server.start(); 
