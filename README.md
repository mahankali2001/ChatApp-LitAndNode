# Lit web component based chat Application

This project is a chat application that utilizes a Node.js backend server to connect to the OpenAI API and a frontend built with Lit web components.

## Project Structure

```
lit-app

├── components
│   └── chat-component.js # Lit web component for chat interface
│   └── chat-component.css # Lit web component's css
├── index.html        # Main HTML file for the frontend
├── package.json      # Frontend npm configuration
└── rollup.config.js  # Rollup configuration for bundling
├── README.md             # Project documentation
└── .gitignore            # Files and directories to ignore by Git
```

## Setup Instructions

### Frontend

1. Install the dependencies:
   ```
   npm install
   ```

2. Build the frontend application:
   ```
   npm run build
   ```

3. Open `index.html` in your browser to view the chat application.

## Usage

Once the backend server is running and the frontend is built, you can interact with the chat application by sending messages through the chat interface. The messages will be processed by the OpenAI API, and responses will be displayed in the chat.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you'd like to see in this project.