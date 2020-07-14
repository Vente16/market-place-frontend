import React, { useState } from 'react';
import { Redirect, BrowserRouter as Router } from "react-router-dom";


const SearchProduct = () => {

    const [word, setWord] = useState("");
    const [search, setSearch] = useState(false);
    const [url, setUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(word.length > 0 && word.trim() !== ''){
            let search = `/search/${word}`;
            setUrl(search);
            setSearch(true);
        }
    }

    const handleChangeInput = (e) => {
        setWord(e.target.value);
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
          console.log('enter press here! ');
        }
    }

    return (

        <div className="font-sans text-black bg-white flex items-center justify-center">
            <form onSubmit={handleSubmit}>
                <div className="border rounded overflow-hidden flex">

                    <input type="text"
                    onChange={handleChangeInput}
                    onKeyPress={handleKeyPress}
                    value={word}
                    className="px-4 py-2"
                    placeholder="Search..."/>
                    <button type="submit" className="flex items-center justify-center px-2 border-l">
                    <svg className="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
                    </button>

                </div>
            </form>
            { (search) ? <Redirect to={url}/>:  null }
        </div>


     );


}

export default SearchProduct;