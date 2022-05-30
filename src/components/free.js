import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

const Free = (props) => {
  const [value, setValue] = useState();
//   useEffect(() => {
//     $("#btndv").empty();
//     window.paypal
//       .Buttons({
//         createOrder: (data, actions, err) => {
//           return actions.order.create({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 description: `${value} Coupons`,
//                 amount: {
//                   currency_code: "USD",
//                   value: value,
//                 },
//               },
//             ],
//           });
//         },
//         onApprove: async (data, actions) => {
//           const order = await actions.order.capture();
//           console.log(order);
//         },
//         onError: (err) => {
//           console.log(err);
//         },
//       })
//       .render(paypal.current);
//   }, [value]);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/form";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    alert(`Is this your full name: ${result.data}`);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Form.Check
            label="100"
            name="group1"
            type="radio"
            id="r1"
            onChange={onChange}
          />
          <Form.Check
            label="200"
            name="group1"
            type="radio"
            id="r2"
            onChange={onChange}
          />
          <Form.Check
            label="1000"
            name="group1"
            type="radio"
            id="r3"
            onChange={onChange}
          />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default Free;
