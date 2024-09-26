# Customer Invoicer

Customer Invoicer is a web application for managing customers and invoices. The backend is built with Spring Boot, while the frontend is developed using React. It allows you to create, view, and manage customers and their related invoices efficiently.

## Features

- **Customer Management**: Add, update, and delete customer details such as name, address, and contact info.
- **Invoice Management**: Create invoices with multiple line items, assign them to customers, and track invoice details.
- **Data Persistence**: Invoices and customer information are stored in a MySQL database.
- **React Frontend**: A responsive React frontend for a smooth user experience.
- **RESTful API**: The backend exposes RESTful endpoints for handling customer and invoice data.

## Technologies Used

### Backend
- **Spring Boot**
- **Spring Data JPA**
- **MySQL** (or H2 for testing)
- **Spring Web**
- **Spring Security** (optional)

### Frontend
- **React**
- **Axios** for API requests
- **Bootstrap** for styling

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL (or H2 database for local testing)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/apakle/customerinvoicer.git
   ```

2. Navigate to the backend folder and build the project:
   ```bash
   cd customerinvoicer/backend
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd customerinvoicer/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /customers`: Retrieve all customers
- `POST /customers`: Add a new customer
- `GET /invoices`: Retrieve all invoices
- `POST /invoices`: Create a new invoice

## Future Enhancements

- Authentication and role-based access control

## License

This project is licensed under the MIT License.
