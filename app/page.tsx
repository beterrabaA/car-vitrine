import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants'
import { HomeProps } from '@/types'
import { fetchCars } from '@/utils'

export default async function Home({ searchParams }: HomeProps) {
  const cars = await fetchCars({
    make: searchParams?.manufacturer,
    year: searchParams?.year || 2022,
    fuel_type: searchParams?.fuel,
    limit: searchParams?.limit || 10,
    model: searchParams?.model,
  })

  const isDataEmpty = !Array.isArray(cars) || cars.length < 1 || !cars
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="padding-x padding-y max-width mt-12" id="discovery">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {cars?.map((car, i) => (
                <CarCard key={i} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > cars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-xl font-bold text-black">Oops, no results</h2>
            <p>{cars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
