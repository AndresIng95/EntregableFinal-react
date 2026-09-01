import { useEffect, useState } from "react";

type ApiInfo = {
  version: string;
  app: string;
};

function App() {
  const [info, setInfo] = useState<ApiInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://d3ujwk09smrk9z.cloudfront.net/info")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error getting information from API");
        }

        return response.json();
      })
      .then((data) => {
        setInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>TaskFlow API</h1>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {info && (
        <div>
          <p>
            <strong>Application:</strong> {info.app}
          </p>

          <p>
            <strong>Version:</strong> {info.version}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;