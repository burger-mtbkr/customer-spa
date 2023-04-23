## Spidertracks Customer SPA

This is the React SPA for the Customer Service. This SPA runs on Node 16 and requires the [Customer Service API](https://github.com/burger-mtbkr/customer-service/tree/main) to work.

### Running this app: 🏃

- Clone the [Customer Service API](https://github.com/burger-mtbkr/customer-service/tree/main) follow the [instructions](https://github.com/burger-mtbkr/customer-service/tree/main#1-how-to-test-the-api) in that repo to get it up and running.
- Clone this repository
- Open the workspace [file](./project//project.code-workspace) in visual studio code.
- Run the following:
  - Install the package: `yarn install`
  - Build the project: `yarn build`

Now there is this [environmental variable file](./project/.env) I left in there to use to reference where the api is running. Change this url to be the same as the on you started the API project on.

- Now run `yarn start`.

### Application flow: 🌊

- When the app starts, you will be directed to a login page. The database will be empty so please go and signup.
- After you signup you will be logged in, and can start adding customer.
- You can add a lead for a customer by selecting one in the grid and clicking the leads icon (Phone + icon) in the Customer table toolbar. .

### Functionality: 🔧

- Signup
- Login
- Customer list
- Add, Edit and delete customers.
- Add and edit Leads for a customer.
- If you delete a customer then the leads for that customer will also be deleted.

### If you have troubles getting the app started: ⚠️

CORS can be an issue if the api and spa are running on separate ports. You have a few options.

**Option 1:**

- Install a browser plugin like [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) and use that to ignore CORS on the SPA.

**Option 2:**

- Docker. Both the Customer API and the Customer SPA are deployed to docker hub. The repositories are:
- [Customer-service](https://hub.docker.com/layers/loanburger/customer-service/latest/images/sha256-2f81ce37ae463cee5ce99f39dd20545b3060354e0629b530d7e5a1cedf4944e7?context=repo)
- [Customer-spa](https://hub.docker.com/layers/loanburger/customer-spa/latest/images/sha256-be1716e41f3aad8ae6d557035f594ed89d2715b94100f560c20c49dd6d8e5080?context=repo)

- You could add a docker-compose file and pull down these two images and run them.
- Add a proxy property to the package.json file and point that to the api url.
- If you take this approach you will need to change the endpoint in the [axios.util.ts](../project//src//utils/axios.util.ts) file by setting it to `/api`. and ignore the environmental variable.

_Full disclosure I have tried this and sometimes it worked and other times not but im not a docker guru so may have missed something obvious_

- Worst case - call me. :phone:
