# Bling and Pipedrive integration

* [About the project](#about)
* [Steps for testing](#steps-to-run-this-project)
* [.ENV example](#example-of-.env)
* [Usage](#usage)
  * [Create order](#create-the-order-on-bling-and-save-in-mongoDB)
  * [List order](#list-all-orders-save-in-mongoDB)


## About
This project is a integration of bling platform with pipedrive platform, created for the LinkApi thecnical challenge. Build with NodeJS, Typescript, TypeOrm and mongoDB, you can get the deals with status "won" on pipedrive e create a order on bling, save the order on database.

## Steps to run this project

1. Create and config the .env file
2. Run `yarn` or `npm install` command
3. Run `yarn start` or `npm start` command

## Example of .env

```
API_KEY_PIPE=api_key_pipedrive
API_KEY_BLING=api_key_bling
MONGO_URL=url_do_mongo
```

## Usage

### Create the order on bling and save in mongoDB

Send a request to get all deals with status "won" in pipedrive, generate the order in bling and save the order in mongoDB.

`POST /order`

**response:**

```json
  {
    "message": "Dados inseridos com sucesso!"
  }
```

### List all orders save in mongoDB

Send a request to get all orders saved in mongoDB.

`GET /order` 

**response:**

>the response of the request is an array of orders.

```json
  {
    "id": "5fca36da5bf0901c70e0c997",
    "date": "2020-12-02",
    "deals": [
      {
        "deal_id": 2,
        "title": "Negócio LinkApi",
        "value": 200,
        "org_name": "LinkApi",
        "cc_email": "linkapi4+deal2@pipedrivemail.com",
        "owner_name": "Felipe Nunes",
        "person_name": "Felipe",
        "won_time": "2020-12-02 01:19:18",
        "contact_email": "felipe@gmail.com",
        "contact_phone": "12982826567"
      },
      {
        "deal_id": 3,
        "title": "Negócio tab",
        "value": 340,
        "org_name": "tab",
        "cc_email": "linkapi4+deal3@pipedrivemail.com",
        "owner_name": "Felipe Nunes",
        "person_name": "Thiago",
        "won_time": "2020-12-02 15:29:01",
        "contact_email": "",
        "contact_phone": ""
      },
      {
        "deal_id": 4,
        "title": "Negócio",
        "value": 400,
        "org_name": "Teste",
        "cc_email": "linkapi4+deal4@pipedrivemail.com",
        "owner_name": "Felipe Nunes",
        "person_name": "Haarlem",
        "won_time": "2020-12-02 22:39:01",
        "contact_email": "",
        "contact_phone": ""
      }
    ],
    "total": 940,
    "created_at": "2020-12-04T13:17:14.162Z",
    "updated_at": "2020-12-04T13:17:14.162Z"
  },
  ```
