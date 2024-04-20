# Meme App API

This is the backend API for the Meme App project. It provides the necessary endpoints to manage and retrieve memes.

## Prerequisites

- Node.js (version 21.7.3)
- npm (version 10.5.0)
- PostgreSQL (version 16)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/sammyklan3/meme-app.git
    ```

2. Install the dependencies:

    ```bash
    cd meme-app
    npm install
    ```

3. Configure the environment variables:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your MongoDB connection string and any other necessary configuration.

4. Start the server:

    ```bash
    npm start
    ```

5. The API will be available at `http://localhost:3000`.

## API Endpoints

- `GET /memes`: Get all memes.
- `GET /memes/:id`: Get a specific meme by ID.
- `POST /memes`: Create a new meme.
- `PUT /memes/:id`: Update a meme by ID.
- `DELETE /memes/:id`: Delete a meme by ID.

For detailed documentation on each endpoint, refer to the [API documentation](api-docs.md).

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).