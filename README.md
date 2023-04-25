## Spidertracks Customer SPA

This is the React SPA for the Customer Service. This SPA runs on Node 16 and requires the [Customer Service API](https://github.com/burger-mtbkr/customer-service/tree/main) to work.  I have also included a [ASSUMPTIONS.md](./docs//ASSUMPTIONS.md) file and a [IMPROVEMENTS.md](./docs//IMPROVEMENTS.md) file with some additional notes.

### Cloning the repositories: 🏃

- Clone the [Customer Service API](https://github.com/burger-mtbkr/customer-service/tree/main) follow the [instructions](https://github.com/burger-mtbkr/customer-service/tree/main#1-how-to-test-the-api) in that repo to get it up and running.
- Clone this repository

### Preparing the app to run it locally:

CORS can be an issue if the api and spa are running on separate ports and not being proxied an das such the app will not be able to make requests to the api due to CORS. You can follow the Options below to decide what works best for you. The fastest way is to install the [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) extension.

**Option 1: Browser plugin**

- Install a browser plugin like [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) and use that to ignore CORS on the SPA.

**Option 2: Proxy to spa**

1.  Open your React app's package.json file.
2.  Add a proxy field to the file, with the value set to the URL of your API (for example 5000), like this matching that of the api port:

        "proxy": "http://localhost:5000"

3.  Save the file.
4.  Set the `REACT_APP_USE_PROXY` environmental to **true**.
6.  The request will be forwarded to the API running on `localhost:5000`. For example, if our SPA app makes a request to /api/login, the request will be forwarded to http://localhost:5000/api/login.

### Run the SPA locally:

- Open the workspace [file](./project//project.code-workspace) in visual studio code.

- Run the following:
  -  `yarn install` - installs the dependencies
  -  `yarn build` - builds the project to and make sure all is well
  -  `yarn start` - run the project

### Application flow: 🌊

- When the app starts, you will be directed to a login page. The database will be empty so please go and signup.
- After you signup you will be logged in, and can start adding customers.
- You can add a lead for a customer by selecting one in the grid and clicking the leads icon (Phone + icon) in the Customer table toolbar

### Functionality: 🔧

- Signup
- Login
- Customer list
- Add, Edit and Delete customers. (If you delete a customer then the leads for that customer will also be deleted.)
- Add and edit leads for a customer.

### If you have troubles getting the app started: ⚠️

- Call me :phone:
