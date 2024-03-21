import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ListPosts from "./components/blog/ListPost";
import CreatePost from "./components/blog/CreatePost";
import ViewPost from "./components/blog/ViewPost";
import EditPost from "./components/blog/EditPost";


const router = createBrowserRouter([
    { path: '/home', element: <App/> },
    {path:'/', element:<Signup/>},
    { path: '/login', element:<Login/>},
    { path: '/blog/medicine',element:<ListPosts/>},
    { path : '/blog/medicine/create' , element : <CreatePost/> },
    { path: '/blog/medicine/:postId', element: <ViewPost/>},
    { path : '/blog/medicine/:postId/edit', element: <EditPost/>}

    
    
]);

export default router;