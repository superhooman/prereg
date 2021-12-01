import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import next from 'next';
import { APIRouter } from './api';

const port = process.env.PORT || 3020;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use('/api', APIRouter);

	server.get('/my-registrar/public-course-catalog/json', createProxyMiddleware({
		target: 'https://registrar.nu.edu.kz/',
		changeOrigin: true,
		secure: true,
	}));
	
	server.post('/my-registrar/public-course-catalog/json', createProxyMiddleware({
		target: 'https://registrar.nu.edu.kz/',
		changeOrigin: true,
		secure: true,
		onProxyReq: proxyReq => {
			proxyReq.setHeader('Host', 'registrar.nu.edu.kz');
			proxyReq.setHeader('Origin', 'https://registrar.nu.edu.kz');
			proxyReq.setHeader('Referer', 'https://registrar.nu.edu.kz/course-catalog');
		},
	}));

	server.all('*', (req, res) => handle(req, res));

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
});
