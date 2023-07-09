'use client'

import React, { useState } from 'react'

import { SearchManufacturer } from './'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`z-10 -ml-3 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('' as string)
  const [model, setModel] = useState('' as string)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (manufacturer === '' && model === '') {
      return alert('Please fill in the search bar')
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
  }

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if (model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  return (
    <form onSubmit={handleSearch} className="searchbar">
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          alt="car model"
          className="absolute ml-4 h-[20px] w-[20px]"
          height={25}
          src="/model-icon.png"
          width={25}
        />
        <input
          className="searchbar__input"
          id="search-model"
          name="model"
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          value={model}
          type="text"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar
