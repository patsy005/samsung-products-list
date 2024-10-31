import useSelectOptions from '../../hooks/useSelectOptions'
import { setEnergyLabel } from '../../slices/productsSlice';
import SelectComponent from './Select'

export default function SelectSortByEnergyLabel() {
	const selectOptions = useSelectOptions({ query: 'class' }) as { value: string; label: string }[]
	return <SelectComponent options={selectOptions} dispatchFn={setEnergyLabel} />
}
