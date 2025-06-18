import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

function ProductsTable({
  products,
  page,
  total,
  limit,
  onPageChange,
  onLimitChange,
}) {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      className="relative w-full overflow-auto md:max-h-[70vh]"
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Reviews</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(
            ({
              id,
              title,
              description,
              category,
              price,
              rating,
              reviews,
              thumbnail,
            }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>
                  <img
                    src={thumbnail}
                    alt={`${title} thumbnail`}
                    className="w-20 rounded-full bg-white p-1 md:w-40"
                  />
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>$ {price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 rounded-full bg-yellow-200 px-4 py-1 dark:text-black">
                    <FaStar className="text-2xl text-yellow-500" />
                    <p>{rating}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">{reviews.length}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <Link
                      className="cursor-pointer font-medium text-orange-500 hover:text-blue-500"
                      to={`/products/${id}`}
                    >
                      View Details
                    </Link>
                    <Link
                      className="cursor-pointer font-medium text-orange-500 hover:text-blue-500"
                      to={`/products/update/${id}`}
                    >
                      Edit
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={limit}
        onRowsPerPageChange={(event) =>
          onLimitChange(parseInt(event.target.value), 10)
        }
        onPageChange={(event, newPage) => onPageChange(newPage + 1)}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: theme.palette.background.default,
        }}
      />
    </TableContainer>
  );
}

export default ProductsTable;
