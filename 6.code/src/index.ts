import app from './app';
import ServerBootstrap from './infraestructure/bootstrap/server_bootstrap';

const server = new ServerBootstrap(app);
/**
 * async - await
 * 
 * aca estoy usando una funcion auto llamada
const start = async () => {
  try {
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (err) {
    console.error("ha ocurrido un error iniciando la app:", err);
  }
 */
// }
(async () => {
  try {
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (err) {
    console.error("ha ocurrido un error iniciando la app:", err);
  }
})();
