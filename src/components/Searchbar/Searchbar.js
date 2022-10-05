import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Searchbar.module.css'
import { BsSearch } from 'react-icons/bs'
import { toast } from 'react-toastify';


export default class Searchbar extends Component {
    state = {
    imageName: '',
  }
    hendleNameChange = event => {
        this.setState({ imageName: event.currentTarget.value.toLowerCase() });
    };
  
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.imageName.trim() === '') {
            toast.error("Please, enter a search value");
            return
        }
        this.props.onSubmit(this.state.imageName);
        this.setState({imageName: ''})
        
    }

    
  
    render() {
        return (
            <header className={css.Searchbar} onSubmit={this.handleSubmit}>
                <form className={css.SearchForm}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}><BsSearch className={css.Icon}></BsSearch></span>
                    </button>
                    <input
                        className={css.SearchFormInput}
                        type="text"
                        name='imageName'
                        value={this.state.imageName}
                        onChange={this.hendleNameChange}
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}



Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,

}