# **App Name**: Sentiment Insights

## Core Features:

- Real-time Sentiment Analysis: Analyze customer review text in real-time and provide sentiment (positive or negative) with confidence scores. The AI reasoning capabilities act as a tool to correctly incorporate edge cases, like sarcastic statements.
- Dark/Light Mode Toggle: Allow users to switch between dark and light mode for optimal viewing experience.
- Sample Reviews: Provide sample reviews that users can click to populate the text input area.
- Analysis History: Display the last 5 analyzed reviews with their sentiment analysis results in a sidebar.
- Statistics Dashboard: Display key statistics such as total analyses performed, positive vs. negative sentiment ratio, and average confidence score.
- Loading State: Show a loading spinner while the sentiment analysis is being processed.
- Error Handling: Display user-friendly error messages for empty or short input.

## Style Guidelines:

- Dark Mode: Background - Deep Blue (#0f172a), Cards - Dark Grey (#1e293b), Positive - Teal (#10b981), Negative - Red (#ef4444), Accents - Purple (#8b5cf6)
- Light Mode: Background - Light Grey (#f8fafc), Cards - White (#ffffff), Positive - Green (#059669), Negative - Red (#dc2626), Accents - Purple (#7c3aed)
- Body and headline font: 'Inter' sans-serif for a clean, modern look.
- Use React Icons for common UI elements. Use simple, outlined icons.
- Implement a responsive design using Tailwind CSS to ensure the app works on mobile, tablet, and desktop devices. Use glassmorphism effect for main cards.
- Use Framer Motion for smooth transitions and animations, especially when switching between dark and light modes, with a 300ms ease-in-out transition.
- Smooth fade-in animations when results appear. Pulsing animation on the analyze button on hover.