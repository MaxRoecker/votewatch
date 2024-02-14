# Questions

## Question 1

> Discuss your strategy and decisions implementing the application. Please, consider time complexity, effort cost, technologies used and any other variable that you understand important on your development process.

In crafting my application, I carefully considered various factors to ensure efficient development and optimal performance.

Firstly, I opted for JavaScript/TypeScript, leveraging my familiarity with the language. This choice enabled me to efficiently tackle the data manipulation tasks involving CSVs, thanks to the extensive libraries available on NPM. By harnessing community packages, I minimized development time and effort while ensuring robust functionality.

For the development runtime, I selected Bun for its performance capabilities. Although I didn't utilize Bun-specific features, its efficiency allowed for smooth integration with npm, ensuring flexibility for future modifications or updates.

In terms of the web framework, I made a strategic decision to adopt Remix. This framework aligns well with the application's requirements, offering a seamless developer experience akin to React while harnessing the benefits of server-side rendering. This approach not only enhances performance but also ensures a smoother user experience, particularly for rendering-intensive tasks.

The choice of server-side rendering was deliberate, driven by the belief that the application didn't necessitate the creation of JSON endpoints for data retrieval. This approach not only streamlines development but also future-proofs the application; any changes to the data source can be accommodated without requiring frontend modifications, as long as the schema remains consistent.

Finally, I employed TailwindCSS for styling, enabling efficient creation of visually appealing elements and reusable components. This decision enhances maintainability and scalability while reducing CSS-related overhead.

Overall, my strategy focused on optimizing time complexity, minimizing effort costs, and leveraging appropriate technologies to ensure a robust and performant application.

## Question 2

> How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”?

To adapt my solution for potential future columns like "Bill Voted On Date" or "Co-Sponsors," I would ensure that adding new columns to the CSV does not disrupt the application's functionality.

Firstly, I would update the type definitions in the relevant modules (`legislators/data/index.ts`, `bills/data/index.ts`, and `votes/data/index.ts`) to include the new columns. This step enhances the development experience by providing clear typings for the added data.

Next, I would adjust the `parseRecord` functions within these modules to handle the new columns appropriately. This ensures that the application can seamlessly parse the CSV data, regardless of whether additional columns are present.

Once the backend is prepared to handle the new data, I would then modify the bill and legislator pages to incorporate the new information. This may involve updating the UI components and page layouts to display the newly added columns.

Throughout this process, I would prioritize backward compatibility, ensuring that the application remains functional even with the introduction of new columns. By carefully managing changes and maintaining compatibility, the application can continue to evolve and adapt to future requirements without causing disruptions for users.

## Question 3

> How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?

To adapt the solution for generating CSVs based on a list of legislators or bills instead of receiving CSVs of data, several adjustments would be necessary.

Firstly, I would implement authentication and authorization modules to secure authorized access to pages for inserting and editing information. This ensures that only authorized users can manipulate the data within the application.

Additionally, I would transition from using CSV files as the data source to employing an actual relational database such as PostgreSQL or MySQL. Storing the information in a database offers better scalability, data integrity, and facilitates real-time updates.

With the application's data now stored in a database, I would create endpoints to handle requests for generating CSV files. These endpoints would query the database based on user input or predefined criteria and format the retrieved data into CSV format. Users could then download the generated CSV files on demand, providing a seamless and efficient way to access the information.

By migrating to a database-driven approach and implementing secure access controls, the application becomes more robust, scalable, and user-friendly, allowing for dynamic generation of CSV files based on the latest data stored in the database.

## Question 4

> How long did you spend working on the assignment?

In total, I invested approximately 40 hours in developing this assignment, encompassing concept development, coding, and rigorous testing.
