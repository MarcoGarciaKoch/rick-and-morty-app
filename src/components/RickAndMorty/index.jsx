import './style.css';
import Nav from '../Nav';
import ListCharacters from '../ListCharacters';
import { useEffect, useState } from 'react';


function RickAndMorty () {

    const [originalCharacterList, updateOriginalCharacterList] = useState([]);
    const [filteredCharacters, updateFilteredCharacters] = useState([]);
    const [filterValue, updateFilterValue] = useState('');
    const [page, updatePage] = useState(1);

    useEffect( () => {
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(r => r.json())
        .then(d => {
            updateOriginalCharacterList(d.results);
            updateFilteredCharacters(d.results);
        })
    }, [page]);
    

    const filterCharacter = e => {
        const value = e.target.value.toLowerCase()
        updateFilteredCharacters(originalCharacterList.filter( c => c.name.toLowerCase().includes(value)));
        updateFilterValue(value);
    }

    const filterAlive = () => {
        updateFilteredCharacters(originalCharacterList.filter(c => (c.status.toLowerCase() === 'alive') && (c.name.toLowerCase().includes(filterValue))));
    }

    const filterDead = () => {
        updateFilteredCharacters(originalCharacterList.filter(c => (c.status.toLowerCase() === 'dead') && (c.name.toLowerCase().includes(filterValue))));
    }

    const showAllCharacters = e => {
        updateFilteredCharacters(originalCharacterList);
        updateFilterValue('');
    }


    return (
        <section className='rick-morty__container'>
            <Nav 
                filterCharacter={filterCharacter} 
                onClickAlive={filterAlive} 
                onClickDead={filterDead}
                onClickShowAll={showAllCharacters}
                inputValue={filterValue}
            ></Nav>
             <div className='pagination-buttons__container'>
                <button className='previous-page__button' onClick={() => updatePage(page<=1 ? 1 : page-1)}>Previous Page</button>
                <button className='next-page__button' onClick={() => updatePage(page>=41 ? 41 : page+1)}>Next Page</button>
            </div>
            {filteredCharacters.length !== 0 ? <ListCharacters characterList={filteredCharacters}></ListCharacters> : <h1 className='not-found-message'>Not results found matching your criteria</h1>}
        </section>
    )
}


export default RickAndMorty;