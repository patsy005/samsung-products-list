import useSelectOptions from '../../hooks/useSelectOptions'
import { setCapacity } from '../../slices/productsSlice';
import SelectComponent from './Select'

export default function SelectSortByCapacity() {
	const selectOptions = useSelectOptions({ query: 'capacity' }) as { value: string; label: string }[]
	return <SelectComponent options={selectOptions} dispatchFn={setCapacity} />
}
