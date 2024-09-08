import supabase from './supabase'

export async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be loaded.')
  }

  return cabins
}

export async function createCabin(newCabin) {
  let { data: cabin, error } = await supabase.from('cabins').insert(newCabin)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created.')
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
