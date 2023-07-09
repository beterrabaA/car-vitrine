'use client'

import { ShowMoreProps } from '@/types'
import { useRouter } from 'next/navigation'
import CustomButton from './CustomButton'
import { updateSearchParams } from '@/utils'

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter()

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10
    const newPathname = updateSearchParams('limit', newLimit.toString())

    router.push(newPathname)
  }

  return (
    <div className="flex-center mt-10 w-full gap-5">
      {!isNext && (
        <CustomButton
          btnType="button"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleNavigation}
          title="Show More"
        />
      )}
    </div>
  )
}

export default ShowMore
