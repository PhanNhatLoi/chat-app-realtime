# Realtime Chat App

A realtime chat application built with **React Native** and **WebSocket**, designed to deliver seamless messaging experiences.

## 🚀 Features

* Realtime messaging using WebSocket
* Beautiful and responsive UI built with React Native
* Support for multiple chat rooms or channels (optional)
* Easily extendable and customizable

## 🧰 Tech Stack

* **Frontend**: React Native
* **Realtime Communication**: WebSocket

## 📦 Installation

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/) >= 14
* [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 1. Clone the Repository

```bash
git clone https://github.com/PhanNhatLoi/chat-app-realtime.git
cd realtime-chat-app
```

### 2. Install Dependencies

With **Yarn**:

```bash
yarn install
```

Or with **npm**:

```bash
npm install
```

### 3. Run the App

With **Yarn**:

```bash
yarn start
```

Or with **npm**:

```bash
npm run start
```

This will open the Expo development server in your browser. You can:

* Scan the QR code with the **Expo Go app** on your device
* Run on **iOS simulator** / **Android emulator**

## 📁 Project Structure

```
realtime-chat-app/
├── assets/                 # Images, icons, etc.
├── components/             # Reusable UI components
├── screens/                # Application screens
├── services/               # WebSocket and API logic
├── App.js                  # Entry point
└── ...
```

## 💬 WebSocket Setup

WebSocket client is initialized inside the `services/socket.js` file. On app launch, the socket connects and listens for incoming messages.

## 📖 Learn More

* [React Native Docs](https://reactnative.dev/)
* [Expo Documentation](https://docs.expo.dev/)
* [WebSocket on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
