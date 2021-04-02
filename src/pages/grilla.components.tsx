import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
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

// DISPLAY PORT
import {FormState, FormPageProps} from './index.page'
import styled, { css } from 'styled-components'

const DisplayContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
`
interface DisplayPageProps {
	w: number
	h: number
}
const DisplayPage = styled.div<DisplayPageProps>`
	display: flex;
	justify-content: center;
	background-color: white;
	border-radius: 1rem;
	${({w,h}) => `
		width: ${w}px;
		height: ${h}px;
	`}
`

// interface DisplayBoxProps {
// 	w: number
// 	h: number
// 	mt: number
// 	show: boolean
// }
// const DisplayBox = styled.div<DisplayBoxProps>`
// 	position: relative;
// 	${({w,h,mt,show}) => `
// 		width: ${w}px;
// 		height: ${h}px;
// 		margin-top: ${mt}px;
// 		${show&&`border: solid 1px #E9507F;`}
// 	`}
// `
// interface SectorProps {
// 	direction: 'row' | 'column'
// 	rowH: number
// }
// const Sector = styled.div<SectorProps>`
// 	height: 100%;
// 	width: 100%;
// 	border: solid 1px #9CDCF0;
// 	box-sizing: border-box;
// 	${({direction,rowH}) => `
// 		${direction==='row' ? `margin-bottom: ${rowH}px;` : `margin-right: ${rowH}px;`}
// 	`}
// 	&:last-of-type {
// 		margin: 0;
// 	}
// `
// interface SectorsContainerProps {
// 	direction: 'row' | 'column'
// }
// const SectorsContainer = styled.div<SectorsContainerProps>`
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	${({direction}) => `
// 		flex-direction: ${direction==='row' ? 'column' : 'row'};
// 	`}
// `
// interface DisplaySectorProps {
// 	show: boolean
// 	n: number
// 	direction: 'row' | 'column'
// 	rowH: number
// }
// const DisplaySectors:FunctionComponent<DisplaySectorProps> = ({show,n,direction,rowH}) => {
// 	if (!show) {return(<></>)}
// 	const sectors = Array.from(Array(n).keys())
// 	return (
// 		<SectorsContainer direction={direction}>
// 			{sectors.map( i => <Sector key={i} direction={direction} rowH={rowH} /> )}
// 		</SectorsContainer>
// 	)
// }

const Cell = styled.div`
	border: solid 1px #e95ab9;
	border-radius: 2px;
`

interface MainLaloBoxProps {
	h: number
	w: number
	cols: number
	rows: number
	gap: number
	mt: number
}
const MainLaloBox = styled.div<MainLaloBoxProps>`

	${ ({h, w, cols, rows, gap, mt}) => css`
		width: ${w}px;
		height: ${h}px;
		margin-top: ${mt}px;
		display: grid;
		gap: ${gap}px;
		grid-template-rows: repeat(${rows},auto);
		grid-template-columns: repeat(${cols}, auto);
		

	` }
`



type RenderGridPageProps = FormState & FormPageProps

interface PageState {
	scale: number
	pageHeight: number
	pageWidth: number
}

const RenderGridPage:FunctionComponent<RenderGridPageProps> = ({
	pageW,
	pageH,
	marginT,
	boxHeight_mm,
	boxWith_mm,
	selectedCols,
	selectedRows,
	lineHeight_mm
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const containerPadding = 100
	// const [containerSize, setContainerSize] = useState<ContainerSizeState>({
	// 	containerFrameW: 500,
	// 	containerFrameH: 600
	// })
	const calcContainerState = (containerFrameW:number, containerFrameH:number):PageState => {
		console.log({containerFrameW});
		
		const containerRatio = containerFrameH / containerFrameW
		const pageRatio = pageH / pageW
		const larger = containerRatio > pageRatio ? 'w' : 'h' //que costado de la pagina toca el container
		const pageWidth = larger=='w' ? containerFrameW : containerFrameH / pageRatio
		const pageHeight = larger=='h' ? containerFrameH : containerFrameW * pageRatio
		const scale = larger==='h' ? (containerFrameH / pageH) : (containerFrameW / pageW)
		return {
			scale,
			pageHeight,
			pageWidth,
		}
	}
	const [containerState, setContainerState] = useState<PageState>(calcContainerState(500, 600))
	// const updateState = () => setContainerState(calcContainerState())
	// useLayoutEffect(() => {
	// 	console.log('CALCULADA PAGINA');
		
	// 	if(containerRef.current) {
	// 		setContainerSize({
	// 			containerFrameW: containerRef.current?.clientWidth - containerPadding,
	// 			containerFrameH: containerRef.current?.clientHeight - containerPadding

	// 		})
	// 	} else {
	// 		console.log('noRef');
	// 	}
	// }, [])
	useEffect(() => {
		console.log('CANNNNGE');
		let containerFrameW = 500
		let containerFrameH = 500
		if(containerRef.current) {
			containerFrameW = containerRef.current?.clientWidth - containerPadding
			containerFrameH = containerRef.current?.clientHeight - containerPadding
		} else {
			console.log('noRef');
		}
		setContainerState(calcContainerState(containerFrameW, containerFrameH))
	}, [pageW, pageH])
	// sizes in px
	const realBoxH = boxHeight_mm * containerState.scale
	const realBoxW = boxWith_mm * containerState.scale
	const realMarginT = marginT * containerState.scale
	const realRowH = lineHeight_mm * containerState.scale

	//optional features
	// const displayBox = false
	// const disaplayColumns = true
	// const disaplayRows = true

	return (
		<DisplayContainer ref={containerRef}>
			<DisplayPage w={containerState.pageWidth} h={containerState.pageHeight}>
				<MainLaloBox h={realBoxH} w={realBoxW} cols={selectedCols} rows={selectedRows} gap={realRowH} mt={realMarginT}>
					{Array.from(Array(selectedRows * selectedCols)).map( (_i, j) => (
						<>
								<Cell key={`${j}`} />
						</>
					))}
				</MainLaloBox>
				{/* <DisplayBox show={displayBox} h={realBoxH} w={realBoxW} mt={realMarginT} >
					<DisplaySectors show={disaplayColumns} n={selectedCols} direction='column' rowH={realRowH} />
					<DisplaySectors show={disaplayRows} n={selectedRows} direction='row' rowH={realRowH} />
					
				</DisplayBox> */}
			</DisplayPage>
		</DisplayContainer>
	)
}

export {RenderGridPage}


/***************************** WIP PATTERN */

interface MyProps {
	myPropVar: string
}
interface MyState {
	myStateVar: string
}

export const MyComponent:FunctionComponent<MyProps> = ({ myPropVar }) => {
	const getTheState = ():MyState => {
		return {
			myStateVar: myPropVar
		}
	}
	const [myState, setMyState] = useState<MyState>( getTheState() )
	const updateTheState = () => setMyState(getTheState())
	if('something happens') {
		updateTheState()
	}
	useEffect(() => {
		updateTheState()
	}, [myPropVar])
	return(
		<div>{myState.myStateVar}</div>
	)
}