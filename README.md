## Installation

1. Install server dependencies
    ```bash
    $ cd server
    $ npm install
    ```
2. Install client dependencies
    ```bash
    $ cd client
    $ npm install
    ```
	
3. set YOUTUBE_API_KEY in client/src/environments/environment.ts with active youtube api key

## Run the app

1. Start mongodb locally
    ```bash
    $ mongod
    ```
2. Start the server
    ```bash
    $ cd server
    $ npm start
    ```
3. Start the client
    ```bash
    $ cd client
    $ npm start
    ```
4. Browse to `http://localhost:4200/`
