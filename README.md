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

## REST API
📌 **Swagger Documentation:** Open your browser and go to [http://localhost:8080/api](http://localhost:8080/api) - NOT YET IMPLEMENTED

### Some examples of requests

`GET /api/v1/patientCards/list`

    curl -X GET --location "http://localhost:3000/api/v1/patientCards/list"

`POST /api/v1/patientCards/add`

    curl -X POST --location "http://localhost:3000/api/v1/patientCards/add" \
    -H "Content-Type: application/json" \
    -d '{
    "first_name": "Xiao",
    "last_name": "Pang",
    "date_of_birth": "2000-01-01",
    "birth_number": "012345/6789",
    "sex": "male",
    "insurance_id": "111",
    "contact_info": {
        "contact_person": "",
        "contact_phone": "",
        "contact_email": ""
    },
    "address": {
        "address_street": "",
        "address_city": "",
        "address_zip_code": ""
    },
    "medical_record": ""
    }'

### Endpoints - NOT YET IMPLEMENTED

| Method  | URL                         | Description                    |
|---------|-----------------------------|--------------------------------|
| `GET`   | `/api/v1/patientCards/list` | Retrieve all patient cards.    |
| `POST`  | `/api/v1/patientCards/add`  | Create new patient card        |