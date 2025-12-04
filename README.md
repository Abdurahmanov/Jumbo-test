# Jumbo Stores Locator

This is a Vue.js application that displays a list of Jumbo stores on a map and allows users to search and filter them. It was created as a technical assignment.

## Features

- **Interactive Map:** Displays all store locations on a Google Map.
- **Store Listings:** Shows a filterable list of all stores.
- **Search:** Users can search for stores by city name.
- **Filtering:** Filter stores based on opening times, Sunday opening, and new stores.
- **City View:** A separate page to view stores grouped by city.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 12.x or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/jumbo-vue-technical-assignment.git
    cd jumbo-vue-technical-assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

### Running the application

To start the development server with hot-reloading, run:
```bash
npm run serve
```
The application will be available at `http://localhost:8080`.

## Usage

The application has two main pages:

1.  **Map Page (/)**: This is the main page which displays an interactive map with all the store locations marked.
    - You can click on a marker to see more details about a store.
    - The list on the left shows all the stores. Clicking on a store in the list will center the map on its location.
    - Use the search bar to find stores in a specific city.
    - Use the filter buttons to narrow down the store list based on different criteria.

2.  **Stores by City Page (/stores-by-city)**: This page lists all the cities that have Jumbo stores.
    - Clicking on a city will display a table with all the stores in that location.
    - You can use the search bar to find a specific city from the list.

## Project Structure

    .
    ├── public/              # Static assets and index.html template
    ├── src/
    │   ├── assets/          # Images, fonts, and other static assets
    │   ├── components/      # Reusable Vue components used across the app
    │   ├── constants/       # Application-wide constants
    │   ├── pages/           # Vue components for each page/route
    │   ├── router/          # Vue Router configuration
    │   ├── store/           # Vuex store modules for state management
    │   ├── App.vue          # The root Vue component
    │   └── main.js          # The main entry point for the application
    ├── .gitignore
    ├── babel.config.js
    ├── package.json
    └── README.md

