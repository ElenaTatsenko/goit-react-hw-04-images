import PropTypes from 'prop-types';


export const fetchItems = async (imageName, page, perPage) => {
    const KEY = "29216900-862a9e8f9f3ad454828049dde";
    
    const res = await fetch(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`);
    if (res.ok) {
        return res.json();
    }
    return await Promise.reject(new Error(`Nothing was found according to your request ${imageName}. Try another query!`));
}

fetchItems.propTypes = {
    imageName: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired
}
