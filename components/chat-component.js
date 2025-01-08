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

  render() {
    return html`
      <div className="App">
      <header className="App-header">
        <h1>Open AI Chat Application</h1>
        <div class="chat-container">
          <div class="messages">
            ${this.messages.map((msg, index) => 
              (html`<div key=${index} class="message">${msg}</div>`))}
          </div>
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

    this.messages = [...this.messages, `You: ${this.userInput}`];
    const response = await this.fetchResponse(this.userInput);
    this.messages = [...this.messages, `AI: ${response}`];
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
      console.error('Error fetching response:', error);
      return 'Error: Unable to fetch response from AI';
    }
  }
}

customElements.define('chat-component', ChatComponent);