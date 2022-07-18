import './style.css';
import { useEffect, useState } from 'react';

function Character ({character}) {

    const [firstEpisode, updateEpisode] = useState('');

    useEffect( () => {
        fetch(character.episode[0])
        .then(r => r.json())
        .then(d => updateEpisode(d.name))
    },[])

    let statusOfLife = '';

    switch (character.status) {
        case 'Alive':
            statusOfLife = 'life-status--alive';
            break;
        case 'Dead' :
            statusOfLife = 'life-status--dead';
            break;
        default: 
            statusOfLife = 'life-status--unknown';
            break;
    }

    // OTRA OPCION EN LUGAR DEL SWITCH CASE SERIA : USANDO OBJETOS

/**
 * Construimos un objeto que las claves son iguales a los nombres de las variables que nos viene en el objeto del
 * en este caso character.status --> En el div pondríamos {statusOfLife[character.status]} y nos cogería directamente
 * del objeto el status correspondiente.
 * Con esta opción podría incluso poner diferentes elementos html como valor de cada clave.
 * 
 * const statusOfLife = {
 *  Alive: 'life-status--alive',
 *  Death: 'life-status--dead',
 *  unknown: 'life-status--unknown'
 * }
 */

    return (
        <section className='card__container'>
            <img className='character-image' src={character.image} alt={`Image of ${character.name}´s character`} />
            <section className='card-details__container'>
                <div className='character-details__container'>
                    <h1 className='character-name'>{character.name}</h1>
                    <div className='status-species-container'>
                        <div className={`life-status ${statusOfLife}`}></div>
                        <p className='status-species-details'>{character.status} - {character.species}</p>
                    </div>
                </div>
                <div className='location-details__container'>
                    <h2 className='last-location-title'>Last Known Location</h2>
                    <p className='last-location-info'>{character.location.name}</p>
                </div>
                <div className='episode-details__container'>
                    <h2 className='first-episode-title'>First Seen In:</h2>
                    <p className='first-episode-info'>{firstEpisode}</p>
                </div>
            </section>
        </section>
    )
}


export default Character;