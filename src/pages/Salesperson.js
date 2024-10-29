import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { BeatLoader } from "react-spinners";
import Layout from "../components/Layout/Layout";
import styles from "./hdbList.module.css";
import { Box, Typography } from "@mui/material";

function App() {
  const [salesPerson, setSalesPerson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const limit = 50; // Number of records per page
  const datasetId = "d_07c63be0f37e6e59c07a4ddc2fd87fcb";
  const url = `https://data.gov.sg/api/action/datastore_search?resource_id=${datasetId}`;

  // Function to calculate years of experience
  const calculateExperience = (registrationStartDate) => {
    const currentDate = dayjs();
    const startDate = dayjs(registrationStartDate);
    const years = currentDate.diff(startDate, "year");
    return `${years} years`;
  };

  // Fetch data based on the current page
  useEffect(() => {
    const fetchSalesPerson = async (offset = 0) => {
      setIsLoading(true);
      setError(null); // Reset error before each request

      try {
        const response = await axios.get(
          `${url}&limit=${limit}&offset=${offset}`
        );
        const records = response.data.result.records;
        const total = response.data.result.total;
        setTotalRecords(total); // Get total number of records

        setSalesPerson(records); // Set current page records
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    const offset = (currentPage - 1) * limit; // Calculate offset based on current page
    fetchSalesPerson(offset);
  }, [currentPage]); // Fetch data whenever the current page changes

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalRecords / limit)) {
      setCurrentPage(newPage);
    }
  };

  // Filter salesPerson data based on search term (case-insensitive)
  const filteredSalesPerson = salesPerson.filter((person) =>
    person.salesperson_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Box sx={{ my: 5, ml: 10, "& h4": { fontWeight: "bold", mb: 2 } }}>
        <Typography variant="h4">Find the best agent</Typography>
        <p>Find your best agent with the right experience.</p>
      </Box>
      <Box
        sx={{
          m: 3,
          width: "600px",
          ml: 10,
          "@media (max-width:600px)": {
            width: "300px",
          },
        }}
      >
        <div>
          <p>Total records: {totalRecords}</p>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Salesperson"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to the first page when searching
            }}
            style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
          />

          {isLoading ? (
            <BeatLoader color={"#123abc"} loading={isLoading} />
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <table border="1" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                  <tr>
                    <th>SalesPerson Name</th>
                    <th>Years of Service</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalesPerson.map((person, index) => (
                    <tr key={index}>
                      <td>{person.salesperson_name}</td>
                      <td>
                        {calculateExperience(person.registration_start_date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span style={{ margin: "0 10px" }}>
                  Page {currentPage} of {Math.ceil(totalRecords / limit)}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalRecords / limit)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </Box>
    </Layout>
  );
}

export default App;
