'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathname = updateSearchParams(title, e.value.toLowerCase())

    router.push(newPathname)
  }

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e)
          handleUpdateParams(e)
        }}
      >
        <div className="relative z-10 w-fit">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              alt="chevron up down"
              className="ml-4 object-contain"
              width={20}
              src="/chevron-up-down.svg"
              height={20}
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none px-2 py-2 ${
                      active ? 'bg-primary-blue text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter
