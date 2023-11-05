import './App.css';
import NavBar from "./components/navs/NavBar";
import {Outlet} from "react-router-dom";
import MainCard from "./components/modules/main/Maincard";
import Footer from "./components/modules/footer/Footer";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.light" align="center" {...props}>
            {'Copyright © TALKtrack_1.0.0___   '}
            <Link color="inherit" href="https://noodlesripter.com/">
                @noodlescripter
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function App() {
    return (
        <>
            <NavBar></NavBar>
            <MainCard></MainCard>
            <main>
                <Outlet/>
                <div className={"mb-3"}>
                    <Copyright sx={{mt: 2}}/>
                </div>

            </main>

        </>
    );
}

export default App;
