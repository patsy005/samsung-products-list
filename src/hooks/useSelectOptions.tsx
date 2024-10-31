import { useSelector } from 'react-redux'
import { ProductType, selectProducts } from '../slices/productsSlice'

export default function useSelectOptions({ query }: { query: keyof ProductType }) {
	const products = useSelector(selectProducts)

	const selectOptionsFromProducts = products.map((product: ProductType) => product[query])

	const productFunctionsSet = new Set(selectOptionsFromProducts.flat())

	const options = Array.from(productFunctionsSet).map(func => ({
		value: func,
		label: query === 'capacity' ? `${func}kg` : func,
	}))

	const selectOptions = [{ value: 'all', label: 'Wszystkie' }, ...options]

	return selectOptions
}
