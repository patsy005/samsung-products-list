import Select, { components } from 'react-select'
import { CaretDownIcon } from '../../assets/icons/Icons'
import { AppDispatch } from '../../store'
import { useDispatch } from 'react-redux'

type OptionType = {
	value: string
	label: string
}

type OptionsType = OptionType[]

type SelectProps = {
	options: OptionsType
	dispatchFn?: (value: string) => { type: string; payload: string }
}

export default function SelectComponent({ options, dispatchFn }: SelectProps) {
	const dispatch: AppDispatch = useDispatch()

	const CustomDropdownIndicator = (props: any) => {
		return (
			<components.DropdownIndicator {...props}>
				<CaretDownIcon />
			</components.DropdownIndicator>
		)
	}

	const onChange = (e: any) => {
		if(dispatchFn){
			dispatch(dispatchFn(e.value))
		}
	}

	return (
		<Select
			options={options}
			// menuIsOpen
			className="select"
			classNamePrefix="select"
			onChange={(e: any) => onChange(e)}
			components={{ DropdownIndicator: CustomDropdownIndicator }}
			defaultValue={options[0]}
		/>
	)
}
