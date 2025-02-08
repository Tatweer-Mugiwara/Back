
## API Documentation
The API is documented using Swagger UI. You can access the API documentation at **/api-docs** endpoint.

## How to Run
1. Clone this repository.
2. Make sure you have python3 and node installed in your system
3. Set the environments variables as described [below](#environment-variables).
4. Copy and fill the necessary env variables from `.env.example` file to `.env`.
5. Install dependencies using `npm install` && `pip install -r requirement.txt`.
6. Start the server using `npm run dev`.

### Docker
If you want to use docker:
1. Make sure to set the environment variables correctly from .env.example to .env, more details [here](#environment-variables)
2. Run these commands in this order
```bash
chmod +x build-docker.sh run-docker.sh
./build-docker.sh
./run-docker.sh
```

## Environment Variables
Make sure to set the following environment variables:
- `MONGO_URI`: MongoDB database connection URI. Example: `mongodb+srv://?:?@cluster0.cxl50.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
- `PORT`: Port number for the backend server (default is 3000).
- `ORIGIN_PORT`: Port number for the frontend server (default is 4000).
- `SESSION_SECRET`: Secret key for session management. Example: `thisisasessionsecret`
- `EMAIL_USERKEY`: User key for EmailJS settings. Example: `test`
- `EMAIL_SERVICEID`: Service ID for EmailJS. Example: `test`
- `EMAIL_CONTACTTEMPLATEID`: Template ID for sending messages via EmailJS. Example: `test`
- `ADMIN_EMAIL`: The email of the admin. Example: `admin@admin.com`

## License
This project is licensed under the [MIT License](LICENSE).
