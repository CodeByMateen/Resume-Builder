import { useState, useEffect } from 'react'
import './App.css'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'

export interface ResumeData {
  personalInfo: {
    name: string
    phone: string
    email: string
    linkedin: string
    github: string
    location: string
    role: string
  }
  fontFamily: string
  fontSize: number
  navbarFontSize: number
  selectedColor: {
    primary: string
    secondary: string
    name: string
  }
  workExperience: Array<{
    id: string
    company: string
    position: string
    duration: string
    location: string
    responsibilities: string[]
  }>
  projects: Array<{
    id: string
    name: string
    githubLink: string
    description: string[]
    technologies: string[]
  }>
  skills: Array<{
    id: string
    name: string
    skills: string[]
  }>
  education: {
    institution: string
    degree: string
    duration: string
    grade: string
  }
  achievements: string[]
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    location: '',
    role: ''
  },
  fontFamily: 'Calibri',
  fontSize: 11,
  navbarFontSize: 10,
  selectedColor: {
    primary: '#4a90e2',
    secondary: '#2c5aa0',
    name: 'Light Blue'
  },
  workExperience: [],
  projects: [],
  skills: [
    { id: '1', name: 'Programming Languages', skills: [] },
    { id: '2', name: 'Tech Stack', skills: [] },
    { id: '3', name: 'System Design', skills: [] },
    { id: '4', name: 'Cloud and DevOps', skills: [] },
    { id: '5', name: 'Data & Databases', skills: [] },
    { id: '6', name: 'Certifications', skills: [] }
  ],
  education: {
    institution: '',
    degree: '',
    duration: '',
    grade: ''
  },
  achievements: []
}

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [leftPanelWidth, setLeftPanelWidth] = useState(45) // percentage
  const [isDragging, setIsDragging] = useState(false)

  // Update CSS custom properties when color changes
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--primary-color', resumeData.selectedColor.primary)
    root.style.setProperty('--secondary-color', resumeData.selectedColor.secondary)
  }, [resumeData.selectedColor])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const container = document.querySelector('.app-container') as HTMLElement
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const mouseX = e.clientX - containerRect.left
    const newLeftWidth = (mouseX / containerRect.width) * 100

    // Constrain the width between 20% and 80%
    const constrainedWidth = Math.max(20, Math.min(80, newLeftWidth))
    setLeftPanelWidth(constrainedWidth)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="app">
      <div className="app-container">
        <div
          className="form-panel"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>

        <div
          className="resize-handle"
          onMouseDown={handleMouseDown}
        >
          <div className="resize-handle-line"></div>
        </div>

        <div
          className="preview-panel"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </div>
  )
}

export default App
