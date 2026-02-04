
  # Family Location Tracker
  A web application to track the real-time 'home status' of family members. Was inspired to build this for my own family as a way to keep updated of our home/not home status without having to share specific locations with eachother. 
  
  Frontend built with Vite and Tailwind CSS using Figma. Backend built with Supabase.

  ## Deploying this project
  This project can be deployed using Netlify for the frontend and Supabase for the backend. 
  1. Fork this repository to your own GitHub account.
  2. Create a new project in Supabase and run the `createTable.SQL` script in the SQL editor to create the table.
  3. Refer to `sample.env` for the required environment variables, and create a `.env` file in the root of the project with your own Supabase URL and Anon Key.
  4. Deploy the frontend to Netlify, ensuring you add the environment variables in the Netlify dashboard.
  5. Share the link with family :)

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  