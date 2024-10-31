
import { setFilter } from '../../slices/productsSlice'
import SelectComponent from './Select'

export default function SelectSort() {
	// const dispatch: AppDispatch = useDispatch()

	const options = [
		{ value: 'all', label: 'Wszystkie' },
		{ value: 'price', label: 'Cena' },
		{ value: 'capacity', label: 'Pojemność' },
	]

	// const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	dispatch(setFilter(e.target.value))
	// }

	return <SelectComponent options={options} dispatchFn={setFilter}  />
}
