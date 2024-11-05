# Darkube

Welcome to Darkube - Your Ultimate Coding Hub!. Developed in Nuxt3

## Website Link

[Darkube](https://darkube.onrender.com/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication using `@sidebase/nuxt-session`.
- **Global Chat**: You can chat with everyone who are currently online in the website.
- **Code Synchronization**: You can create channels and synchronization code with everyone in the channel.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Framework**: Nuxt3
- **Database**: MongoDB
- **Hosting**: Render

## Installation

### Prerequisites

- Node.js (v18 or above)
- MongoDB

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/sandy-5000/Darkube.git
   cd Darkube
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   MONGO_DB_URL=your_mongodb_connection_string
   SALT=your_salt
   ```

4. Start the server:

   ```sh
   npm run dev
   ```

5. To start the server in production:

   ```sh
   npm run build && npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Register or log in to your account.
2. Open the `chatroom` to chat with everyone.
3. Or open the `compiler` and create channel on clicking `create channel` button and turn on the `synchronize code`.
4. Share the channel link to synchronize code with others.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using Darkube! If you have any questions or feedback, feel free to open an issue or contact us. Enjoy coding!

---

**Note**: Replace `https://github.com/sandy-5000/Darkube.git` with your actual GitHub repository URL, and ensure you have set up the necessary environment variables and configurations for deployment on Render.
