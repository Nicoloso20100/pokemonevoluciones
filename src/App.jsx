import React, { useEffect, useState } from 'react'
import Button from './components/Button'
import './App.css'
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import Card from './components/Card';



const App = () => {
  const [pokemonId, setPokemonId] = useState(1)
  const [pokemonEvolution, setPokemonEvolution]= useState([])
  




  useEffect(()=>{
    getEvolutions(pokemonId)
  }, [pokemonId])
  
  async function getEvolutions(id){
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    const data = await response.json()

    const pokemonEvoArray = []

    let pokemonEvo1 = data.chain.species.name
    let pokemonEvo1Img= await getPokemonImg(pokemonEvo1)

    pokemonEvoArray.push([pokemonEvo1, pokemonEvo1Img])

    if(data.chain.evolves_to.length !== 0){
      let pokemonEvo2 = data.chain.evolves_to[0].species.name
      let pokemonEvo2Img = await getPokemonImg(pokemonEvo2)
      pokemonEvoArray.push([pokemonEvo2, pokemonEvo2Img])

      if(data.chain.evolves_to[0].evolves_to.length !== 0){
        let pokemonEvo3 = data.chain.evolves_to[0].evolves_to[0].species.name
        let pokemonEvo3Img = await getPokemonImg(pokemonEvo3)
        pokemonEvoArray.push([pokemonEvo3, pokemonEvo3Img])
        
        console.log(pokemonEvoArray);
      }
    }
    setPokemonEvolution(pokemonEvoArray)
  }

  async function getPokemonImg(name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const data = await response.json()

    return data.sprites.other['official-artwork'].front_default
    
  }
  
  
  const prevClick = () => {
    pokemonId > 1 && setPokemonId(pokemonId - 1)
  }
  const nextClick = () => { setPokemonId(pokemonId + 1) }

  return (
    <div className='app'>
      <div className={`card__container card${pokemonEvolution.length}`}>
      {pokemonEvolution.map(pokemon => <Card key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />)}
        
      </div>
      <div className='button__container'>
        <Button
          icon={<TiArrowLeftOutline />}
          handleClick={prevClick}
        />

        <Button
          icon={<TiArrowRightOutline />}
          handleClick={nextClick}
        />
        
      </div>


    </div>
  )
}

export default App