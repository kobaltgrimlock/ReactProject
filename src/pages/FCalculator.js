import Layout from "../components/Layout/Layout";
import { useContext, useState } from "react";
import Joi from "joi-browser";
import { Box, Typography } from "@mui/material";
import { UserContext } from "../store/UserContext";

function FCalculator() {
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

  const blankForm = {
    cpf: 0,
    cash: 0,
    income: 0,
    loan: 0,
  };

  const [form, setForm] = useState(blankForm);

  const handlerUpdateForm = (event, key) => {
    const value = parseInt(event.target.value);
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
  };

  const [error, setError] = useState({});

  const schema = {
    cpf: Joi.number().min(0).required(),
    cash: Joi.number().min(0).required(),
    income: Joi.number().min(0).required(),
    loan: Joi.number().min(0).required(),
  };

  const handlerOnChange = (event) => {
    const { name, value } = event.target;
    console.log(value);
    const errorMessage = validate(event);
    let errorData = { ...error };

    if (errorMessage) {
      errorData[name] = errorMessage;
      console.log(errorMessage);
    } else {
      delete errorData[name];
      handlerUpdateForm(event, name);
    }
  };
  const validate = (event) => {
    const { name, value } = event.target;
    const objToCompare = { [name]: value };
    const subSchema = { [name]: schema[name] };

    const result = Joi.validate(objToCompare, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const handlerOnSubmit = (event) => {
    event.preventDefault();
    const result = Joi.validate(form, schema, { abortEarly: false });
    const { error } = result;
    if (!error) {
      console.log(form);
      return form;
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      setError(errorData);
      console.log(errorData);
      return errorData;
    }
  };

  const loanAmt = (form.cpf + form.cash) / 0.25 - (form.cpf + form.cash);
  const [totalBudget, setTotalBudget] = useState(0);

  const calculateTotalBudget = () => {
    setTotalBudget(loanAmt + form.cpf + form.cash);
    setCriterias((prev) => {
      return {
        ...prev,
        budget: loanAmt + form.cpf + form.cash,
      };
    });
    console.log(totalBudget);
  };

  return (
    <>
      <Layout>
        <Box sx={{ my: 5, ml: 10, "& h4": { fontWeight: "bold", mb: 2 } }}>
          <Typography variant="h4">Calculate your budget</Typography>
          <p>Fill in the below form and we'll help you calculate your budget</p>
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
            <h2>Budget Calculator</h2>
            <br />
            <div style={{ width: "100%" }}>
              <form
                style={{ width: "800px", margin: "auto" }}
                onSubmit={handlerOnSubmit}
              >
                <label>CPF:</label>
                <br />
                <input
                  type="number"
                  name="cpf"
                  placeholder="Enter CPF Amount"
                  onChange={handlerOnChange}
                />
                <br />
                <br />
                <label>Cash On Hand:</label>
                <br />
                <input
                  type="number"
                  name="cash"
                  placeholder="Enter total cash"
                  onChange={handlerOnChange}
                />
                <br />
                <br />
                <label>Monthly Income:</label>
                <br />
                <input
                  type="number"
                  name="income"
                  placeholder="Enter monthly income"
                  onChange={handlerOnChange}
                />
                <br />
                <br />
                <button name="calculate" onClick={calculateTotalBudget}>
                  Get your budget now
                </button>
                <br />
                <label>
                  Maximum Loan Amount (Calculated as 75% after taking 25% CPF &
                  Cash into account): {loanAmt}
                </label>
                <br />
                <br />
                <h2>Estimated Total Budget: {criterias.budget} SGD</h2>
              </form>
            </div>
          </div>
        </Box>
      </Layout>
    </>
  );
}

export default FCalculator;
