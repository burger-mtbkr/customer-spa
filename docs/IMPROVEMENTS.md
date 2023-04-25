// No code included in the original context. This response is a copy of the provided text

### Future improvements to consider💡

**Testing:**

- I have not done any testing for the spa (I am ashamed 😔). I wanted to focus on functionality and making sure the api had enough test coverage.
- So for testing, I would definitely want to see lots of react-testing library unit tests for testing individual components.
- I would also like these tests to be a prerequisite before merging the code into the main branch. So when we open a PR the tests have to pass and meet a coverage percentage defined by the team before we deploy.
- Additional testing that would be nice is to use [Playwright](https://playwright.dev/). These are end to end testing which will be very useful for testing workflow against real data. We could also do this as part of our pipeline and if we have test environment require them all to pass in there against real data before proceeding gto UAT or Production

**Feature improvements:**

- Wider language support for **internationalization**.
- I have added some **accessibility** support but a lot more time can be invested in this.
- Add search and filter to Leads.
- Some more time can be spend on Mobile usability. The data table used by customers and leads are not mobile friendly. a List view could be implemented instead.

**Observability:**

- Consider what observability we want and logging.
- Tools like new relic would be very valuable for and can be used to setup alerts for any potential issues.
- Analytics should also be considered to understand how our customer are using the product and how we can learn from this user behaviors to drive our future development of the product.
