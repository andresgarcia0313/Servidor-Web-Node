class Router {
  constructor() {
    this.routes = [];
  }

  /** Agrega una nueva ruta y su controlador asociado al enrutador.
   * 
   * @param {string} method - Método HTTP (GET, POST, etc.).
   * @param {string} path - Ruta de la URL.
   * @param {function} handler - Controlador que manejará la acción para esta ruta.
   * @returns {void}
   */
  addRoute(method, path, handler) {
    this.routes.push({ method, path, handler });
  }

  /** Busca y devuelve la ruta y su controlador asociado correspondiente al método y la ruta proporcionados.
   * 
   * @param {string} reqMethod - Método HTTP de la solicitud entrante.
   * @param {string} reqPath - Ruta de la solicitud entrante.
   * @returns {object|null} Objeto que contiene la ruta y el controlador, o null si no se encuentra una coincidencia.
   */
  findRoute(reqMethod, reqPath) {
    // Buscar una ruta que coincida con el método HTTP y la ruta
    return this.routes.find(route => route.method === reqMethod && route.path === reqPath);
  }
}

export default Router;
