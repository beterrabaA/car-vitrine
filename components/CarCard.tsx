/* eslint-disable camelcase */
'use client'

import { useState } from 'react'
import Image from 'next/image'

import { CarProps } from '@/types'
import { calculateCarRent } from '@/utils' // generateCarImageUrl
import { CarDetails, CustomButton } from './'

interface CarCardProps {
  car: CarProps
}
const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car

  const [isOpen, setIsOpen] = useState(false)

  const carRent = calculateCarRent(city_mpg, year)

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="mt-6 flex text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      <div className="relative my-3 h-40 w-full object-contain">
        <Image
          src="/hero.png" // {generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative mt-2 flex w-full">
        <div className="text-gray flex w-full justify-between group-hover:invisible">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering-wheel"
            />
            <p className="text-[14px]">
              {transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image alt="tire" src="/tire.svg" width={20} height={20} />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <Image alt="gas" height={20} src="/gas.svg" width={20} />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="bg-primary-blue rounded-full w-full py-[16px] "
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  )
}

export default CarCard
