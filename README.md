# CalmPulse 🧘‍♂️

CalmPulse is a mindfulness and meditation app built with React Native and Expo, designed to help users manage stress and anxiety through guided breathing exercises and calming audio sessions.
# Figma Files 
[Figma](https://www.figma.com/design/btuFC1HspPg3FDOVZ5GIZW/CalmPulse?node-id=342-4583&t=xHmvTP3PiY7lAylm-1)
## Features

- 🧘‍♀️ Guided breathing exercises with customizable durations
- 🎵 Calming audio player with meditation tracks
- 🔐 Secure authentication with Firebase
- 👤 User profiles and progress tracking
- 🎨 Beautiful, minimalist UI with smooth animations

## Tech Stack

- React Native with Expo
- Firebase Authentication
- Expo Router for navigation
- TypeScript for type safety
- Custom UI components

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/CalmPulse.git
   cd CalmPulse
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up Firebase
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Email/Password authentication
   - Copy your Firebase config to `context/AuthContext.tsx`

4. Start the development server
   ```bash
   npx expo start
   ```

## Project Structure

```
CalmPulse/
├── app/                    # Main application code
│   ├── (auth)/             # Authentication screens
│   └── (tabs)/             # Main app tabs
├── components/             # Reusable components
├── context/                # React Context providers
└── constants/              # Theme and constants
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
