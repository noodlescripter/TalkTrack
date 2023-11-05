# FillmeDaddi - AI-Powered Conversation and Information Management App

TalkTrack is a React-based web application that leverages AI technology to engage in conversations with an AI and maintain records of all the information exchanged. It allows users to chat with the AI, and also offers a voice interface for talking to the AI. Additionally, it features a hands-free search function for accessing information effortlessly.

## Table of Contents
- [TalkTrack - AI-Powered Conversation and Information Management App](#talktrack---ai-powered-conversation-and-information-management-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Development](#development)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Demo](#demo)
  - [Contributing](#contributing)
  - [License](#license)

## Features

1. **Chat with AI**: Engage in text-based conversations with an AI chatbot.
2. **Voice Interaction**: Communicate with the AI using your voice through speech recognition.
3. **Record Keeping**: Automatically store and organize all conversation data for future reference.
4. **Information Retrieval**: Conduct hands-free searches to access information stored in the app.
5. **User-Friendly Interface**: A clean and intuitive user interface for a seamless experience.
6. **AI-Powered Responses**: Experience intelligent and context-aware responses from the AI.
7. **Customization**: Tailor the AI's behavior and appearance to your preferences.


## Prerequesite
1. Docker
2. docker-compose
3. NodeJS 14^.
5. Some coding knowledge.

## Installation

Follow these steps to install and run FillmeDaddi locally:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/noodlescripter/TalkTrack.git
   ```

2. Navigate to the project directory:

   ```shell
   cd fillmedaddi/backend
   ```
3. Create .env file and paste below
   ```shell
   DB_URL=mongodb://build4docker:build4docker@localhost:27017/talktrack
   ```

4. Make docker image and start the container:

   ```shell
   docker-compose up -d
   ```

5. Start the development server:

   ```shell
   cd fillmedaddi
   ```
6. Install the required library:

   ```shell
   npm install
   ```
7. Create .env file and paste below
   ```shell
   REACT_APP_BACKEND_URL=https://localhost:2000
   ```

8. Build the app for development server:

   ```shell
   npm run build
   ```

9. Copy build to server dir:

   ```shell
   sudo cp -r build/ ./server
   ```
10. Start the fornt-end by navigating to server dir:

   ```shell
   docker-compose up -d
   ```

**** Open your web browser and access the application at `https://localhost:3000`.
Note:  For cloud deployment purposes this backend (:3000) will be running on https, you will need to navigate to the url and accept the risk so that front-end can communicate with the back-end.

## Development

Follow these steps for development purposes:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/noodlescripter/TalkTrack.git
   ```

2. Navigate to the project directory:

   ```shell
   cd fillmedaddi/backend
   ```

3. Make docker image and start the container:

   ```shell
   npm start
   ```

4. Start the development server:

   ```shell
   cd fillmedaddi
   ```
5. Install the required library:

   ```shell
   npm install
   ```
6. Build the app for development server:

   ```shell
   npm run https 
   ```
   or

   ```shell
   npm start
   ```

Note: You will still need to create two .env files (Please follow installation steps 3 and 7).

## Database setup
6. Navigate to the backend/database and run 
```shell
   docker-compose up -d
```


## Usage

Once the application is running, you can:

- Initiate a conversation with the AI through the chat interface.
- Use the voice recognition feature to talk to the AI.
- Browse and search for stored information using the hands-free search function.
- Customize the AI's behavior and appearance through the settings.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- AI-powered Chatbot: Utilizes AI technology for natural language processing and generating responses.
- Speech Recognition: Integrates with speech recognition APIs to enable voice interactions.
- Database (e.g., MongoDB): Stores and manages conversation data.
- Web Speech API: For voice recognition and synthesis.
- Server Side: Express and REST.
- Bootstrap/CSS: For creating the user interface and styling.

## Demo
![FillmeDaddi](images/1.png)
![FillmeDaddi](images/2.png)
![FillmeDaddi](images/3.png)
![FillmeDaddi](images/4.png)
![FillmeDaddi](images/6.png)

## Contributing

Yes Please!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Feel free to reach out to the project maintainers or open issues if you have questions or encounter any problems. We hope FillmeDaddi enhances your conversational and information management experience!
