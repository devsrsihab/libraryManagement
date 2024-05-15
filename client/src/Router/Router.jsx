import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import LoginForm from "../Components/Auth/LoginForm";
import Registration from "../Components/Auth/Registration";
import Home from "../Pages/Web/Home";
import AdminLayouts from "../Layouts/AdminLayouts";
import Dashboard from "../Pages/Admin/Dashboard";
import BooksList from "../Pages/Admin/AddBooks/BooksList";
import BookCategoryList from "../Pages/Admin/Category/BookCategoryList";
import AuthorList from "../Pages/Admin/Authors/AuthorList";
import AllBooks from "../Pages/Web/AllBooks/AllBooks";
import BorrowdBooks from "../Pages/Web/BorrowedBooks/BorrowdBooks";
import SingleCategory from "../Components/Home/Category/SingleCategory";
import SingleBook from "../Components/Shared/SingleBook";
// import ErrorPage from "../Components/Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import BookRead from "../Pages/Web/BorrowedBooks/bookRead";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:2000/books"),
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <SingleBook />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:2000/book/${params.id}`),
      },
      {
        path: "/books/:category",
        element: (
          <PrivateRoute>
            <SingleCategory />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:2000/books/${params.category}`),
      },
      {
        path: "/borrowdBooks",
        element: (
          <PrivateRoute>
            <BorrowdBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/bookRead/:id",
        element: (
          <PrivateRoute>
            <BookRead />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:2000/book/${params.id}`),
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayouts />
        </AdminRoute>
      </PrivateRoute>
    ),
    loader: () => fetch("http://localhost:2000/users"),
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "booksList",
        element: (
          <PrivateRoute>
            <BooksList />
          </PrivateRoute>
        ),
      },
      {
        path: "book/category",
        element: (
          <PrivateRoute>
            <BookCategoryList />
          </PrivateRoute>
        ),
      },
      {
        path: "book/authors",
        element: (
          <PrivateRoute>
            <AuthorList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
