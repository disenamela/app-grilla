import React from 'react'
import Page from '../layouts/main/main'
import Input from '../components/Input'
import SelectGrid from '../components/SelectGrid'
import RenderGridPage from '../components/RenderGridPage'

class GrillaApp extends React.Component {
	constructor(props) {
		super(props)
		this.defaults = {
			pageW: 210,
			pageH: 297,
			lineSize: 12,
			boxW: 41,
			boxH: 62,
			marginT: 20
		}
		this.state = {
			...this.defaults,
			pageProps: {
				marginY: 0,
				marginX: 0,
				marginBottom: 0,
				possibleCols: [],
				possibleRows: [],
				selectedCols: 1,
				selectedRows: 1
			}
		}
	}
	componentDidMount() {
		this.recalcular()
	}
	handleChange = e => {
		const name = e.target.name
		let value = e.target.value
		if(value!=NaN) {
			this.setState(
				()=>({[name]: value}),
				this.recalcular
			)
		}
	}
	changeGridSelection = (number, prop) => {
		this.setState(prevState=>{
			let pageProps = {...prevState.pageProps}
			pageProps['selected'+prop] = number
			return {pageProps}
		})
	}
	recalcular = () => {
		let inputs = {...this.state}
		delete inputs['pageProps']
		let valid = true
		Object.entries(inputs).map( o =>{
			inputs[o[0]] = parseInt(o[1])
			if(!parseInt(o[1]) || parseInt(o[1]) < 0) {
				valid=false
			}
		})
		if(!valid) {
			return true
		}
		
		const lineHeight_mm = this.state.lineSize * 0.3527777778
		const boxHeight_mm = this.state.boxH * lineHeight_mm
		const boxWith_mm = this.state.boxW * lineHeight_mm
		const marginBottom = this.state.pageH - this.state.marginT - boxHeight_mm
		const marginX = (this.state.pageW - boxWith_mm) / 2
		const marginY = (this.state.pageH - boxHeight_mm) / 2

		let possibleCols = []
		let possibleRows = []

		for(let i=1; i<=50; i++) {
			const calles = i-1
			if((this.state.boxW - calles) %  i == 0 && (this.state.boxW - calles) > 0) {
				possibleCols.push(i)
			}
			if((this.state.boxH - calles) %  i == 0 && (this.state.boxH - calles) > 0) {
				possibleRows.push(i)
			}
		}

		this.setState(()=>({
			pageProps: {
				marginY,
				marginX,
				marginBottom,
				possibleCols,
				possibleRows,
				selectedCols: 1,
				selectedRows: 1
			}
		}))
		
	}
	
	render() {
		return (
			<Page
				title='Grilla'
				keywords='grilla, grid, layout'
				headerTitle='grilla'
				className={'grillaAppContainer'}
				fullPage
			>
				<div id='GrillaApp'>
					<div className='__options'>
						<div className='__pannel'>
							<h3>Página</h3>
							<div className='__halfInputs'>
								<Input
									label='Ancho'
									type='number'
									icon='width'
									placeholder='0'
									postInput='mm'
									onChange={this.handleChange}
									value={this.state.pageW}
									name='pageW'
								/>
								<Input
									type='number'
									icon='height'
									placeholder='0'
									postInput='mm'
									label='Alto'
									onChange={this.handleChange}
									value={this.state.pageH}
									name='pageH'
								/>
							</div>
							<Input
								type='number'
								icon='type'
								placeholder='0'
								postInput='pt'
								label='Alto de Línea'
								onChange={this.handleChange}
								value={this.state.lineSize}
								name='lineSize'
							/>
							<h3>Caja</h3>
							<div className='__halfInputs'>
								<Input
									label='Ancho'
									type='number'
									icon='width'
									placeholder='0'
									postInput='líneas'
									onChange={this.handleChange}
									value={this.state.boxW}
									name='boxW'
								/>
								<Input
									label='Alto'
									type='number'
									icon='height'
									placeholder='0'
									postInput='líneas'
									onChange={this.handleChange}
									value={this.state.boxH}
									name='boxH'
								/>
							</div>
							<h3>Márgenes</h3>
							<Input
								label='Superior'
								type='number'
								placeholder='0'
								postInput='mm'
								onChange={this.handleChange}
								value={this.state.marginT}
								name='marginT'
							/>
						</div>
						<div className='__pannel __posibilities'>
							<p className='--with--s'>Columnas</p>
							<div className="--s">
								<SelectGrid
									type='Cols'
									onClick={this.changeGridSelection}
									possible={this.state.pageProps.possibleCols}
									selected={this.state.pageProps.selectedCols}
								/>
							</div>
						</div>
						<div className='__pannel __posibilities'>
							<p className='--with--s'>Filas</p>
							<div className="--s">
								<SelectGrid
									type='Rows'
									onClick={this.changeGridSelection}
									possible={this.state.pageProps.possibleRows}
									selected={this.state.pageProps.selectedRows}
								/>
							</div>
						</div>
					</div>
					<div className='__output'>
						<div className='__renderPage'>
							<RenderGridPage
								{...this.state}
							/>
						</div>
						<div className='__renderData'>
							<div className="col">
								<div style={{flex: 2}}>
									<h3>Márgenes</h3>
									<div className="col">
										<div>
											<label>Superior <strong>{parseMargins(this.state.pageProps.marginY / 2)}</strong></label>
											<label>Inferior <strong>{parseMargins(this.state.pageProps.marginY / 2)}</strong></label>
										</div>
										<div>
											<label>Exterior <strong>{parseMargins(this.state.pageProps.marginX / 2)}</strong></label>
											<label>Interior <strong>{parseMargins(this.state.pageProps.marginX / 2)}</strong></label>
										</div>
									</div>
								</div>
								<div>
									<h3>Grilla</h3>
									<label>Columnas <strong>{this.state.pageProps.selectedCols}</strong></label>
									<label>Filas <strong>{this.state.pageProps.selectedRows}</strong></label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		)
	}
}

export default GrillaApp

function parseMargins(x) {
	return x.toFixed(4) + ' mm';
}