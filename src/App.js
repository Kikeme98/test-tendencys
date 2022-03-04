import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import TableOrders from "./components/tableOrders/TableOrders";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await Axios.get(
          "https://eshop-deve.herokuapp.com/api/v2/orders",
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ",
            },
          }
        );
        setData(result.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="App">
        <TableOrders data={data} />
      </div>
    );
  }
}

export default App;
