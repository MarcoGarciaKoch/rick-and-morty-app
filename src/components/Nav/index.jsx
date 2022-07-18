import './style.css';


function Nav ({filterCharacter, onClickAlive, onClickDead, onClickShowAll, inputValue}) {

  
    
    return (
        <nav className='nav__container'>
            <div className='nav-image'></div>
            <input onChange={filterCharacter} value={inputValue} className='search-input' type="text" placeholder='Search Character'/>
            <section className='nav-buttons__container'>
                <button onClick={onClickAlive}>Filter Alive Characters</button>
                <button onClick={onClickDead}>Filter Dead Characters</button>
                <button onClick={onClickShowAll}>Show All Characters</button>
            </section>
        </nav>
    )
}


export default Nav;