import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

export const useCabins = () => {
  const {
    error,
    isLoading,
    data: cabins,
  } = new useQuery({
    queryFn: getCabins,
    queryKey: ['cabins'],
  })

  return { error, isLoading, cabins }
}
