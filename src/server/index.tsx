require('dotenv').config()
import next from 'next'
import express from 'express'
import path from 'path'
import { parse, UrlWithParsedQuery } from 'url'
import {routes} from './routes'

const dev = process.env.NODE_ENV !== 'production'
const PORT = parseInt(process.env.PORT || '3000')
const publicPath =  dev ? '../../public' : '../public'

const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
	
	const server = express()

	server.use(express.json());
	
	server.get('/_next/*', (req, res) => {
		return handle(req, res)
	})
	
	server.use('/public', express.static(path.join(__dirname, publicPath)))

	// server.get('/api/*', ( req, res ) => {
	// 	console.log('GRILLA API INIT');
	// 	let url:UrlWithParsedQuery = parse(req.url, true)
	// 	return handle(req, res, url)
	// })
	// server.get(['/grilla', '/grilla/*'], ( req, res ) => {
	// 	return app.render(req, res, '/grilla/router')
	// })
	server.get('/*', ( req, res ) => {
		return handle(req, res)
		// try {
		// } catch (error) {
		// 	console.log(error);
		// 	app.render404(req, res)
		// }
	})
  
	server.listen( PORT,  () => {
		console.log(`> Ready on http://localhost:${PORT}`)
	})

}).catch( ex => {
	console.error(ex.stack);
	process.exit(1);
})