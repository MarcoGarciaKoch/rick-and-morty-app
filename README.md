# Rick & Morty App

This project consist of the creation of a Rick & Morty character catalog application by calling the [Rick & Morti API](https://rickandmortyapi.com/) to fetch the data.
 

This was one of the first projects I did with **React** during my Full Stack Development Bootcamp and the technological stack used was:

- **React 18.1.0**
- **CSS3**

The application has the following main features:

- The user can filter characters by name.
- The user can filter by `alive` characters that match searching criteria. 
- The user can filter by `dead` characters that match searching criteria.
- The user can show again all characters by clicking a specific button.
- There is an infinte scroll integrated to load all the characters in a progressive manner. 


# Repository Structure

It only consists on the app client side.


# Front End

One of the remarkable implementations is the use of filters to search characters by name or by status. It requires to manage the state of the components when an onChange or onClick event occurs as well as managing the communication between components through Props. 
Another remarkable implementation is the pagination. It requires to set the useEffect hook to fetch data only when the value of the page changes via an onClick event on the buttons. 
An example of it below:

```js
// RickAndMorty/index.jsx

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
                <button className='next-page__button' onClick={() => updatePage(page+1)}>Next Page</button>
            </div>
            {filteredCharacters.length !== 0 ? <ListCharacters characterList={filteredCharacters}></ListCharacters> : <h1 className='not-found-message'>Not results found matching your criteria</h1>}
        </section>
    )
}

export default RickAndMorty;
```


# Deployment

The application has been deployed using GitHub Pages on the following url:

- https://marcogarciakoch.github.io/rick-and-morty-app/


# Local setup

Although it is deployed in GitHub Pages, it can be configured to run in a local environment.

To do so, the following steps must be performed:

1. Clone the monorepo
    > git clone https://github.com/MarcoGarciaKoch/rick-and-morty-app.git

2. On root folder run install

    > npm i

3. Now you can start the app as it follows:

    > npm start  (It will start the application)
