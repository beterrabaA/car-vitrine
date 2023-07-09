import axios from 'axios'

import { CarProps, AxiosSearchProps } from '@/types'

export async function fetchCars(filters: AxiosSearchProps) {
  const options = {
    method: 'GET',
    url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
    params: filters,
    headers: {
      'X-RapidAPI-Key': '02c549c245msh4195b2f0f3d33fcp1f6cb7jsn99abd35c6dca',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    },
  }

  const response = await axios.request(options)

  // Parse the response as JSON
  const result = await response.data
  return result
}

export const calculateCarRent = (cityMpg: number, year: number) => {
  const basePricePerDay = 50 // Base rental price per day in dollars
  const mileageFactor = 0.1 // Additional rate per mile driven
  const ageFactor = 0.05 // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = cityMpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage')
  const { make, model, year } = car

  url.searchParams.append(
    'customer',
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '',
  )
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`)

  return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set(type, value)

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}
