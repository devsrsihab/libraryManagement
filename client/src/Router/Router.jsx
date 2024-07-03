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

const base_url = import.meta.env.VITE_BASE_URL;

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
        loader: () => fetch(`${base_url}/books`),
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <SingleBook />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${base_url}/book/${params.id}`),
      },
      {
        path: "/books/:category",
        element: (
          <PrivateRoute>
            <SingleCategory />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${base_url}/books/${params.category}`),
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
        loader: ({ params }) => fetch(`${base_url}/book/${params.id}`),
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
    path: "dashboard",
    element: (
      <PrivateRoute>
        <AdminLayouts />
      </PrivateRoute>
    ),
    loader: () => fetch(`${base_url}/users`),
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
        path: "borrowdBooks",
        element: (
          <PrivateRoute>
            <BorrowdBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "booksList",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <BooksList />
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: () => fetch(`${base_url}/users`),
      },
      {
        path: "book/category",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <BookCategoryList />
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: () => fetch(`${base_url}/users`),
      },
      {
        path: "book/authors",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AuthorList />
            </AdminRoute>
          </PrivateRoute>
        ),
        loader: () => fetch(`${base_url}/users`),
      },
    ],
  },
]);

export default router;
