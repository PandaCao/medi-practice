# MediPractice

## About

MediPractice is a cloud-based application designed for efficient, continuous and seamless management of a general practitioner's office.
The goal of MediPractise is to simplify, clarify, and accelerate the complete organization of medical practice and related activities, resulting in higher efficiency and improved quality of healthcare services.

## Setup and installation
**SSH git clone:**
```bash
    git clone git@github.com:UnicornUniversity/bpmi25sczds-bpmi25sczds-tym-1-1.git
```
**HTTPS git clone:**
```bash
    git clone https://github.com/UnicornUniversity/bpmi25sczds-bpmi25sczds-tym-1-1.git
```
**Install packages:**
```bash
    npm install
```
**Start backend:** - SCRIPT TO BE IMPLEMENTED
```bash
    npm run backend
```
**Start Frontend:** - SCRIPT TO BE IMPLEMENTED
```bash
    npm run frontend
```
**Run tests:**
```bash
    npm run test
```

## REST API - NOT YET IMPLEMENTED
📌 **Swagger Documentation:** Open your browser and go to [http://localhost:8080/api](http://localhost:8080/api)

**I personally use Postman for sending requests but below are some request examples:**

### Some examples of requests

`GET /api/v1/customers`

    curl -X GET --location "http://localhost:8080/api/v1/customers"

`GET /api/v1/customers/:uuid`

    curl -X GET --location "http://localhost:8080/api/v1/customers/:uuid"

`POST /api/v1/customers/`

    curl -X POST --location "http://localhost:8080/api/v1/customers/create" \
    -H "Content-Type: application/json" \
    -d '{
    "firstName": "Xiao",
    "lastName": "Pang",
    "email": "xiaopang@gmail.com",
    "phone": "123456789"
    }'

`PATCH /api/v1/customers/:uuid`

    curl -X PATCH --location "http://localhost:8080/api/v1/customers/update/:uuid" \
    -H "Content-Type: application/json" \
    -d '{
    "firstName": "Xiao",
    "lastName": "Pang",
    "email": "xiaopang@gmail.com",
    "phone": "123456789"
    }'

### Endpoints - NOT YET IMPLEMENTED

| Method  | URL                           | Description                         |
|---------|-------------------------------|-------------------------------------|
| `GET`   | `/api/v1/customers`           | Retrieve all customers.             |
| `GET`   | `/api/v1/customers/{uuid}`    | Retrieve the customer by uuid.      |
| `POST`  | `/api/v1/customers/{uuid}`    | Create new customer                 |
| `PATCH` | `/api/v1/customers/{uuid}`    | Update customer by uuid.            |