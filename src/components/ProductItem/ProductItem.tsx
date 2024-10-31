import moment from 'moment'
import { InstallmentsType, ProductType } from '../../slices/productsSlice'
import { useMemo } from 'react'

type ProductItemProps = {
	product: ProductType
	installments: InstallmentsType[]
}

export default function ProductItem({ product, installments }: ProductItemProps) {
	const setCurrentPriceHandler = useMemo(() => {
		if (product) {
			const currentDate = moment()
			const price = product.prices.find(price => {
				const validFrom = moment(price.validFrom, 'DD-MM-YYYY')
				const validTo = moment(price.validTo, 'DD-MM-YYYY')
				return currentDate.isBetween(validFrom, validTo, null, '[]')
			})

			return price
		}
	}, [product])

	const formatPrice = useMemo(() => {
		if (product) {
			const price = setCurrentPriceHandler?.price
			const match = price?.toString().match(/\.(\d{1,2})/)
			return match ? match[1] : '00'
		}
	}, [product, setCurrentPriceHandler])

	const installmentPlan = useMemo(() => {
		if (installments) {
			return installments.find(installment => installment.itemsIds.includes(product.id))
		}
	}, [installments, product.id])

	const calcInstallment = useMemo(() => {
		if (setCurrentPriceHandler && installmentPlan) {
			const montlyInstallment =
				(setCurrentPriceHandler.price * (1 + installmentPlan.percentage / 100)) / installmentPlan.numberOfMonths

			return montlyInstallment.toFixed(2)
		}
	}, [setCurrentPriceHandler, installmentPlan])

	return (
		<div className="products__item--container">
			<div className="products__item--box products__item--box-top">
				<div className="products__item--image">
					<img src={`/images/${product.image}`} alt="" />
				</div>

				<div className="products__item--title col-7">
					<h3>
						{product.name}, {product.type} {product.model}, {product.capacity} kg, {product.color}
					</h3>
				</div>
			</div>

			<div className="products__item--box products__item--box-bottom">
				<div className="products__item--description d-flex flex-column">
					<p>
						Pojemność (kg): <span>{product.capacity}</span>
					</p>
					<p>
						Wymiary (GxSxW): <span>{product.dimensions}</span>
					</p>
					<p>
						Funkcje: <span>{product.functions.join(', ')}</span>
					</p>
				</div>

				<div className="products__item--energy-label">
					<div className="d-flex align-items-center gap-3">
						<p>Klasa energetyczna </p>
						<div className="label d-flex align-items-center" data-class={product.class}>
							{product.class}
						</div>
					</div>
				</div>

				<div className="products__item--price-period">
					<p>
						Cena obowiązuje:{' '}
						<span>
							{setCurrentPriceHandler?.validFrom} - {setCurrentPriceHandler?.validTo}
						</span>
					</p>
				</div>

				<div className="products__item--price d-flex">
					<p className="price">{setCurrentPriceHandler?.price}</p>
					<p className="currency">
						{formatPrice}
						<span>zł</span>
					</p>
				</div>

				<div className="products__item--installments">
					<p>
						{calcInstallment} zł x {installmentPlan?.numberOfMonths} rat
					</p>
				</div>

				<div className="products__item--btn d-flex justify-content-center">
					<button className="choose-btn btn">Wybierz</button>
				</div>
			</div>
		</div>
	)
}
