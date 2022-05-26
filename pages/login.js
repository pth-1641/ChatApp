import LoginPage from '../components/Login';
import Head from 'next/head';

function Login() {
    return (
        <>
            <Head>
                <title>Messenger Log In</title>
            </Head>
            <LoginPage />
        </>
    );
}

export default Login;
