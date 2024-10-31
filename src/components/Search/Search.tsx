import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import Input from '../Input/Input'
import { useState } from 'react'
import { setSearchQuery } from '../../slices/productsSlice'

export default function Search() {
	const dispatch: AppDispatch = useDispatch()
	const [search, setSearch] = useState('')

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		dispatch(setSearchQuery(e.target.value))
	}

	const clearInputHandler = () => {
		setSearch('')
		dispatch(setSearchQuery(''))
	}

	return (
		<button className="search-button">
			<Input
				type="text"
				placeholder="Szukaj..."
				className="search-input"
				value={search}
				onChange={e => handleSearch(e)}
			/>
			<span onClick={clearInputHandler}>X</span>
		</button>
	)
}
