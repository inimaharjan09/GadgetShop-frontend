import React from 'react';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import {
  useGetProductsQuery,
  useRemoveProductsMutation,
} from '../products/productApi';
import { baseUrl } from '../../app/mainApi';
import { NavLink } from 'react-router';
import RemoveButton from './RemoveButton';

const TABLE_HEAD = ['image', 'name', '_id', 'edit', 'delete'];

export default function AdminPage() {
  const { isLoading, error, data } = useGetProductsQuery();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.error}</h1>;
  console.log(data);

  return (
    <div className="mt-5">
      <div className="flex justify-center my-5">
        <NavLink to={'/admin/products/add'}>
          {' '}
          <Button color="blue">Add Product</Button>
        </NavLink>
      </div>

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ _id, name, image }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <Avatar src={`${baseUrl}${image}`}></Avatar>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {_id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <NavLink to={`/admin/products/edit/${_id}`}>
                      <IconButton size="sm" color="green">
                        <i className="fa fa-edit"></i>
                      </IconButton>
                    </NavLink>
                  </td>

                  <td className={classes}>
                    <RemoveButton id={_id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
