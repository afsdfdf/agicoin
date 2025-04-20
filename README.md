# AGICOIN

AGICOIN is a modern web application built with React and TypeScript.

## Features

- Modern React with TypeScript
- Styled Components for styling
- Telegram Web App integration
- Responsive design
- Error boundary handling
- Theme context for consistent styling

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/agicoin.git
cd agicoin
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

## Building for Production

```bash
npm run build
```

## Deployment

The application can be deployed using the provided deployment script:

```bash
./deploy.sh
```

## Project Structure

```
src/
  ├── components/     # Reusable React components
  ├── context/       # React context providers
  ├── pages/         # Page components
  ├── telegram/      # Telegram Web App integration
  ├── types/         # TypeScript type definitions
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 