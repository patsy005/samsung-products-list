import SelectComponent from './Select'
import useSelectOptions from '../../hooks/useSelectOptions'
import { setFunctions } from '../../slices/productsSlice';

export default function SelectSortByFunctions() {
	const selectOptions = useSelectOptions({ query: 'functions' }) as { value: string; label: string }[]

	return <SelectComponent options={selectOptions} dispatchFn={setFunctions} />
}
