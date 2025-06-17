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
} from "@mui/material";
import { Link } from "react-router";

function UsersTable({
  users,
  page,
  total,
  limit,
  onPageChange,
  onLimitChange,
}) {
  return (
    <TableContainer
      component={Paper}
      className="relative w-full overflow-auto md:max-h-[70vh]"
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, firstName, lastName, email, role, image }) => (
            <TableRow key={id}>
              <TableCell>
                <img
                  src={image}
                  alt={`${firstName} profile`}
                  className="h-8 w-8 rounded-full"
                />
              </TableCell>
              <TableCell>
                {firstName} {lastName}
              </TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell>
                <Link
                  to={`/users/${id}`}
                  className="cursor-pointer font-medium text-orange-600 hover:text-blue-500"
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={limit}
        onRowsPerPageChange={(event) =>
          onLimitChange(parseInt(event.target.value, 10))
        }
        onPageChange={(event, newPage) => onPageChange(newPage + 1)}
        sx={{ position: "sticky", bottom: 0, backgroundColor: "white" }}
      />
    </TableContainer>
  );
}

export default UsersTable;
