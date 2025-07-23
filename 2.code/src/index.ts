import app from './app';
import http from 'http';

const PORT = process.env.PORT || 4666;
const server = http.createServer(app);
server.listen(PORT, (): void => {
  console.log(`Server on http://localhost:${PORT}`);
});