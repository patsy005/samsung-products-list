import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type ProductType = {
	id: number
	name: string
	type: string
	model: string
	capacity: string
	color: string
	front: string
	dimensions: string
	functions: Array<string>
	class: string
	prices: Array<ProductPricesType>
	image: string
}

export type InstallmentsType = {
	numberOfMonths: number
	percentage: number
	itemsIds: Array<number>
}

export type ProductPricesType = {
	price: number
	validFrom: string
	validTo: string
}

export type ProductsStateType = {
	products: ProductType[]
	filteredProducts: ProductType[]
	installments: InstallmentsType[]
	isLoading: boolean
	error: string
	searchQuery?: string
	selectFilter?: string
	energyLabelFilter: string
	capacityFilter?: string
	functionsFilter?: string
}

const initialState: ProductsStateType = {
	products: [],
	filteredProducts: [],
	installments: [],
	isLoading: false,
	error: '',
	searchQuery: '',
	selectFilter: '',
	energyLabelFilter: '',
	capacityFilter: '',
	functionsFilter: '',
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const res = await fetch('/data.json')
	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.error)
	}

	return data
})

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
		setFilter: (state, action: PayloadAction<string>) => {
			state.selectFilter = action.payload
		},
		setEnergyLabel(state, action: PayloadAction<string>) {
			state.energyLabelFilter = action.payload
		},
		setCapacity: (state, action: PayloadAction<string>) => {
			state.capacityFilter = action.payload
		},
		setFunctions: (state, action: PayloadAction<string>) => {
			state.functionsFilter = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.isLoading = true
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isLoading = false
				state.products = action.payload.products
				state.installments = action.payload.installments
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message || ''
			})
	},
})

export const selectProducts = (state: RootState) => state.products.products

export const selectSearchQuery = (state: RootState) => state.products.searchQuery

export const selectSearchedProducts = (state: RootState) => {
	const searchQuery = state.products.searchQuery
	const filter = state.products.selectFilter
	const energyLabel = state.products.energyLabelFilter
	const capacity = state.products.capacityFilter
	const functions = state.products.functionsFilter
	const products = state.products.products

	let filteredProducts = products

	if (searchQuery === 'all' || filter === 'all' || energyLabel === 'all' || capacity === 'all' || functions === 'all') {
		return products
	}

	if (searchQuery) {
		filteredProducts = filteredProducts.filter(p => {
			const { name, type, model, capacity, color, front, dimensions, functions } = p

			return (
				name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				type.toLowerCase().includes(searchQuery.toLowerCase()) ||
				model.toLowerCase().includes(searchQuery.toLowerCase()) ||
				capacity.toLowerCase().includes(searchQuery.toLowerCase()) ||
				color.toLowerCase().includes(searchQuery.toLowerCase()) ||
				front.toLowerCase().includes(searchQuery.toLowerCase()) ||
				dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
				functions.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
			)
		})
	}

	if (filter) {
		if (filter === 'price') {
			filteredProducts = [...filteredProducts].sort((a, b) => {
				const aPrice = a.prices[0].price
				const bPrice = b.prices[0].price

				return aPrice - bPrice
			})
		}

		if (filter === 'capacity') {
			filteredProducts = [...filteredProducts].sort((a, b) => {
				const aCapacity = parseInt(a.capacity)
				const bCapacity = parseInt(b.capacity)

				return aCapacity - bCapacity
			})
		}
	}

	if (energyLabel) {
		filteredProducts = filteredProducts.filter(p => p.class === energyLabel)
	}

	if (capacity) {
		filteredProducts = filteredProducts.filter(p => p.capacity === capacity)
	}

	if (functions) {
		filteredProducts = filteredProducts.filter(p => p.functions.includes(functions))
	}

	return filteredProducts
}

export const { setSearchQuery, setFilter, setEnergyLabel, setCapacity, setFunctions } = productsSlice.actions
export default productsSlice.reducer
