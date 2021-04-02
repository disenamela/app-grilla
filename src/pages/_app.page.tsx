import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { theme } from '@theme'
import '../styles/styles.globals.scss'

const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Inconsolata', sans-serif;
		min-height: 100%;
		font-size: 1.4rem;
	}
	*, h1, h2, h3, h4, p, a, button {
		padding: 0;
		margin: 0;
	}
`

export default function App({ Component, pageProps }: any) {
	const Layout = Component.Layout ? Component.Layout : React.Fragment;
	const LayoutProps = Component.LayoutProps ? Component.LayoutProps : {};

	return (
		<div id='app'>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Head>
					<title>Diseñamela / Grilla Editorial</title>
					<meta name="og:title" content={'Diseñamela / Grilla Editorial'} />
					<meta name="og:sitename" content="Diseñamela" />
					<meta name="description" content={'Pequeña app dedicada a la creación de grillas editoriales. Para que pensar la grilla no sea un dolor de cabeza.'} />
					<meta name="og:description" content={'Pequeña app dedicada a la creación de grillas editoriales. Para que pensar la grilla no sea un dolor de cabeza.'} />
					<meta name="lang" content={'ES'} />
					<meta name="og:locale" content={'ES'} />
					<meta name="og:url" content={"https://grill.adiseñamela.com"} />
					<link rel="image_src" href={'/logo-diseñamela.png'} />
					<meta name="og:image" content={'/logo-diseñamela.png'} />

					<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
					<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
					<link rel="manifest" href="/favicon/manifest.json" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
					<meta name="theme-color" content="#ffffff" />

				</Head>

				<Layout {...LayoutProps}>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</div>
	)
}

App.getInitialProps = async () => {
	return {}
}