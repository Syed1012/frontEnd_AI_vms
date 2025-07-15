# 🚗 AI VMS (Vehicle Management System)

![Java](https://img.shields.io/badge/Java-11%2B-blue?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?style=for-the-badge&logo=springboot)
![Hibernate](https://img.shields.io/badge/Hibernate-ORM-red?style=for-the-badge&logo=hibernate)
![Maven](https://img.shields.io/badge/Maven-4.0.0-orange?style=for-the-badge&logo=apachemaven)
![JWT](https://img.shields.io/badge/JWT-Authentication-yellow?style=for-the-badge&logo=jsonwebtokens)

AI VMS (Vehicle Maintenance System) is a Java-based Spring Boot application designed to manage and track vehicle maintenance records. This system allows users to create, view, and maintain vehicle details, including servicing history, mileage, and more.

---

## 🚀 Features

- ➕ Create and track maintenance records for vehicles.
- 📝 Store vehicle details such as make, model, and registration information.
- 🛠️ Keep track of maintenance history, including dates, mileage, and types of services.
- 🌐 RESTful API for easy integration with frontend applications.
- 🛡️ Robust error handling and validation.
- 📜 JWT authentication for secure access.

---

## 🛠 Tech Stack

- **Backend:**  
  ![Java](https://img.shields.io/badge/Java-11%2B-blue?style=flat-square)  
  ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green?style=flat-square)  
  ![Hibernate](https://img.shields.io/badge/Hibernate-ORM-red?style=flat-square)  
  ![Maven](https://img.shields.io/badge/Maven-4.0.0-orange?style=flat-square)

- **Database:**  
  Real time data integrations with MongoDB & Monitoring data through Grafana.

- **Security:**  
  ![JWT](https://img.shields.io/badge/JWT-Authentication-yellow?style=flat-square)

- **Tools:**  
  ![Postman](https://img.shields.io/badge/Postman-Testing-orange?style=flat-square)  
  ![Git](https://img.shields.io/badge/Git-VersionControl-yellow?style=flat-square)

---

## Deployed On:
 - Vercel = https://ai-vms.vercel.app/

---

## 📦 Installation

### Prerequisites

- Java 11 or higher
- Maven 4.0 or higher
- MongoDB installed and configured

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/YourUsername/ai-vms.git
    ```

2. **Navigate into the project directory:**

    ```bash
    cd ai-vms
    ```

3. **Configure the database:**

    Update the `.env` file (in `root folder`) with your database connection details of MongoDB

    ```properties
    MONGO_URI=mongodb+srv://id:passwordsupplychain.Cksna.mongodb.net/
    MONGO_DB=supply_chain
    ```

4. **Build the project:**

    ```bash
    mvn clean install
    ```

5. **Run the application:**

    ```bash
    mvn spring-boot:run
    ```

6. The application will be running at:

    ```
    http://localhost:8080
    ```

### 📝 License
This project is licensed under the MIT License. See the LICENSE file for details.
