import React from 'react'
import classNames from 'classnames'

interface SelectGridProps {
	type: string
	onClick: Function
	possible: number[]
	selected: number | null
}
const SelectGrid = ({
	type,
	onClick,
	possible,
	selected,
}:SelectGridProps) => (
	<div className='SelectGrid'>
		{possible.map((o,k)=>(
			<div
				key={k}
				className={classNames('__option', {'--selected':(o==selected)})}
				onClick={()=>{onClick(o, type)}}
			>
				<div className='__page'>
					<div className={classNames('__gridContainer', '--'+type)}>
						{Array(o).fill(0).map((_j, kCol)=>(
							<div key={kCol} className='__gridRow'></div>
						))}
					</div>
				</div>
				<p>{o}</p>
			</div>
		))}
	</div>
)

interface PosibilitiesProps {
	possibleCols: number[]
	selectedCols: number
	possibleRows: number[]
	selectedRows: number
	changeGridSelection: Function
}
export const Posibilities = ({
	possibleCols,
	selectedCols,
	possibleRows,
	selectedRows,
	changeGridSelection
}:PosibilitiesProps) => (
	<>
		<div className='__pannel __posibilities'>
			<p className='--with--s'>Columnas</p>
			<div className="--s">
				<SelectGrid
					type='Cols'
					onClick={changeGridSelection}
					possible={possibleCols}
					selected={selectedCols}
				/>
			</div>
		</div>
		<div className='__pannel __posibilities'>
			<p className='--with--s'>Filas</p>
			<div className="--s">
				<SelectGrid
					type='Rows'
					onClick={changeGridSelection}
					possible={possibleRows}
					selected={selectedRows}
				/>
			</div>
		</div>
	</>
)

import {FormState, FormPageProps} from './index.page'

type RenderGridPageProps = FormState & FormPageProps

// class RenderGridPage extends React.Component<RenderGridPageProps, RenderGridPageState> {
// 	constructor(props:RenderGridPageProps) {
// 		super(props)
// 		this.state = {
// 			pageH: 500,
// 			maxW: 600,
// 		}
// 	}
// 	componentDidMount() {
// 		let pageHeight = document.getElementById('__page')?.clientHeight || 1080;
// 		let contanerWidth = document.getElementById('__container')?.clientWidth || 1920;
// 		this.setState({ pageH: pageHeight, maxW: contanerWidth });
// 	}

// 	render() {
// 		const ratio:number = (100 / this.props.pageH) * this.props.pageW

// 		let newW = (this.state.pageH / 100) * ratio;
// 		if (newW > this.state.maxW) {
// 			newW = this.state.maxW;
// 		}

// 		let marginX = (100 / newW) * this.props.marginX / 2;
// 		let marginY = (100 / newW) * this.props.marginY / 2;
// 		if(marginX < 0) { marginX = 0 }
// 		if(marginY < 0) { marginY = 0 }
// 		const newP = marginY.toFixed(2) + '% ' + marginX.toFixed(2) + '%';

// 		const rows = this.props.selectedRows;
// 		const cols = this.props.selectedCols;

// 		return (
// 			<div className='RenderGridPage'>
// 				<div className='__container' id='__container'>
// 					<div className='__page' id='__page' style={{ width: newW||100, padding: newP }}>
// 						<div
// 							className='__box'
// 							style={{ gridTemplateColumns: 'repeat(' + cols + ', 1fr)' }}
// 						>
// 							{[...Array(rows*cols)].map((j,i)=><div key={i} className="__module"></div>)}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}
// }
interface RenderGridPageState {
	pageH: number
	maxW: number
}
class RenderGridPage extends React.Component<RenderGridPageProps, RenderGridPageState> {
	containerRef:React.RefObject<HTMLDivElement>
	constructor(props:RenderGridPageProps) {
		super(props)
		this.containerRef = React.createRef<HTMLDivElement>()
		// this.state = {

		// }
	}
	componentDidMount() {
		// let pageHeight = document.getElementById('__page')?.clientHeight || 1080;
		// let contanerWidth = document.getElementById('__container')?.clientWidth || 1920;
		// this.setState({ pageH: pageHeight, maxW: contanerWidth });
	}

	render() {
		return (
			<div ref={this.containerRef}>
				WIP
			</div>
		)
	}
}

export {RenderGridPage}