import React, { useRef, useState, useEffect } from "react";
import { Radio, Space } from "antd";
import $ from "jquery";

export default function Paypal() {
  const paypal = useRef();

  const [value, setValue] = useState();
  useEffect(() => {
    $("#btndv").empty();
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `${value} Coupons`,
                amount: {
                  currency_code: "USD",
                  value: value,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [value]);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <Radio.Group onChange={onChange} value={value} size="large">
        <Space direction="vertical">
          <Radio value={100}> 100</Radio>
          <Radio value={200}> 200</Radio>
          <Radio value={1000}>1000</Radio>
        </Space>
      </Radio.Group>
      <div id="btndv" ref={paypal}></div>
    </div>
  );
}
