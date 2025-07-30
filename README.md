# Resume Builder by Mateen Shahzad

A professional resume builder application that allows users to create clean, well-formatted resumes with a live preview and PDF download functionality.

**Created with ❤️ by [Mateen Shahzad](https://linkedin.com/in/mateenshahzad)**

Free for everyone to use! No registration required.

## Features

- **Split-screen Interface**: Form inputs on the left, live preview on the right
- **Real-time Preview**: See changes instantly as you type
- **PDF Download**: Generate and download your resume as a PDF
- **Professional Layout**: Clean, minimal design matching professional resume standards
- **Demo Data**: Load sample data to see how the application works
- **Responsive Design**: Works on desktop and mobile devices

## Sections Included

- **Personal Information**: Name, phone, email, LinkedIn, GitHub
- **Work Experience**: Company, position, duration, location, and responsibilities
- **Projects**: Project name, GitHub link, description, and technologies used
- **Skills**: Programming languages, tech stack, system design, cloud/DevOps, databases, and certifications
- **Education**: Institution, degree, duration, and grade
- **Achievements**: Professional accomplishments and recognitions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

1. **Load Demo Data**: Click the "Load Demo Data" button to see sample data
2. **Fill Information**: Enter your personal details, work experience, projects, skills, education, and achievements
3. **Live Preview**: Watch your resume update in real-time on the right side
4. **Download PDF**: Click the "Download PDF" button to generate and download your resume

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: CSS3 with responsive design
- **PDF Generation**: html2canvas + jsPDF
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
resume-builder/
├── src/
│   ├── components/
│   │   ├── ResumeForm.tsx          # Form component for data input
│   │   ├── ResumePreview.tsx       # Preview component for resume display
│   │   └── ResumePreview.css       # Styling for resume preview
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Main application styles
│   ├── demoData.ts                 # Sample data for demonstration
│   └── main.tsx                    # Application entry point
├── public/                         # Public assets
└── package.json                    # Dependencies and scripts
```

## Features in Detail

### Form Validation
- Required fields are highlighted
- Email validation for contact information
- Dynamic form sections for work experience and projects

### PDF Generation
- High-quality PDF output
- Maintains formatting and layout
- Professional print-ready format

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly controls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Creator

**Mateen Shahzad** - Full Stack Engineer  
🔗 [LinkedIn](https://linkedin.com/in/mateenshahzad) | [GitHub](https://github.com/codebymateen)

This project was created to help job seekers create professional resumes for free. No registration, no hidden fees, just a simple tool to build beautiful resumes.

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- 📧 Email: Contact via LinkedIn  
- 🐛 Issues: Open an issue in this repository
- 💡 Suggestions: Connect with me on LinkedIn

---

### ⭐ If this tool helped you land a job, consider giving it a star!

**Made with ❤️ for the developer community**
