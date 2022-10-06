import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from './Searchbar.module.css'
import { BsSearch } from 'react-icons/bs'
import { toast } from 'react-toastify';


export default function Searchbar({onSubmit}) {
    const [imageName, setImageName] = useState('');

    const hendleNameChange = event => {
        setImageName(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (imageName.trim() === '') {
            toast.error("Please, enter a search value");
            return
        }
        onSubmit(imageName);
        setImageName('');
        
    };
    return (
            <header className={css.Searchbar} onSubmit={handleSubmit}>
                <form className={css.SearchForm}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}><BsSearch className={css.Icon}></BsSearch></span>
                    </button>
                    <input
                        className={css.SearchFormInput}
                        type="text"
                        name='imageName'
                        value={imageName}
                        onChange={hendleNameChange}
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
}
  
     
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,

}