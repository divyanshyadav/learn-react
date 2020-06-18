import React from 'react'

function debounce (fn, timeout)  {
    let timer;
    
    return function(...args) {
        const context = this

        clearTimeout(timer)
        
        timer = setTimeout(() => fn.apply(context, args), timeout)
    }
}

// catching

const STATUS = {
    IDEAL: 'ideal',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}

const useFetch = (url, options) => {
    const [status, setStatus] = React.useState(STATUS.IDEAL)
    const [ data, setData ] = React.useState({})
    const [ error, setError ] = React.useState('')
    const debounceOnFetch = React.useCallback(debounce(getDetails, 400), [])

    function getDetails(url, options) {
        fetch(url, options)
            .then(response => response.json())
            .then((result) => {
                setData(result)
                setStatus(STATUS.RESOLVED)
            }).catch((error) => {
                setError(error.message)
                setStatus(STATUS.REJECTED)
            })
    }

    React.useEffect(() => {
        setStatus(STATUS.PENDING)
        debounceOnFetch(url, options)
    }, [url, options, debounceOnFetch])

    return { status, data, error }
}

const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2'

function PokemonSearch() {
    const [pokemon, setPokemon] = React.useState('bulbasaur')
    const { status, data } = useFetch(`${POKEMON_BASE_URL}/pokemon/${pokemon}`)

    const getContent = () => {
        switch (status) {
            case STATUS.IDEAL:
                return <div>Ideal</div>
            case STATUS.PENDING:
                return <div>Loading...</div> 
            case STATUS.RESOLVED:
                const { 
                    species: { name } = {},
                    sprites: { front_default, back_default } = {},
                    types,
                    weight
                } = data
                
                if (!name) return

                return (
                    <div>
                        <img src={front_default} 
                            alt={`${name}-front`} 
                            height="200"
                        />
                        <img src={back_default} 
                            alt={`${name}-back`}
                            height="200"
                        />
                        <div>
                            <div>Name: {name}</div>
                            <div>Type</div>
                            <ul>
                                {types.map(t => <li key={t.slot}>{t.type.name}</li>)}
                            </ul>
                            <div>Weight: {weight}</div>
                        </div>
                    </div>
                )
            case STATUS.REJECTED:
                return <div>{`Not found`}</div>
            default:
                return <div>Unknown Status</div>
        }
    }

    const handleOnChange = (event) => {
        setPokemon(event.target.value)
    }

    return (
    <div>
        <input type='text' placeholder={'any pokemon name!'} value={pokemon} onChange={handleOnChange} />
        {getContent()}
    </div>)
}

export default PokemonSearch