import './style.css';
import Character from '../Character';


function ListCharacters ({characterList}) {

    return (
        <section className='character-list__container'>
            {characterList.map( c => <Character key={c.id} character={c} ></Character>)}
        </section>
    )
}


export default ListCharacters;