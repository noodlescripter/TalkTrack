# FillmeDaddi - AI-Powered Conversation and Information Management App

FillmeDaddi is a React-based web application that leverages AI technology to engage in conversations with an AI and maintain records of all the information exchanged. It allows users to chat with the AI, and also offers a voice interface for talking to the AI. Additionally, it features a hands-free search function for accessing information effortlessly.

## Table of Contents
- [FillmeDaddi - AI-Powered Conversation and Information Management App](#fillmedaddi---ai-powered-conversation-and-information-management-app)
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


## Installation

Follow these steps to install and run FillmeDaddi locally:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/noodlescripter/fillmedaddi.git
   ```

2. Navigate to the project directory:

   ```shell
   cd fillmedaddi/backend
   ```

3. Make docker image and start the container:

   ```shell
   docker-compose up -d
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
   npm run build
   ```

7. Copy build to server dir:

   ```shell
   sudo cp -r build/ ./server
   ```
8. Start the fornt-end by navigating to server dir:

   ```shell
   docker-compose up -d
   ```

. Open your web browser and access the application at `https://localhost:3000`.

## Development

Follow these steps for development purposes:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/noodlescripter/fillmedaddi.git
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
- Rest API: For server side coding.
- Bootstrap/CSS: For creating the user interface and styling.

## Demo
![FillmeDaddi](images/5.png)
![FillmeDaddi](images/1.png)
![FillmeDaddi](images/2.png)
![FillmeDaddi](images/3.png)
![FillmeDaddi](images/4.png)

## Contributing

Yes Please!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Feel free to reach out to the project maintainers or open issues if you have questions or encounter any problems. We hope FillmeDaddi enhances your conversational and information management experience!