import supabase, { supabaseUrl } from './supabase'

export async function signUp({ fullName, email, password }) {
  console.log({ fullName, email, password })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  })

  if (error) throw new Error(error.message)

  return data?.user
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return data
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) throw new Error(error?.message)
  return data.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  let updateData = {}
  if (fullName) updateData = { data: { fullName } }
  if (password) updateData = { password }

  // Update user password or fullName
  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error(error.message)
  if (!avatar) return data?.user

  // Upload the avatar image
  const fileName = `avatar-${data?.user?.id}-${Date.now()}`
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

  if (uploadError) throw new Error(uploadError.message)

  // Update avatar in the user
  const { data: updatedUser, error: updatedError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    })

  if (updatedError) throw new Error(updatedError.message)

  return updatedUser?.user
}
