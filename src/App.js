import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  //  async await syntax
  useEffect(() => {
    getResults();
  }, []);

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  const handleClearForm = () => {
    setQuery("");
    searchInputRef.current.focus();
  };
  const getResults = async () => {
    setLoading(true);
    // try catch for error handling

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  // traditional promise syntax
  // useEffect(() => {
  //   axios
  //     .get("http://hn.algolia.com/api/v1/search?query=reacthooks")
  //     .then(response => {
  //       console.log(response.data);
  //       setResults(response.data.hits);
  //     });
  // }, []);

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" alt="React logo" className="float-right h-12"/>
      <h1 className="text-grey-600 font-thin text-4xl">Hacker News Reach</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        {/* could add throttle function or debounce or button */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded m-1 p-1"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClearForm}
          className="bg-teal-600 text-white rounded m-1 p-1"
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div className="font-bold text-blue-600 ">Loading results...</div>
      ) : (
        <ul className="leading-normal">
          {results.map(result => (
            <li
              className="text-blue-600 hover:bg-blue-600 hover:text-white"
              key={result.objectID}
            >
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="font-bold text-red-600 ">{error.message}</div>}
    </div>
  );
}
