import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ProductItem from '../ProductItem/ProductItem'
import { selectSearchedProducts } from '../../slices/productsSlice'
import { useState } from 'react'
import { CaretSmallIcon } from '../../assets/icons/Icons'

export default function ProductsList() {
	const products = useSelector(selectSearchedProducts)
	const installments = useSelector((state: RootState) => state.products.installments)
	const [visibleCount, setVisibleCount] = useState(6)

	const handleShowMore = () => {
		setVisibleCount(visibleCount + 2)
	}

	const handleShowLess = () => {
		setVisibleCount(6)
	}

	return (
		<>
			<div className="products__list d-flex row">
				{products.slice(0, visibleCount).map(product => (
					<div className="products__item d-flex flex-column col-12 col-sm-6 col-xl-4" key={product.id}>
						<ProductItem key={product.id} product={product} installments={installments} />
					</div>
				))}
			</div>

			{visibleCount < products.length && (
				<div className="products__list-btn d-flex justify-content-center">
					<button className="btn btn__list-btn btn__list-btn--show-more" onClick={handleShowMore}>
						Pokaż więcej <CaretSmallIcon />
					</button>
				</div>
			)}

			{visibleCount === products.length && (
				<div className="products__list-btn d-flex justify-content-center">
					<button className="btn btn__list-btn btn__list-btn--show-less" onClick={handleShowLess}>
						Pokaż mniej <CaretSmallIcon />
					</button>
				</div>
			)}
		</>
	)
}
