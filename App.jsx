import * as React from "react"
import PokemonCard from "./PokemonCard"
import ButtonGroup from "./ButtonGroup"

export default function App () {
  const [id, setId] = React.useState(1)
  const [pokemon, setPokemon] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true) //when loading 
  const [error, setError] = React.useState(null) //for if there is an error

  React.useEffect(() => {
    let ignore = false

    const handleFetchPokemon = async () => {
      setPokemon(null)
      setIsLoading(true) //set to true when start loading
      
      setError(null)

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        if (ignore) {
            return
        }

        if (res.ok === false) {
          throw new Error(`Error fetching pokemon #${id}`)
        }

        const json = await res.json()

        setPokemon(json)
        setIsLoading(false)
      } catch (e) {
        setError(e.message)
        setIsLoading(false)
      }
    }

    handleFetchPokemon()
    return () => {
      ignore = true
    }
  }, [id])

  return (
    <>
      <PokemonCard isLoading={isLoading} data={pokemon} error={error}/>
      <ButtonGroup handleSetId={setId} />
    </>
  )
}