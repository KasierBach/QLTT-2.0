/**
 * ChatService - OOP façade over existing chat support logic in script.js
 * Purpose:
 *  - Provide a discoverable, object-oriented API without changing current behavior
 *  - Delegate to legacy global functions to avoid regressions
 *  - Centralize chat actions (toggle, send, add message, bot response)
 *
 * Related legacy globals in script.js:
 *  - toggleChat()
 *  - sendMessage()
 *  - addChatMessage(message, sender)
 *  - getBotResponse(userMessage)
 */
(function () {
  'use strict';

  class ChatService {
    constructor() {
      this._selectors = {
        container: 'chat-support',
        window: 'chat-window',
        messages: 'chat-messages',
        input: 'chat-input-field',
      };
    }

    // Open/close chat panel
    toggle() {
      if (typeof window.toggleChat === 'function') {
        window.toggleChat();
      } else {
        // Fallback behavior if toggleChat() is unavailable
        try {
          const win = document.getElementById(this._selectors.window);
          if (win) {
            const isVisible = win.style.display === 'block';
            win.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
              setTimeout(() => {
                const messages = document.getElementById(this._selectors.messages);
                if (messages) messages.scrollTop = messages.scrollHeight;
              }, 100);
            }
          }
        } catch (_) {}
        console.warn('toggleChat() not found; ChatService.toggle() used fallback.');
      }
    }

    // Send message (uses current input value if not provided)
    send(message) {
      if (typeof window.sendMessage === 'function' && (message === undefined || message === null)) {
        window.sendMessage();
        return;
      }

      // Manual path: push message and simulate bot response
      const msg = (message ?? '').toString().trim();
      if (!msg) {
        const input = document.getElementById(this._selectors.input);
        if (input && input.value.trim()) {
          if (typeof window.sendMessage === 'function') {
            window.sendMessage();
            return;
          }
        }
        return;
      }

      this.addMessage(msg, 'user');
      setTimeout(() => {
        const bot = this.getBotResponse(msg);
        this.addMessage(bot, 'bot');
        const input = document.getElementById(this._selectors.input);
        if (input) {
          input.disabled = false;
          input.focus();
        }
      }, 1000);

      const input = document.getElementById(this._selectors.input);
      if (input) {
        input.value = '';
        input.disabled = true;
      }
    }

    // Append a message to the chat window
    addMessage(message, sender) {
      if (typeof window.addChatMessage === 'function') {
        window.addChatMessage(message, sender);
      } else {
        // Fallback append
        try {
          const messages = document.getElementById(this._selectors.messages);
          if (!messages) return;
          const div = document.createElement('div');
          div.className = `message ${sender}-message`;
          div.innerHTML = `<p>${message}</p>`;
          messages.appendChild(div);
          messages.scrollTop = messages.scrollHeight;
        } catch (_) {
          console.warn('addChatMessage() not found; ChatService.addMessage() fallback used.');
        }
      }
    }

    // Compute bot response text
    getBotResponse(userMessage) {
      if (typeof window.getBotResponse === 'function') {
        return window.getBotResponse(userMessage);
      }
      // Fallback canned message
      return 'Cảm ơn bạn! Vui lòng để lại thông tin, chúng tôi sẽ liên hệ sớm nhất.';
    }

    // Optional installer: route legacy globals to this façade for consistency
    installGlobals() {
      const self = this;
      window.toggleChat = () => self.toggle();
      window.sendMessage = () => self.send();
      window.addChatMessage = (msg, s) => self.addMessage(msg, s);
      window.getBotResponse = (umsg) => self.getBotResponse(umsg);
    }
  }

  // Singleton
  if (!window.ChatService) {
    window.ChatService = new ChatService();
  }
  try {
    window.ChatService.installGlobals();
  } catch (_) {}
})();