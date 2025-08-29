# BFHL REST API

A REST API for the BFHL 

## Tech
Node.js, Express

## Endpoint
**POST** `/bfhl`  — returns:
- is_success, user_id (`full_name_ddmmyyyy`), email, roll_number
- odd_numbers, even_numbers, alphabets (uppercase), special_characters
- sum (string), concat_string (alternating caps of all letters reversed)

## Run locally
```bash
npm install
npm start
# Server on http://localhost:3000
