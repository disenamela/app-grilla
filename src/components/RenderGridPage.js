import React from 'react'

export default class RenderGridPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pageH: null,
			maxW: null,
		}
	}
	componentDidMount() {
		let pageHeight = document.getElementById('__page').clientHeight;
		let contanerWidth = document.getElementById('__container').clientWidth;
		this.setState({ pageH: pageHeight, maxW: contanerWidth });
	}

	render() {
		let ratio = parseInt((100 / parseFloat(this.props.pageH)) * parseFloat(this.props.pageW)); // va a definir la WIDTH
		let newW = (parseInt(this.state.pageH) / 100) * ratio;
		if (newW > this.state.maxW) {
			newW = this.state.maxW;
		}

		let marginX = (100 / newW) * parseFloat(this.props.pageProps.marginX) / 2;
		let marginY = (100 / newW) * parseFloat(this.props.pageProps.marginY) / 2;
		if(marginX < 0) { marginX = 0 }
		if(marginY < 0) { marginY = 0 }
		let newP = marginY.toFixed(2) + '% ' + marginX.toFixed(2) + '%';

		let rows = parseInt(this.props.pageProps.selectedRows);
		let cols = parseInt(this.props.pageProps.selectedCols);
		let gridBoxes = [];

		for (let index = 0; index < rows * cols; index++) {
			gridBoxes.push(<div className="__module"></div>)
		}

		return (
			<div className='RenderGridPage'>
				<div className='__container' id='__container'>
					<div className='__page' id='__page' style={{ width: newW, padding: newP }}>
						<div className='__box' style={{ gridTemplateColumns: 'repeat(' + cols + ', 1fr)' }}>
							{gridBoxes}
						</div>
					</div>
				</div>
			</div>
		)
	}
}