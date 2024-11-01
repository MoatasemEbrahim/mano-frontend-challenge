# Application Architecture Overview

This application is a React-based interface designed to generate Machine-Readable Files (MRFs) from CSV claims data, facilitating transparency compliance for healthcare insurers.<br>
The architecture centers around a modular structure that includes front-end components, MobX state management, API interaction, and backend storage for MRF files.

## Application Flow
- CSV File Upload: Users upload a CSV file containing claims data.
- Data Parsing and Validation: The uploaded file is parsed using Papaparse and validated using Zod to ensure the claims data conforms to a defined schema.
- Data Approval: Users review, approve, and optionally edit parsed claims data.
- Data Submission: Approved claims data are sent to a backend API for MRF file generation.
- MRF Generation and Storage: The backend generates JSON MRF files and stores them on the server.
- Public MRF Access: Users and public visitors can access a list of generated MRF files for each customer via a dedicated page.

### Component Breakdown
1. **UI Components:**
  - Upload Component: Manages file selection, displays the chosen file name, and handles upload validation.
  - Claims Table Component: Displays parsed claims data in an editable table using AG Grid, allowing users to approve, edit, or remove claims.
  - Approval and Submit Buttons: Allows users to approve and submit validated data to the backend for MRF generation.
  - MRF List Component: Fetches and displays the list of generated MRF files, providing public access to compliant MRFs.

2. **Libraries Used:**
  - Mantine: UI components for consistent design.
  - AG Grid: Data table for displaying and editing claims.
  - Papaparse: CSV files parser to get JSON data from the uploaded files.
  - Zod: Validatiob library to validate claims against a defined schema.

3. **Routing and Navigation:**<br>
  React Router handles all navigation, with routes structured as follows:
  - /: Home page as intro for the app.
  - /login: A dummy authentication page to protect uploading file enterface.
  - /manage-claims: For uploading and approving claims data.
  - /mrf-files: For displaying the list of generated MRF files.

4. **MobX State Management:**<br>
  Global Store: A single MobX store file manages application state, with a focus on maintaining user authentication. (There is no need to store claims in the global state for the current case)<br>
  Actions: A method to authenticate the user.<br>
  Observable Properties:
    - isLoggedIn: Tracks user authentication.


### Backend API Interaction
1. **API Schema and Requests**
  - CSV Data Validation: On submission, the frontend validates claims data against the schema. The backend endpoint performs additional checks if needed before MRF generation.
  - File Generation Request: After approval, claims data is sent via POST /api/mrf, which triggers the backend to process the data into a JSON MRF.
  - MRF List Fetch: The frontend retrieves MRFs using GET /api/mrf-list/:customerId, allowing the application to display available MRFs for public access.

2. **Data Transformation and JSON MRF Storage**
  - Schema: Backend schemas comply with the Transparency in Coverage (TiC) guidelines.
  - Storage: Generated JSON files are saved in a designated server directory, structured by averages on each provider, procedure, place of service, billing class combination.

3. **Error Handling**
  - File Format Validation: Only CSV files are accepted. Errors trigger UI notifications to inform users of invalid file types.
  - Schema Validation: Claims data is validated both client-side (Zod) and server-side to ensure completeness and accuracy.
  - API Error Handling: Failed API calls show user-friendly messages, prompting retry or troubleshooting.

### Code Organization

To facilitate clarity and maintainability, the code follows a structured folder hierarchy:
  - src/components/: Reusable UI components, such as the file uploader, claims table, and approval buttons.
  - src/pages/: Page-level components for each route, including the CSV upload page and the MRF list page.
  - src/hooks/: Business logic implementation to be called in the components and keep components clean and short.
  - src/stores/: MobX store configuration, centralizing all application state and observable properties.
  - src/services/: API interaction logic, encapsulating HTTP requests and providing helper functions to manage backend communication.
  - src/utils/: Utility functions for handling file parsing, data validation, and formatting logic.