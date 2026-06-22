import { useNavigate, useParams } from 'react-router';
import { useGetProductQuery } from './productApi';
import { baseUrl } from '../../app/mainApi';
import { Button, IconButton, Rating } from '@material-tailwind/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToCart } from '../carts/cartSlice';
import AddReview from '../user/AddReview';
import ReviewList from '../user/ReviewList';

export default function Product() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);

  const { data, isLoading, error } = useGetProductQuery(id);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.error}</h1>;
  console.log(data);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <img
            src={`${baseUrl}${data.image}`}
            alt=""
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 pt-10">
            {data.name}
          </h1>
          <p className="text-lg text-red-600 font-bold">Rs. {data.price}</p>
          <Rating value={data.rating} readonly />

          <div>
            <ProductAddToCart product={data} />
          </div>

          <p className="text-gray-700 pt-5 ">
            Description:<br></br>
            {data.description}
          </p>
        </div>
      </div>
      {user && user?.role === 'User' && <AddReview id={data._id} />}
      <ReviewList product={data} />
    </div>
  );
}

function ProductAddToCart({ product }) {
  const nav = useNavigate();
  const { carts } = useSelector((state) => state.cartSlice);
  const isExistCart = carts.find((cart) => cart._id === product._id);

  const [count, setCount] = useState(isExistCart?.qty || 1);
  const { user } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(
      setToCart({
        name: product.name,
        image: product.image,
        price: product.price,
        qty: count,
        _id: product._id,
      })
    );
    nav('/carts');
  };

  return (
    <div className="pt-5">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Quantity:</span>
        <IconButton
          disabled={count === 0}
          onClick={() => setCount((prev) => prev - 1)}
          size="sm"
          className="bg-gray-300"
        >
          <i className="fas fa-minus"></i>
        </IconButton>
        <span className="text-lg font-semibold">{count}</span>
        <IconButton
          onClick={() => setCount((prev) => prev + 1)}
          size="sm"
          className="bg-gray-300"
        >
          <i className="fas fa-plus"></i>
        </IconButton>
      </div>
      <br />
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={handleCart}
          disabled={!user || user?.role === 'Admin'}
          size="sm"
          className="bg-gray-600 hover:bg-red-600"
        >
          Buy Now
        </Button>
        <Button
          onClick={handleCart}
          disabled={!user || user?.role === 'Admin'}
          size="sm"
          className="bg-gray-600 hover:bg-red-600"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
