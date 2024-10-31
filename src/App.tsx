import { useEffect } from 'react'
import ProductsPage from './Pages/ProductsPage/ProductsPage'
import { AppDispatch, RootState } from './store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './slices/productsSlice'
import Spinner from './components/Spinner/Spiner'

function App() {
	const dispatch: AppDispatch = useDispatch()
	const isLoading = useSelector((state: RootState) => state.products.isLoading)

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])

	return (
		<>
			{isLoading && <Spinner />}
			{!isLoading && <ProductsPage />}
		</>
	)
}

export default App
