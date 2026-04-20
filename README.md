# CS Education Platform

Fundamentally, this project is a React-based frontend web portal designed to facilitate computer science and general science education. It acts as a centralized repository and interactive dashboard for educational materials, practice tracking, and administration.

## Project Essence & Architecture

- **Objective**: To provide an interactive web environment for users to browse teaching cases, log practice records, and access science resources, while furnishing administrators with a protected dashboard to upload and manage these contents.
- **Core Architecture**:
  - **Frontend Framework**: Built on React using TypeScript, ensuring strict type-safety and modular component design.
  - **Routing Management**: Utilizes `react-router-dom` to handle public routes (authentication, resource viewing) and protected routes (Admin dashboards for uploading cases and records).
  - **State & Auth**: Integrates custom authentication hooks to seamlessly redirect unauthenticated users and restrict admin-only panels.

## Setup and Execution
1. Install node dependencies:
   `npm install`
2. Run the development server:
   `npm run dev`
3. Access the platform on your local development server (e.g., `http://localhost:5173/` or `3000`).
