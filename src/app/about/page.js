import React from "react";

const About = () => {
  return (
    <>
      <div className="p-4 container">
        <h1 className="text-3xl font-bold mb-4">
          E-Commerce Application Overview:
        </h1>
        <p className="mb-6">
          Our e-commerce application is designed to provide a seamless shopping
          experience for users while offering administrative functionalities for
          managing products and orders. The application caters to both normal
          users and administrators, each with their respective roles and
          capabilities.
        </p>

        <h1 className="text-2xl font-bold mb-2">Features for Normal Users:</h1>
        <div className="mb-6">
          <p className="mb-2">
            <b>Browsing and Buying Products:</b> Normal users can browse through
            various products, and add items to their shopping cart. They can
            proceed to checkout to complete their purchase securely.
          </p>
          <p className="mb-2">
            <b>Viewing Order History:</b> Users have access to their order
            history, where they can track the status of their past purchases,
            view order details, and generate invoices on the order page. If a
            payment fails, they can retry their payment.
          </p>
          <p className="mb-2">
            <b>User Authentication:</b> Users have the option to create an
            account using their email and password. Alternatively, they can
            choose to log in using their Google account for added convenience.
          </p>
        </div>

        <h1 className="text-2xl font-bold mb-2">Features for Admin Users:</h1>
        <div className="mb-6">
          <p className="mb-2">
            <b>Managing Products:</b> Admin users have the privilege of being
            able to add, update, and delete products from the admin dashboard.
          </p>
          <p className="mb-2">
            <b>Viewing Orders:</b> Users can access a comprehensive overview of
            all orders placed on the platform on the order page, and they can
            also delete orders.
          </p>
          <p className="mb-2">
            <b>User Authentication:</b> Users cannot create a new account
            manually. They can only log in using the following demo credentials:
          </p>
        </div>

        <p className="mb-4 text-red-500">
          <b>Warning:</b> Please do not use real personal information or payment
          details on this demo platform. Instead, utilize the provided demo
          information for testing and exploration purposes.
        </p>

        <h2 className="text-xl font-bold mb-2">Demo Credentials for Testing</h2>
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Normal User:</h3>
          <table className="table-auto mb-4">
            <tbody>
              <tr>
                <th className="px-4 py-2">Email:</th>
                <td className="px-4 py-2">user1@test.com</td>
                <td className="px-4 py-2">user2@test.com</td>
              </tr>
              <tr>
                <th className="px-4 py-2">Password:</th>
                <td className="px-4 py-2">user123</td>
                <td className="px-4 py-2">user123</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-bold mb-2">Admin User:</h3>
          <table className="table-auto mb-4">
            <tbody>
              <tr>
                <th className="px-4 py-2">Email:</th>
                <td className="px-4 py-2">admin@test.com</td>
              </tr>
              <tr>
                <th className="px-4 py-2">Password:</th>
                <td className="px-4 py-2">admin123</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-bold mb-2">Demo Payment Card Details:</h3>
          <table className="table-auto">
            <tbody>
              <tr>
                <th className="px-4 py-2">Card Number:</th>
                <td className="px-4 py-2">4242 4242 4242 4242</td>
              </tr>
              <tr>
                <th className="px-4 py-2">Expiration Date:</th>
                <td className="px-4 py-2">Any future date</td>
              </tr>
              <tr>
                <th className="px-4 py-2">CVV:</th>
                <td className="px-4 py-2">Any 3-digit number</td>
              </tr>
              <tr>
                <th className="px-4 py-2">Full Name:</th>
                <td className="px-4 py-2">Any name</td>
              </tr>
              <tr>
                <th className="px-4 py-2">Country or Region:</th>
                <td className="px-4 py-2">USA</td>
              </tr>
              <tr>
                <th className="px-4 py-2">Address:</th>
                <td className="px-4 py-2">
                  Type abcd, and then select any one address from the list.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          If you still face any issues, please contact us at {""}
          <a
            href="mailto:developer.help.905@gmail.com"
            className="text-blue-500"
          >
            developer.help.905@gmail.com
          </a>
        </p>
      </div>
    </>
  );
};

export default About;
