import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import Title from './Title';
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext';

const RecommendationSection = ({ title, model, payload }) => {
  const [items, setItems] = useState([]);
  const { backendUrl } = useContext(ShopContext);

  const payloadStable = useMemo(() => payload, [JSON.stringify(payload)]);
  // console.log('payload: ', payloadStable)
  
  const fetchRecommendations = useCallback(async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/recommend/${model}`,
        payloadStable,
      );

      if (response.data.success) {
        setItems(response.data.products || []);
      } else {
        setItems([]);
        console.warn(response.data.message);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setItems([]);
    }
  }, [backendUrl, model, payloadStable]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title
          text1={title.split(' ')[0]}
          text2={title.split(' ').slice(1).join(' ')}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {items.map((item) => (
          <ProductItem
            key={item._id || item.parent_asin}
            parent_asin={item.parent_asin}
            title={item.title}
            price={item.price}
            images={item.images}
            average_rating={item.average_rating}
            rating_number={item.rating_number}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;