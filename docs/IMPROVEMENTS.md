## Future improvements to consider💡

**Development experience**
-

**Feature improvements:**

-

**Testing:**

- I have added unit test coverage for the main services but not for any of the infrastructure of setup code.
- An good improvement would be to extend the test coverage to cover all parts of the system.
- Integration testing would also be a big advantage.  Using something like [Wiremock](https://github.com/WireMock-Net/WireMock.Net) will enable us to test that our contracts stay in tact with that the SPA will expect. I recommend a contract first approach.

**Security**

- Enable allowed domains (cors)

**Observability:**

- Consider what observability we want and logging.
- Tools like new relic and Sumo logic would be very valuable for and can be used to setup alerts for any potential issues.