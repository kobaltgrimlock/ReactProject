import React from "react";
import styles from "./hdbList.module.css";
import Layout from "../components/Layout/Layout";
import { Box, Typography } from "@mui/material";

const FavoritesTable = ({ favorites }) => {
  return (
    <>
      <Layout>
        <Box sx={{ my: 5, ml: 10, "& h4": { fontWeight: "bold", mb: 2 } }}>
          <Typography variant="h4">Your favorites</Typography>
          <p>Check out your favorite HDBs.</p>
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
          <div style={{ height: "800px" }}>
            {favorites.length === 0 ? (
              <p>No favorite products yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Town</th>
                    <th>Flat Type</th>
                    <th>Block</th>
                    <th>Street Name</th>
                    <th>Storey Range</th>
                    <th>Floor Area (sqm)</th>
                    <th>Flat Model</th>
                    <th>Lease Commence Date</th>
                    <th>Remaining Lease</th>
                    <th>Resale Price</th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map((item) => (
                    <tr key={item._id}>
                      <td>{item.month}</td>
                      <td>{item.town}</td>
                      <td>{item.flat_type}</td>
                      <td>{item.block}</td>
                      <td>{item.street_name}</td>
                      <td>{item.storey_range}</td>
                      <td>{item.floor_area_sqm}</td>
                      <td>{item.flat_model}</td>
                      <td>{item.lease_commence_date}</td>
                      <td>{item.remaining_lease}</td>
                      <td>{item.resale_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Box>
      </Layout>
    </>
  );
};

export default FavoritesTable;
