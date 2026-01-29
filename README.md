# RealEstate Website & Admin Panel

This is a full-stack web application for a Construction/Real Estate company, featuring a public landing page and a comprehensive admin panel.

## Features

### Landing Page
- **Hero Section**: Premium design with "Get a Free Consultation" form.
- **Our Projects**: Dynamic grid showcasing projects (fetched from backend).
- **Happy Clients**: Testimonials section.
- **Newsletter**: Subscription form.
- **Contact**: Full contact form.

### Admin Panel
- **Project Management**: Add new projects with images, names, and descriptions.
- **Client Management**: Add client testimonials and details.
- **Contact Responses**: View all inquiries from the contact form.
- **Subscribers**: View all newsletter subscriptions.

## Prerequisites

1.  **Node.js** installed.
2.  **MongoDB** installed locally OR a MongoDB Atlas connection string.

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Database**:
    - By default, the app looks for a local MongoDB instance at `mongodb://localhost:27017/realestate_db`.
    - If you are using MongoDB Atlas, open `server/server.js` and update the `MONGO_URI` variable with your connection string.
    - **Note**: Ensure your MongoDB server is running!

3.  **Start the Server**:
    ```bash
    npm start
    ```

4.  **Access the Application**:
    - **Landing Page**: [http://localhost:5000](http://localhost:5000)
    - **Admin Panel**: [http://localhost:5000/admin](http://localhost:5000/admin)

## Usage Guide

1.  Go to the **Admin Panel** first.
2.  Add a few **Projects** (upload images).
3.  Add a few **Clients** (upload images).
4.  Go to the **Landing Page** to see your content dynamically displayed.
5.  Test the **Contact Form** and **Newsletter** on the home page, then verify the data appears in the Admin Panel tables.

## Tech Stack
-   **Frontend**: HTML5, CSS3 (Custom Design), JavaScript (Vanilla).
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Mongoose).
-   **Image Upload**: Multer.
