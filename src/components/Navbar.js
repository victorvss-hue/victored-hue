import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{padding: "10px", backgroundColor: "#ddd"}}>
            <Link to = "/">Home </Link>
            <Link to = "/register">cadastro</Link>
            <Link to = "/login">login</Link>       
        </nav>
    );
    
};
export default Navbar; 