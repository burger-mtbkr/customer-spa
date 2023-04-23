## Assumptions made for assessment

- I have added internationalization, which future-proofs the app for more regions. For now, I have assumed that we will only use English, so I have not added additional language files.

- When deleting a customer, I also made the assumption we want to delete the leads for that customer. The API will do this, so I have added in a warning about that so the user will be aware.

- I am sorting, searching, and filtering customers, but I have made the assumption this was not required for leads. It can be easily implemented following the same approach as customers.

- Worth noting that I have done searching on the server side. Part of this reason is pagination - although for now, pagination will only be based off the result from the API, if we were to paginate at a data store level, then it makes sense to apply the search and filter along with the requested page and items per page.
    - For now, I am allowing search on:
        - First Name
        - Last Name
        - Phone Number
        - Email
    - Sorting will work on all fields.