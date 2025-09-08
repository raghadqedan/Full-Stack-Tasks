import { Link } from "react-router-dom";

export default  function NotFound(){
    return (<>
    <h1>404 (Not Found)</h1>
    <p>this url not found </p>
    <Link to={'/Home'}><button>Go To Home Page</button></Link>
    </>);
}