import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom"

export const checkAuth = (Component) =>{
    function Wrapper(props){
        var user = useSelector(store=>store.auth.user);
        var navigate = useNavigate();
        var location=useLocation()
        useEffect(()=>{
            if(!user){
                navigate('/login');
            }
            else{
                navigate(location)
            }
        },[user,navigate]);
        return <Component {...props}/>;
    }
    return Wrapper;
}

export default checkAuth;