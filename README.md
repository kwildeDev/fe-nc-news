# NC News Frontend Project

# NC News Frontend

Welcome to the frontend of the **NC News** project! 

The frontend of this project is deployed live, and you can view it here: [**kw-nc-news: Live Deployment of NC News frontend project**](https://kw-nc-news.netlify.app/).

This repository hosts the client-side code for the NC News application, which is a news platform that interacts with a backend built using Node.js, PostgreSQL, and Express: [Northcoders News API repository](https://github.com/kwildeDev/be-nc-news).

This frontend is built using **React** and **Vite** for fast development and bundling, and it uses **React Router** for navigation. The styling of the application has evolved over time: initially, the app used **vanilla CSS** for styling, and more recently, this has been replaced with **Material UI** components to improve the user experience and design consistency.

## Features

-   **React** and **Vite** setup for fast development and efficient bundling.
-   **React Router** for seamless client-side navigation.
-   **Material UI** components for a modern, responsive UI.
-   **Vanilla CSS** for legacy/customised styling.
-   Environment configuration with **dotenv**.
-   Fully integrated with the **NC News backend** API (documentation and hosted version available in the backend repo).

## Table of Contents

1.  Getting Started
2.  Installation
3.  Styling Versions
4.  Running the Development Server
6.  License

## Getting Started

This project serves as the frontend for the NC News platform. It uses the API from the backend project, which is built with **Node.js**, **Express**, and **PostgreSQL**. For full details on the backend setup, API endpoints, and deployment, please refer to the [Northcoders News API repository](https://github.com/kwildeDev/be-nc-news).

### Prerequisites

Before running the project, make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v22.6.0.)
-   [npm](https://www.npmjs.com/)

## Installation

1.  Clone this repository:
```bash
    git clone https://github.com/kwildeDev/fe-nc-news.git
    cd fe-nc-news
```

2. Install dependencies:
```bash
	npm install
```

3. Ensure that the **NC News backend** is running locally. You can find the backend repository [here](https://github.com/kwildeDev/be-nc-news).
   
**Note:** The backend requires certain environment variables to be set up to connect to the PostgreSQL database. If you are setting up the backend locally, please follow the instructions provided in the [backend README](https://github.com/kwildeDev/be-nc-news#) for creating the `.env.test` and `.env.development` files.

## Styling Versions

This project contains two versions of the styling:

1.  **Vanilla CSS Version**: The original version of the app used plain CSS. This is still available here.
    
2.  **Material UI Version**: The newer version uses **Material UI** for modern, responsive UI components.

## Running the Development Server

To start the development server, run:
```bash
npm run dev
```
This will start the Vite development server on `http://localhost:5173` by default. The app will automatically reload whenever you make changes to the code.

Ensure the **NC News backend** is running. This has been deployed using **Supabase** and **Render**. You can run it locally by running:
```bash
npm start
```

## Contributions

At this time, contributions such as issues, pull requests, or changes to the codebase are **not accepted**. Please feel free to clone and use the project for personal learning or reference.

## Authors

-   **Katherine Wilde** - [kwildeDev](https://github.com/kwildeDev)
    

## Acknowledgments

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

## License

This project is for **portfolio purposes only**. It was developed as part of the [Northcoders](https://northcoders.com/) curriculum. Unauthorized use, copying, redistribution, or modification of this code is prohibited. The project is available for viewing and cloning as part of my portfolio.