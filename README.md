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

# REST API
📌 **Swagger Documentation:** Open your browser and go to [http://localhost:8080/api](http://localhost:8080/api) - NOT YET IMPLEMENTED


### /api/v1/patientCards/

| Method  | URL                                           | Description                              |
|---------|-----------------------------------------------|------------------------------------------|
| `POST`  | `/api/v1/patientCards/`                       | Create new patient card.                 |
| `GET`   | `/api/v1/patientCards/list`                   | Retrieve all patient cards.              |
| `GET`   | `/api/v1/patientCards/:id`                    | Retrieve patient card by id              |
| `GET`   | `/api/v1/patientCards/:id/examinations`       | Retrieve all examinations by patient id  |
| `GET`   | `/api/v1/patientCards/:id/prescriptions`      | Retrieve all prescriptions by patient id |
| `PATCH` | `/api/v1/patientCards/`                       | Update patient card                      |

`POST /api/v1/patientCards/`

    curl -X POST --location "http://localhost:5000/api/v1/patientCards/add" \
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

`GET /api/v1/patientCards/list`

    curl -X GET --location "http://localhost:5000/api/v1/patientCards/list"

`GET /api/v1/patientCards/:id`

    curl -X GET --location "http://localhost:5000/api/v1/patientCards/:id"

`GET /api/v1/patientCards/:id/examinations`

    curl -X GET --location "http://localhost:5000/api/v1/patientCards/:id/examinations"

`GET /api/v1/patientCards/:id/prescriptions`

    curl -X GET --location "http://localhost:5000/api/v1/patientCards/:id/prescriptions"


### /api/v1/examinationRecords/

| Method  | URL                               | Description               |
|---------|-----------------------------------|---------------------------|
| `POST`  | `/api/v1/examinationRecords/`     | Create examination record |
| `PATCH` | `/api/v1/examinationRecords/`     | Update examination record |

`POST /api/v1/examinationRecords/`

    curl -X POST --location "http://localhost:5000/api/v1/examinationRecords/add" \
    -H "Content-Type: application/json" \
    -d '{
    "patient_id": "1e804add-d0c8-4126-bfc3-296828cd6396",
    "doctor_id": "fb28cef4-02a5-4573-8a4c-d0eb21f0e6b1",
    "anamnesis": "Lung cancer stage 2",
    "diagnosis_overview": "Findings lung cancer in left chest",
    "medication": "MEDXY-240",
    "lab_results": "Cancer - Positive",
    "objective_findings": "Cancer",
    "conclusions": "",
    "recommendations": "Chemotherapy",
    "prescribed_medication": "MEDXY-1000",
    "new_diagnosis": "",
    "place": "MediPractise",
    "stamp": "xxx",
    "doctors_signature": "xxx"
    }'

`PATCH /api/v1/examinationRecords/`

    curl -X PATCH --location "http://localhost:5000/api/v1/examinationRecords/" \
    -H "Content-Type: application/json" \
    -d '{
    "id": "5efe6f7b-8abc-464e-939b-ab24df0be489",
    "patient_id": "1e804add-d0c8-4126-bfc3-296828cd6396",
    "doctor_id": "fb28cef4-02a5-4573-8a4c-d0eb21f0e6b1",
    "anamnesis": "Lung cancer stage 2",
    "diagnosis_overview": "Findings lung cancer in left chest",
    "medication": "MEDXY-240",
    "lab_results": "Cancer - Positive",
    "objective_findings": "Cancer",
    "conclusions": "",
    "recommendations": "Chemotherapy",
    "prescribed_medication": "MEDXY-1500",
    "new_diagnosis": "",
    "place": "MediPractise",
    "stamp": "xxx",
    "doctors_signature": "xxx"
    }'

### /api/v1/prescription/

| Method | URL                         | Description            |
|--------|-----------------------------|------------------------|
| `POST` | `/api/v1/prescription/`     | Create prescription    |
| `GET`  | `/api/v1/prescription/`     | Retrieve prescription  |

`POST /api/v1/prescription/`

    curl -X POST --location "http://localhost:5000/api/v1/prescription/" \
    -H "Content-Type: application/json" \
    -d '{
    "patient_id": "4e0094c8-b725-4e67-bd2c-54da22777a6e",
    "doctor_id": "d6574103-a485-4eba-a536-d4dcbb3f2077",
    "medications": [
        {
            "itemName":"Ritalin 30x10MG",
            "count": 1
        },
        {
            "itemName":"Trenbolone Acetate 200mg",
            "count": 1
        }
    ],
    "notes": "K uklidneni ADHD"
    }'


### /api/v1/reservation/

| Method   | URL                        | Description                |
|----------|----------------------------|----------------------------|
| `POST`   | `/api/v1/reservation/`     | Create reservation.        |
| `GET`    | `/api/v1/reservation/:id`  | Retrieve reservation by id |
| `GET`    | `/api/v1/reservation/list` | Retrieve all reservations  |
| `PATCH`  | `/api/v1/reservation/`     | Update reservation         |
| `DELETE` | `/api/v1/reservation/`     | Delete reservation         |

`POST /api/v1/reservation/`

    curl -X POST --location "http://localhost:5000/api/v1/reservation/" \
    -H "Content-Type: application/json" \
    -d '{
    "patient_id": "4e0094c8-b725-4e67-bd2c-54da22777a6e",
    "nurse_id": "f842a3be-b7c7-4c69-ad9a-74a2cd94db3c",
    "examination_type": "Rentgen",
    "notes": "Uraz v prave noze - bolest nad kolenem",
    "start_date": "2025-04-26 14:30:00.000000",
    "end_date": "2025-04-26 14:31:00.000000"
    }'

`GET /api/v1/reservation/:id`

    curl -X GET --location "http://localhost:5000/api/v1/reservation/:id"

`DELETE /api/v1/reservation/`

    curl -X DELETE --location "http://localhost:5000/api/v1/reservation/" \
    -H "Content-Type: application/json" \
    -d '{
    "id": "3e2df7aa-bb65-41d4-871e-f9c5a4cc1b9d"
    }'
