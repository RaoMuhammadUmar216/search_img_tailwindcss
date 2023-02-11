import React, { useState, useEffect } from 'react';
import keys from './secret';
import { ImageCards } from './components/imageCards';
import { ImageSearch } from './components/imageSearch';
import axios from 'axios';
import './tailwind.css';


const App = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {


    // using FETCH api
    // fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`)
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err))


    // Using AXIOS
    const getData = async () => {
      try {

        const { data } = await axios.get(`https://pixabay.com/api/?key=${keys.PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo&pretty=true`)

        setImages(data.hits);
        setIsLoading(false);

      } catch (err) {

        console.log(err)
      }

    }
    getData();

  }, [searchTerm]);


  return (
    <div className='mx-auto container'>
      <ImageSearch searchText={((text) => setSearchTerm(text))} />
      {isLoading ? <h1 className='text-6xl text-center mx-auto mt-96'>Loading...</h1> : <div className='grid grid-cols-1 gap-14 sm:grid-cols-3'>
        {images.map(imageCards =>
          <ImageCards key={imageCards.id} image={imageCards} />
        )
        }
      </div>}
    </div>
  )
}

export default App;
