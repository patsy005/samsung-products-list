import { setFilter } from '../../slices/productsSlice'
import SelectComponent from './Select'

export default function SelectSort() {

	const options = [
		{ value: 'all', label: 'Wszystkie' },
		{ value: 'price', label: 'Cena' },
		{ value: 'capacity', label: 'Pojemność' },
	]
	return <SelectComponent options={options} dispatchFn={setFilter}  />
}
