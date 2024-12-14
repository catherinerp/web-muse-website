# WebMuse - Color Palette Generator

WebMuse is a web application that generates a color palette based on user prompts. The application leverages a backend API powered by the Arli AI model to create custom palettes of hex color codes that can be easily copied to the clipboard.

## Features
- **Custom Color Palettes:** Enter a descriptive prompt, and the app generates five hex color codes matching the description.
- **Clipboard Copying:** Click on a color to copy its hex code to your clipboard. A confirmation message \("Copied!"\) is displayed.
- **Dynamic Popovers:** Each color displays a popover showing the hex code or the confirmation message when copied.
- **Responsive Design:** Built with modern UI components for a seamless user experience.

## Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **AI API:** Arli AI
- **Others:** Environment variables (dotenv), CORS

## Prerequisites
- Node.js and npm installed on your machine.
- An API key from Arli AI.

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
   node index.js
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

## Usage
1. Enter a descriptive prompt in the input box (e.g., "sunset on the beach").
2. Click the "Generate" button.
3. View the generated color palette.
4. Hover over a color to see its hex code.
5. Click on a color to copy it to the clipboard; the popover will display "Copied!".

## Project Structure
```
webmuse/
├── backend/
│   ├── index.js          # Backend server
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables (API key)
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── index.css     # Styles
│   │   └── index.js      # Entry point
│   ├── public/           # Static files
│   └── package.json      # Frontend dependencies
└── README.md             # Project documentation
```

## Environment Variables
Ensure you set the following environment variable in the `.env` file:
- `ARLIAI_API_KEY`: Your Arli AI API key.

## API Endpoints
### POST `/api/generate-palette`
- **Description:** Generates a color palette based on a user prompt.
- **Request Body:**
  ```json
  {
    "prompt": "sunset on the beach"
  }
  ```
- **Response:**
  ```json
  {
    "generatedText": "#FF5733 #C70039 #900C3F #FFC300 #DAF7A6",
    "palette": ["#FF5733", "#C70039", "#900C3F", "#FFC300", "#DAF7A6"]
  }
  ```

## Screenshots
Add screenshots or a demo video showcasing the app.

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [Arli AI](https://arliai.com) for the API.
- [TailwindCSS](https://tailwindcss.com) for styling.
- Inspiration and support from the developer community.

## Contact
For any questions or feedback, feel free to contact me at [your-email@example.com](mailto:your-email@example.com).

