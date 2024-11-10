import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSignUp } from './useSignUp'
import SpinnerMini from '../../ui/SpinnerMini'

// Email regex: /\S+@\S+\.\S+/

function SignUpForm() {
  const { signUp, isLoading } = useSignUp()
  const { register, getValues, formState, handleSubmit, reset } = useForm()
  const { errors } = formState

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSettled: () => reset() })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email.',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters.',
            },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors?.confirmPassword?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          {...register('confirmPassword', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password ||
              'Password and confirm password should be same.',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Create new user'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default SignUpForm
