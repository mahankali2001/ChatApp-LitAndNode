import { LitElement, html, css } from 'lit';
import styles from './chat-component.css';

class ChatComponent extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      userInput: { type: String }
    };
  }

  constructor() {
    super();
    this.messages = [];
    this.userInput = '';
  }

  static get styles() {
    return css`${styles}`;
  }

  handleInput(event) {
    this.userInput = event.target.value;
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  async sendMessage() {
    if (this.userInput.trim() === '') return;
    const userMessage = { text: this.userInput, sender: 'user' };
    this.messages = [...this.messages, userMessage];
    console.log('Sending message:', userMessage);

    try {
      const response = await this.fetchResponse(this.userInput);
      console.log('Response:', response);
      const aiResponse = { text: response, sender: 'bot' };
      this.messages = [...this.messages, aiResponse];
    } catch (error) {
      console.error('Error sending message:', error.message); // Error handling
    }

    this.userInput = '';
  }

  async handleClearMessage() {  
    this.messages = [];
    this.userInput = '';
  }

  async fetchResponse(message) {
    try {
      const response = await fetch('http://192.168.86.21:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      console.log('Backend response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      console.log('Backend response text:', data); // Log the response text for debugging
      return data; // Return the plain text response
    } catch (error) {
      console.error('Error fetching response:', error.message);
      throw error;
      //return 'Error: Unable to fetch response from AI';
    }
  }

  render() {
    return html`
    <div class="App">
      <header class="App-header">
        <h1>Open AI Chat Application</h1>
        <div class="chat-container">
          <div class="messages">
            ${this.messages.map((msg, index) => 
              html`
                <div key=${index} class="message ${msg.sender}">
                  <img
                    src="${msg.sender === 'user' ? '/public/user-icon.png' : '/public/bot-icon.png'}"
                    alt="${msg.sender} icon"
                    class="icon"/>
                  <div class="message-text">${msg.text}</div>
                </div>
              `)}
          </div>
          <div class="input-container">
            <input 
              type="text" 
              .value="${this.userInput}" 
              @input="${this.handleInput}" 
              @keydown="${this.handleKeyDown}" 
              placeholder="Type your message..." 
            />
            <button @click="${this.sendMessage}">Send</button>
            <button @click="${this.handleClearMessage}">Clear</button>
          </div>
        </div>
      </header>
    </div>
    `;
  }
}

customElements.define('chat-component', ChatComponent);