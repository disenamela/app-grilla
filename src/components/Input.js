import React from 'react'
import ic_width from '../../public/icons/width.svg'
import ic_type from '../../public/icons/type.svg'
import ic_height from '../../public/icons/height.svg'

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.preInput = React.createRef();
		this.inputBase = React.createRef();
		this.postInput = React.createRef();
		this.state = {
			postInputWidth: 0
		}
	}
	componentDidMount() {
		if (this.props.postInput && typeof ResizeObserver !== 'undefined') {
			let resizeObserver = new ResizeObserver(() => {
				this._resizeElement()
			});
			resizeObserver.observe(this.postInput.current)
		}
		this._resizeElement()
	}
	_resizeElement() {
		if (this.props.postInput) {
			const postInputWidth = ((this.postInput.current.offsetWidth + 15) / 10) + 'rem';
			this.setState(() => ({ postInputWidth }))
		}
	}
	componentWillUnmount() {
		if (this.props.postInput && typeof ResizeObserver !== 'undefined') {
			resizeObserver.unobserve(this.postInput.current)
		}
	}
	render() {
		const inputType = this.props.type == 'float' ? 'number' : this.props.type
		let ic = null;
		if (this.props.icon) {
			switch (this.props.icon) {
				case 'width':
					ic = ic_width;
					break;

				case 'height':
					ic = ic_height;
					break;

				case 'type':
					ic = ic_type;
					break;
			}
		}
		return (
			<div className='InputContainer'>
				<div className='__inputLabel'>
					<label>
						{this.props.label}
					</label>
				</div>
				<div className='__main'>
					{ic &&
						<img className="__icon" src={ic} />
					}
					<input
						className='__inputMain'
						type={inputType}
						placeholder={this.props.placeholder}
						step={this.props.type == 'float' ? 'any' : undefined}
						style={{
							paddingRight: this.state.postInputWidth,
							paddingLeft: ic ? 'calc(15px + 1.25rem)' : '',
						}}
						ref={this.inputBase}
						onChange={this.props.onChange}
						name={this.props.name}
						min={0}
						value={Number.isNaN(this.props.value) ? '' : this.props.value}
					/>
					{this.props.postInput &&
						<span
							ref={this.postInput}
							className='__postInput'
						>
							{this.props.postInput}
						</span>
					}
				</div>
			</div>
		)
	}
}

export default Input