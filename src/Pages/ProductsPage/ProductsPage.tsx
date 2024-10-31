import { useSelector } from 'react-redux'
import { selectSearchedProducts } from '../../slices/productsSlice'
import Heading from '../../components/Heading/Heading'
import Search from '../../components/Search/Search'
import SelectSort from '../../components/Select/SelectSort'
import SelectSortByFunctions from '../../components/Select/SelectSortByFunctions'
import SelectSortByEnergyLabel from '../../components/Select/SelectSortByEnergyLabel'
import SelectSortByCapacity from '../../components/Select/SelectSortByCapacity'
import ProductsList from '../../components/ProductsList/ProductsList'

export default function ProductsPage() {
	const products = useSelector(selectSearchedProducts)

	return (
		<main className="main col-12">
			<div className="heading-container">
				<Heading title="Wybierz urządzenie" />
			</div>

			<div className="search d-flex justify-content-center">
				<Search />
			</div>
			{products.length && (
				<>
					<section className="section products p-3">
						<div className="products__selects-container">
							<div className="row">
								<div className="products__select-box col-12 col-md-6 col-xl-3">
									<h4 className="select-header">Sortuj po:</h4>
									<SelectSort />
								</div>

								<div className="products__select-box col-12 col-md-6 col-xl-3">
									<h4 className="select-header">Funkcje:</h4>
									<SelectSortByFunctions />
								</div>
								<div className="products__select-box col-12 col-md-6 col-xl-3">
									<h4 className="select-header">Klasa energetyczna:</h4>
									<SelectSortByEnergyLabel />
								</div>
								<div className="products__select-box col-12 col-md-6 col-xl-3">
									<h4 className="select-header">Pojemność:</h4>
									<SelectSortByCapacity />
								</div>
							</div>
						</div>
						<div className="products__list--container">
							<p className="products__count">Liczba wyników: {products.length}</p>
							{products && <ProductsList />}
						</div>
					</section>
				</>
			)}

			{!products.length && <p className="products__no-products">Brak produktów spełniających kryteria wyszukiwania</p>}
		</main>
	)
}
