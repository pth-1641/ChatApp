import { Html, Head, Main, NextScript } from 'next/document';

function MyDocument() {
    return (
        <Html>
            <Head>
                <link
                    rel='shortcut icon'
                    href='favicon.png'
                    type='image/x-icon'
                />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin={true}
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <body className='scroll-smooth antialiased overflow-hidden'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;
