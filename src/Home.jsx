import Emailauth from './Emailauth/emailauth'
import Crudoperations from './Crudoperations/crudoperations'
import Login from './Emailauth/Loginpage/login'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function Home(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Emailauth/>}/>
                    <Route path='/crudoperation' element={<Crudoperations/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default Home;
