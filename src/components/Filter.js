import { useContext } from "react";
import { UserContext } from "../store/UserContext";

function Filter({ hdbList }) {
  const UserCtx = useContext(UserContext);
  const {
    credentials,
    setCredentials,
    handleCredentialsChange,
    handleLogin,
    isLogged,
    setIsLogged,
    criterias,
    setCriterias,
  } = UserCtx;

  const updateFilter = (e) => {
    setCriterias((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const resetFilter = (e) => {
    setCriterias((prev) => {
      return {
        ...prev,
        month: "",
        year: "",
        town: "",
        flat_model: "",
        flat_type: "",
        block: "",
        street_name: "",
        storey_range: "",
        floor_area_sqm: "",
        lease_commence_date: "",
        remaining_lease: "",
        resale_price: "",
        _id: "",
        budget: "",
      };
    });
  };

  const UniqueTown = hdbList.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.town === value.town)
  );

  const UniqueFlatModel = hdbList.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.flat_model === value.flat_model)
  );

  const UniqueFlatType = hdbList.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.flat_type === value.flat_type)
  );

  return (
    <>
      {/* <label for="year">Year</label>
      <select name="year" onChange={updateFilter}>
        <option value="">Select...</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
      </select> */}
      {/* <label htmlFor="month">Month</label>
      <select name="month" onChange={updateFilter}>
        <option value="">Select...</option>
        <option value="01">January</option>
        <option value="02">February</option>
      </select> */}
      <label htmlFor="town">Town</label>
      <select name="town" onChange={updateFilter}>
        <option value="">Select...</option>
        {UniqueTown.map((item) => {
          return <option value={item.town}>{item.town}</option>;
        })}
      </select>
      <label htmlFor="flat_type">Flat Type</label>
      <select name="flat_type" onChange={updateFilter}>
        <option value="">Select...</option>
        {UniqueFlatType.map((item) => {
          return <option value={item.flat_type}>{item.flat_type}</option>;
        })}
      </select>
      <label htmlFor="flat_model">Flat Model</label>
      <select name="flat_model" onChange={updateFilter}>
        <option value="">Select...</option>
        {UniqueTown.map((item) => {
          return <option value={item.flat_model}>{item.flat_model}</option>;
        })}
      </select>
      <div style={{ textAlign: "center" }} onClick={resetFilter}>
        Reset criterias
      </div>
    </>
  );
}
export default Filter;
