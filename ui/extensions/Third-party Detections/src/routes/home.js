import React, { useContext, useEffect, useState } from "react";
import { FalconApiContext } from "../contexts/falcon-api-context";
import { Link } from '../components/link';

function Home() {
  const {falcon} = useContext(FalconApiContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiIntegration = falcon.apiIntegration({
          definitionId: 'JSONPlaceholder',
          operationId: 'GET__posts'
        });
        const response = await apiIntegration.execute();
        setData(response.resources[0].response_body);
        console.log('data', data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-4 space-y-8">
      <p class="text-neutral"> 👋 Hi {falcon.data.user.username}</p>
      <Link useFalconNavigation={true} to="/crowdscore">CrowdScore</Link>

      <p>Results from JSON Placeholder API:</p>

      <ul>
        {data.map(item => (
          <li key={item.id}>{item.id}: {item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export { Home };
