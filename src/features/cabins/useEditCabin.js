import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createEditCabin as createEditCabinApi } from '../../services/apiCabins'

export const useEditCabin = () => {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => toast.error(err.message),
  })

  return { editCabin, isEditing }
}
