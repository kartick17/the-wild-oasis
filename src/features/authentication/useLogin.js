import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { login as loginApi } from '../../services/apiAuth'

export function useLogin() {
  const navigate = useNavigate()

  const { isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success('Login successful.')
      navigate('/dashboard')
    },
    onError: (err) => {
      toast.error(err?.message)
    },
  })

  return { isLoading, login }
}
