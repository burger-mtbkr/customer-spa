// No code included in the original context. This response is a copy of the provided text

## Future improvements to consider💡

**Development experience**

- Cors can been a pain. I had mixed results trying to proxy both the spa to the api but a good future improvement would be to ad a `proxy` endpoint in the [package.json](../project/package.json) file. We can then modify the axios API instance in the [axios.util.ts](../project//src//utils/axios.util.ts) to just use `/api`. For this to work we will need to ensure the [Customer-Service](https://github.com/burger-mtbkr/customer-service/tree/main) that goes with this application is running on port the same port of what the proxy url is set to. Both should run on http to keep things simle for local development.

**Feature improvements:**

- Wider language support for Internationalization.
- Add search and filter to Leads.
- Some more time csn be spend on Mobile usability. The datatable used by customers and leads are not mobile friendly. a List view could be implemented instead.

**Testing:**

- I have not done any testing for the spa 😔 (I am ashamed). I wanted to focus on functionality and making sure the api had enough test coverage.
- So for testing, I would definitely want to see lots of react-testing library unit tests for testing individual components. I would also lik ringing these tests to be a prerequisite before merging the code into the main branch. So when we open a PR the tests have to pass and meet a coverage percentage defined by the team before we deploy.
- Additional testing that would be nice is to use [Playwright](https://playwright.dev/). These are end to end testing which will be very useful for testing workflow against real data. We could also do this as part of our pipeline and if we have test environment require them all to pass in there against real data before proceeding gto UAT or Production

**Observability:**

- Consider what observability we want and logging.
- Tools like new relic would be very valuable for and can be used to setup alerts for any potential issues.
