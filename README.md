# WebMuse - Colour Palette Generator

WebMuse is a web application that generates a colour palette based on user prompts. The application leverages a backend API powered by the DeepSeek 7B model via Ollama to create custom palettes of colour codes that can be easily copied to the clipboard.

## Features
- **Custom Colour Palettes:** Enter a descriptive prompt, and the app generates five colour codes matching the description.
- **Clipboard Copying:** Click on a colour to copy its colour code to your clipboard. A confirmation message \("Copied!"\) is displayed.
- **Dynamic Popovers:** Each colour displays a popover showing the colour code or the confirmation message when copied.
- **Responsive Design:** Built with modern UI components for a seamless user experience.

## Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **AI API:** DeepSeek-R1-Distill-Qwen-7B via Ollama
- **Others:** Flask, CORS

## Prerequisites
- Node.js and npm installed on your machine.
- Ollama installed (installation guide).
- DeepSeek-R1 model downloaded via Ollama.

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/catherinerp/web-muse-website.git
   cd webmuse/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your Arli AI API key:
   ```env
   ARLIAI_API_KEY=your-api-key-here
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will open in your default browser at `http://localhost:3000`.

### Ollama Setup
1. Navigate to the ollama directory:
   ```bash
   cd ../ollama
   ```

2. Pull DeepSeek model from Ollama:
   ```bash
   ollama pull deepseek-r1:7b
   ```

3. Start the ollama server:
   ```bash
   python run_ollama.py
   ```
   The app will open in your default browser at `http://localhost:4000`.

## Usage
1. Enter a descriptive prompt in the input box (e.g., "sunset on the beach").
2. Click the "Generate" button.
3. View the generated colour palette.
4. Hover over a colour to see its colour code.
5. Click on a colour to copy it to the clipboard; the popover will display "Copied!".

## Project Structure
```
webmuse/
├── backend/
│   ├── server.js         # Backend server
│   ├── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── index.css     # Styles
│   │   └── index.js      # Entry point
│   ├── public/           # Static files
│   └── package.json      # Frontend dependencies
├── ollama/
│   └── run_ollama.py     # Ollama server
└── README.md             # Project documentation
```

## API Endpoints
### POST `/api/generate-palette`
- **Description:** Generates a colour palette based on a user prompt.
- **Request Body:**
  ```json
  {
    "prompt": "sunset on the beach"
  }
  ```
- **Response:**
  ```json
  {
    "palette": ["#FF5733", "#C70039", "#900C3F", "#FFC300", "#DAF7A6"]
  }
  ```

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [DeepSeek-R1 AI](https://ollama.com/library/deepseek-r1) for the AI API.
- [Colormind](http://colormind.io) for the Colour Generator API.
- [TailwindCSS](https://tailwindcss.com) for styling.

## Contact
For any questions or feedback, feel free to contact me at [cpebenito88@gmail.com](mailto:cpebenito88@gmail.com).

