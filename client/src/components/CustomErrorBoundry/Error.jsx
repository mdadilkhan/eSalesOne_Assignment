import React from "react";

const Error = ({ error }) => {
  console.log(error);

  return (
    <main className="grid min-h-screen place-items-center bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">
          Oops! Something went wrong.
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
          {error?.message || "Unexpected Error"}
        </h1>
        <p className="mt-6 text-lg text-gray-600 sm:text-xl">
          Sorry, we encountered an issue. Please try again later.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Refresh Page
          </button>
          <a href="/" className="text-sm font-semibold text-gray-900">
            Go to Homepage <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {error && (
          <pre className="mt-6 rounded bg-gray-200 p-4 text-sm text-gray-700 max-w-xl mx-auto overflow-x-auto">
            {error.stack}
          </pre>
        )}
      </div>
    </main>
  );
};

export default Error;
