import React from 'react';
import DocumentMeta from 'react-document-meta';
import classNames from 'classnames'

const Header = props => (
	<header>
		<span className='a'>
			diseñame_la{props.headerTitle&&'_'}
		</span>
		{props.headerTitle&&
			<span className='b'>{props.headerTitle}</span>
		}
	</header>
)
 
class Page extends React.Component {
	render() {
		const meta = {
			title: `Diseñamela${!!this.props.title&& ' | '+this.props.title}`,
			description: 'HOLU',
			canonical: 'https://www.diseñamela.com',
			meta: {
				charset: 'utf-8',
				name: {
					keywords: 'diseño, diseño grafico, desgin'+`${
						!!this.props.keywords&& ', '+this.props.keywords
					}`
				}
			}
		};
		return (
			<div
				id='MainPage'
				className={classNames(this.props.className)}
			>
				<DocumentMeta {...meta} />
				<Header
					headerTitle={this.props.headerTitle}
				/>
				<div className={classNames(
					'__pageContent',
					{
						'fullPage': this.props.fullPage
					}
				)}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Page