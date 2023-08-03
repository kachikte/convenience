# convenience

This is a mini project to get the free meeting times accross different countries, taking into account thier holidays.

To run the project please follow the instructions below:

1. Clone the project
2. run - git pull origin main
3. run  - npm install
4. run - npm start

5. run - docker build . -t <username>/convenience
6. run - docker run <username>/convenience

To test the app:

Make a POST reqeust to the URL: localhost:9000/api/available

Using the body - raw JSON:

{
 "countries": [
   {
    "from":"2023-04-01",
    "to":"2023-07-08",
    "country_code":"NG"
   },
  {
    "from":"2023-04-01",
    "to":"2023-07-08",
    "country_code":"US"
   }
  ]
}