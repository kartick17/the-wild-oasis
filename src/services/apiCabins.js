import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be loaded.')
  }

  return cabins
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl)

  const imageName = `${Date.now()}-${newCabin?.image?.name}`.replaceAll('/', '')
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // Create cabin
  let query = supabase.from('cabins')

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)
  else query = query.insert({ ...newCabin, image: imagePath })

  const { data: cabin, error } = await query.select().single()

  if (hasImagePath) return cabin

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created.')
  }

  // Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', cabin.id)

    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not be created.',
    )
  }

  return cabin
}

export async function deleteCabin(id) {
  let { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error.message)
    throw new Error('Cabin could not be deleted.')
  }

  return data
}
