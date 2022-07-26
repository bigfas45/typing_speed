import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="page-container-welcome">
      <Head>
        <link rel="canonical" href="https://preview.keenthemes.com/metronic8" />
        <link
          rel="shortcut icon"
          href="https://preview.keenthemes.com/metronic8/demo1/assets/media/logos/favicon.ico"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
        />
        <link
          href="/assets/plugins/global/plugins.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/css/style.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>

      <div
        data-kt-name="metronic"
        id="kt_body"
        className="app-blank app-blank bgi-size-cover bgi-position-center bgi-no-repeat"
      >
        <div
          className="d-flex flex-column flex-root"
          id="kt_app_root"
          style={{ backgroundImage: "url('/assets/media/auth/bg8.jpg')" }}
        >
          <div className="d-flex flex-column flex-center flex-column-fluid">
            <div className="d-flex flex-column flex-center text-center p-10">
              <div className="card card-flush w-md-650px py-5">
                <div className="card-body py-15 py-lg-20">
                  <div className="mb-7">
                    <a
                      href="https://preview.keenthemes.com/metronic8/demo1/index.html"
                      className=""
                    >
                      <img
                        alt="Logo"
                        src="https://preview.keenthemes.com/metronic8/demo1/assets/media/logos/custom-2.svg"
                        className="h-40px"
                      />
                    </a>
                  </div>
                  <h1 className="fw-bolder text-gray-900 mb-5">
                    Welcome to Metronic
                  </h1>
                  <div className="fw-semibold fs-6 text-gray-500 mb-7">
                    This is your opportunity to get creative and make a name
                    <br />
                    that gives readers an idea
                  </div>
                  <div className="mb-0">
                    <img
                      src="../../assets/media/auth/welcome.png"
                      className="mw-100 mh-300px theme-light-show"
                      alt=""
                    />
                    <img
                      src="../../assets/media/auth/welcome-dark.png"
                      className="mw-100 mh-300px theme-dark-show"
                      alt=""
                    />
                  </div>
                  <div className="columns">
                    <div className="column">
                      <Link
                        href={{
                          pathname: '/start',
                          query: { slug: 'default' },
                        }}
                        className="btn btn-primary"
                      >
                        Default Setup
                      </Link>
                    </div>
                    <div className="column">
                      <Link
                        href={{
                          pathname: '/start',
                          query: { slug: 'custom' },
                        }}
                        className="btn btn-info"
                      >
                        Custom Setup
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
