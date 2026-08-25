# Insecure WebApp Example

A minimal web application demonstrating common security vulnerabilities regarding credential handling and unencrypted transmission for testing purposes.

---

## Overview

- **Frontend**: A clean login prompt (`public/index.html`).
- **Backend**: A minimal Node.js server (`server.js`) with zero third-party dependencies.

---

## Project Structure

```
insecure-webapp-example/
├── public/
│   └── index.html      # Frontend login interface
├── server.js           # Node.js HTTP server
├── package.json        # Project metadata & start script
└── README.md           # Documentation
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Running the App

1. Start the server:
   ```bash
   node server.js
   # or
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your web browser.
3. Enter a username and password, then submit the form.
4. Check your terminal output to view the logged payload.

---

## Intentional Vulnerabilities Demonstrated

1. **Cleartext Transmission of Sensitive Information ([CWE-319](https://cwe.mitre.org/data/definitions/319.html))**
   - Credentials are submitted over unencrypted HTTP and forwarded to a remote endpoint (`http://server.local/login`) in plaintext, exposing them to network eavesdropping and Man-in-the-Middle (MitM) attacks.
2. **Insertion of Sensitive Information into Log Files ([CWE-532](https://cwe.mitre.org/data/definitions/532.html))**
   - The backend logs incoming passwords directly to standard output/console in plaintext.

---

## Secure Coding Remediations

In production applications:
- **Use HTTPS / TLS**: Always encrypt data in transit between the client, backend, and external APIs.
- **Never Log Secrets**: Omit, mask, or redact passwords and tokens from application logs.
- **Hash Passwords**: Always hash passwords using strong, salted one-way hash functions (e.g., Argon2, bcrypt) before storing or validating them.
