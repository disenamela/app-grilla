import Input from '@components/Input'
import { useState } from 'react'
import {Posibilities, RenderGridPage} from './grilla.components'

interface FormState {
	pageW: number
	pageH: number
	lineSize: number
	boxW: number
	boxH: number
	marginT: number
}

interface FormPageProps {
	possibleCols: number[]
	selectedCols: number
	possibleRows: number[]
	selectedRows: number
	marginY: number
	marginX: number
}

function parseMargins(x:number) {
	return x.toFixed(4) + ' mm';
}

const GrillaPage = () => {
	const [formState, setFormState] = useState<FormState>({
		pageW: 0,
		pageH: 0,
		lineSize: 0,
		boxW: 0,
		boxH: 0,
		marginT: 0,
	})

	const [pageProps, setPageProps] = useState<FormPageProps>({
		possibleCols: [],
		selectedCols: 0,
		possibleRows: [],
		selectedRows: 0,
		marginY: 0,
		marginX: 0,
	})

	const handleChange = () => {
		
	}
	const changeGridSelection = () => {

	}
	return(
		<div
			// title='Grilla'
			// keywords='grilla, grid, layout'
			// headerTitle='grilla'
			// className={'grillaAppContainer'}
			// fullPage
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
								onChange={handleChange}
								value={formState.pageW}
								name='pageW'
							/>
							<Input
								type='number'
								icon='height'
								placeholder='0'
								postInput='mm'
								label='Alto'
								onChange={handleChange}
								value={formState.pageH}
								name='pageH'
							/>
						</div>
						<Input
							type='number'
							icon='type'
							placeholder='0'
							postInput='pt'
							label='Alto de Línea'
							onChange={handleChange}
							value={formState.lineSize}
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
								onChange={handleChange}
								value={formState.boxW}
								name='boxW'
							/>
							<Input
								label='Alto'
								type='number'
								icon='height'
								placeholder='0'
								postInput='líneas'
								onChange={handleChange}
								value={formState.boxH}
								name='boxH'
							/>
						</div>
						<h3>Márgenes</h3>
						<Input
							label='Superior'
							type='number'
							placeholder='0'
							postInput='mm'
							onChange={handleChange}
							value={formState.marginT}
							name='marginT'
						/>
					</div>
					<Posibilities
						changeGridSelection={changeGridSelection}
						possibleCols={pageProps.possibleCols}
						selectedCols={pageProps.selectedCols}
						possibleRows={pageProps.possibleRows}
						selectedRows={pageProps.selectedRows}
					/>
				</div>
				<div className='__output'>
					<div className='__renderPage'>
						<RenderGridPage
							{...formState}
							{...pageProps}
						/>
					</div>
					<div className='__renderData'>
						<div className="col">
							<div style={{flex: 2}}>
								<h3>Márgenes</h3>
								<div className="col">
									<div>
										<label>Superior <strong>{parseMargins(pageProps.marginY / 2)}</strong></label>
										<label>Inferior <strong>{parseMargins(pageProps.marginY / 2)}</strong></label>
									</div>
									<div>
										<label>Exterior <strong>{parseMargins(pageProps.marginX / 2)}</strong></label>
										<label>Interior <strong>{parseMargins(pageProps.marginX / 2)}</strong></label>
									</div>
								</div>
							</div>
							<div>
								<h3>Grilla</h3>
								<label>Columnas <strong>{pageProps.selectedCols}</strong></label>
								<label>Filas <strong>{pageProps.selectedRows}</strong></label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GrillaPage