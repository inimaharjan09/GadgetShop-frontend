import { Carousel } from '@material-tailwind/react';
import React from 'react';
import { useGetTop5ProductsQuery } from './productApi';
import { baseUrl } from '../../app/mainApi';

export default function Top5Product() {
  const { isLoadaing, error, data } = useGetTop5ProductsQuery();
  console.log(data);
  if (isLoadaing) return <h1>Loading...</h1>;
  if (error) return <h1>{error.error}</h1>;

  return (
    <div>
      <Carousel autoplay loop className="h-[400px]">
        {data &&
          data.map(({ _id, image }) => {
            return (
              <img
                key={_id}
                src={`${baseUrl}${image}`}
                alt="image 1"
                className="h-full w-full object-cover"
              />
            );
          })}
      </Carousel>
    </div>
  );
}
