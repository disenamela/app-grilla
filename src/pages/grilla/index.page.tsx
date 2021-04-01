import Input from '@components/Input'
import { useEffect, useState } from 'react'
import {Posibilities, RenderGridPage} from './grilla.components'

export interface FormState {
	pageW: number
	pageH: number
	lineSize: number
	boxW: number
	boxH: number
	marginT: number
}

export interface FormPageProps {
	possibleCols: number[]
	selectedCols: number
	possibleRows: number[]
	selectedRows: number
	marginY: number
	marginX: number
	marginBottom: number
}

type FormStateKeys = keyof FormState

function parseMargins(x:number) {
	return x.toFixed(4) + ' mm';
}

const GrillaPage = () => {
	const [formState, setFormState] = useState<FormState>({
		pageW: 210,
		pageH: 297,
		lineSize: 12,
		boxW: 11,
		boxH: 23,
		marginT: 0,
	})

	const [pageProps, setPageProps] = useState<FormPageProps>({
		possibleCols: [],
		selectedCols: 0,
		possibleRows: [],
		selectedRows: 0,
		marginY: 0,
		marginX: 0,
		marginBottom: 0
	})

	const handleChange = (k:FormStateKeys) => (e:any) => {
		const value = e.target.value
		console.log(k, value);
		const newFormState = {...formState, [k]:value}
		setFormState(newFormState)
	}
	useEffect(() => {
		calculamela()
	}, [formState])
	const calculamela = () => {
		//validate values
		if(
			formState.pageW < 1 ||
			formState.pageH < 1 ||
			formState.lineSize < 1 ||
			formState.boxW < 1 ||
			formState.boxH < 1
		) {
			return;
		}
		const lineHeight_mm = formState.lineSize * 0.3527777778 //pt to mm
		const boxHeight_mm = formState.boxH * lineHeight_mm		
		const boxWith_mm = formState.boxW * lineHeight_mm
		const marginBottom = formState.pageH - formState.marginT - boxHeight_mm
		const marginX = (formState.pageW - boxWith_mm) / 2
		const marginY = (formState.pageH - boxHeight_mm) / 2

		let possibleCols:number[] = []
		let possibleRows:number[] = []

		for(let i=1; i<=50; i++) {
			const calles = i-1
			if((formState.boxW - calles) %  i == 0 && (formState.boxW - calles) > 0) {
				possibleCols.push(i)
			}
			if((formState.boxH - calles) %  i == 0 && (formState.boxH - calles) > 0) {
				possibleRows.push(i)
			}
		}

		setPageProps({
			possibleCols,
			selectedCols: 1,
			possibleRows,
			selectedRows: 1,
			marginY,
			marginX,
			marginBottom,
		})


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
								onChange={handleChange('pageW')}
								value={formState.pageW}
								name='pageW'
							/>
							<Input
								type='number'
								icon='height'
								placeholder='0'
								postInput='mm'
								label='Alto'
								onChange={handleChange('pageH')}
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
							onChange={handleChange('lineSize')}
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
								onChange={handleChange('boxW')}
								value={formState.boxW}
								name='boxW'
							/>
							<Input
								label='Alto'
								type='number'
								icon='height'
								placeholder='0'
								postInput='líneas'
								onChange={handleChange('boxH')}
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
							onChange={handleChange('marginT')}
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