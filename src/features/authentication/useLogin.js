import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { login as loginApi } from '../../services/apiAuth'

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success('Login successful.')
      queryClient.setQueryData(['user'], data?.user)
      navigate('/dashboard', { replace: true })
    },
    onError: (err) => {
      toast.error(err?.message)
    },
  })

  return { isLoading, login }
}
