import { useState, useEffect } from "react";
import  { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchItems } from '../services/api'

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery"
import  Button  from "./Button/Button"
import  Loader  from "./Loader/Loader"
import  ErrorView  from "./ErrorView/ErrorView";
import PendingView from "./PendingView/PendingView";

export default function App() {
  const [items, setItems] = useState({
    hits: [],
    totalHits: '',
    total: '',
  });
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [error, setError] = useState(null);

  const handleFormSubmit = itemName => {
    if (itemName === imageName) {
        toast.error("Enter new search value or press 'Load More' !");
        return
      }
    
    setImageName(itemName)
    setItems({
        hits: [],
        totalHits: '',
        total: '',
      })
    setPage(1);     
}

  useEffect(() => {
    if (imageName === '') {
      return
    }
    setLoading(true)
    setError(null)
    
    fetchItems(imageName, page)
      .then(({ hits, totalHits, total }) => {
        setItems(items => ({
          hits: [...items.hits, ...hits],
          totalHits,
          total,
        })
        );
        setLoading(false);
        const perPage = 12;
        const totalPages = Math.ceil(totalHits / perPage);
        if (hits.length !== 0 && page === 1) {
          toast.success(`Founded ${totalHits} images`);
          setLoadMore(true);
        }

        if (page === totalPages) {
          toast.info("No more results");
          setLoadMore(false);
        }


        if (totalHits === 0) {
          return Promise.reject(new Error(`Nothing was found according to your request ${imageName}. Try another query!`))
        }
      })
      .catch(error => {
        setError(error);
        Promise.reject(new Error(`${error.message}`));
        toast.error(`No results for "${imageName}"! `);
      })
  }, [page, imageName]);

  const onLoadMore = () => {
      setPage(prevPage => prevPage + 1 );
  };


     return (
      <>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>

        {items.hits.length !== 0 && <>
          <ImageGallery items={items.hits} />
          {loadMore && <Button onClick={onLoadMore} />}
          {items.hits.length === 0 && !loading && <PendingView />}
          {loading && <Loader />}
        </>}
        
      {error && <ErrorView errorName={error.message} />}
       <ToastContainer autoClose={2000} />
    </>
  );
  }

 

