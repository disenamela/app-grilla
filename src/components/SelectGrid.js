import classNames from 'classnames'
import React from 'react'

const SelectGrid = props => (
	<div className='SelectGrid'>
		{props.possible.map((o,k)=>(
			<div
				key={k}
				className={classNames('__option', {'--selected':(o==props.selected)})}
				onClick={()=>{props.onClick(o, props.type)}}
			>
				<div className='__page'>
					<div className={classNames('__gridContainer', '--'+props.type)}>
						{Array(o).fill(0).map((j, kCol)=>(
							<div key={kCol} className='__gridRow'></div>
						))}
					</div>
				</div>
				<p>{o}</p>
			</div>
		))}
	</div>
)

export default SelectGrid