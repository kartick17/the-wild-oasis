import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSettings as updateSettingsApi } from '../../services/apiSettings'
import toast from 'react-hot-toast'

export function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success('Setting successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { updateSetting, isUpdating }
}
