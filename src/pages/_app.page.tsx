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
					<link href="https://fonts.googleapis.com/css?family=Inconslata:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
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