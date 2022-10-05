import { Component } from "react";
import  { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchItems } from '../services/api'

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery"
import  Button  from "./Button/Button"
import  Loader  from "./Loader/Loader"
import  ErrorView  from "./ErrorView/ErrorView";
import PendingView from "./PendingView/PendingView";




export default class App extends Component {
  state = {
    items: {
      hits: [],
      totalHits: '',
      total: '',
    },
    imageName: '',
    loading: false,
    page: 1,
    perPage: 12,
    loadMore: true,
    error: null
  }
  handleFormSubmit = imageName => {
    if (imageName === this.state.imageName) {
        toast.error("Enter new search value or press 'Load More' !");
        return
      }
    
        return this.setState({
          imageName, 
          items: {
            hits: [],
            totalHits: '',
            total: '',
        },
          page: 1,
        });
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page, perPage } = this.state
    const prevName = prevState.imageName;
    const nextName = imageName;


    if (prevName !== nextName ||
      prevState.page !==  page) {
    
      this.setState({ loading: true, error: null, })

       fetchItems(imageName, page, perPage)
        .then(({ hits, totalHits, total }) => {
          this.setState(prevState => ({
            items: {
              hits: [...prevState.items.hits, ...hits],
              totalHits,
              total,
            },
            loading: false,
          
          }));
                


        const totalPages = Math.ceil(totalHits / perPage);
          
        if (hits.length !== 0 && page === 1 ) {
          toast.success(`Founded ${totalHits} images`);
          this.setState({loadMore: true,})
        }

        if (page === totalPages) {
          toast.info("No more results");
          this.setState({loadMore: false,})
        }


          if (totalHits === 0) {
            return Promise.reject(new Error(`Nothing was found according to your request ${imageName}. Try another query!`))
          }
        })
        .catch(error => {
          this.setState({ error })
          Promise.reject(new Error(`${error.message}`))
          toast.error(`No results for "${imageName}"! `);
          
        })
    }
  }

  loadMore = () => { this.setState(prevState => ({ page: prevState.page + 1 }));
  };


  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>

        {this.state.items.hits.length !== 0 && <>
          <ImageGallery items={this.state.items.hits} />
          {this.state.loadMore && <Button onClick={this.loadMore} />}
          {this.state.items.hits.length === 0 && !this.state.loading && <PendingView />}
          {this.state.loading && <Loader />}
        </>}
        
      {this.state.error && <ErrorView errorName={this.state.error.message} />}
       <ToastContainer autoClose={2000} />
    </>
  );
  }
  
};
    