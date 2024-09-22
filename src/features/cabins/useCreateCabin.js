import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createEditCabin as createEditCabinApi } from '../../services/apiCabins'

export const useCreateCabin = () => {
  const queryClient = useQueryClient()

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { createCabin, isCreating }
}
