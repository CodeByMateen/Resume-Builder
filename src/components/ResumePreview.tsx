import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import type { ResumeData } from '../App'
import './ResumePreview.css'

interface ResumePreviewProps {
  resumeData: ResumeData
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const downloadPDF = async () => {
    if (!resumeRef.current || isGeneratingPDF) return

    setIsGeneratingPDF(true)
    
    try {
      // Get the actual height of the content
      const contentHeight = resumeRef.current.scrollHeight
      const contentWidth = 794
      
      // A4 size in points
      const a4Width = 595.28 // A4 width in points
      const a4Height = 841.89 // A4 height in points
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2.2, // Balanced scale for quality vs file size
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: contentWidth,
        height: contentHeight,
        scrollX: 0,
        scrollY: 0
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.92) // High quality JPEG with slight compression
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
        compress: true // Enable compression to manage file size
      })

      // Calculate dimensions to fit A4
      const imgWidth = a4Width
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      // If content is taller than A4, add multiple pages
      if (imgHeight > a4Height) {
        const pageCount = Math.ceil(imgHeight / a4Height)
        
        for (let i = 0; i < pageCount; i++) {
          if (i > 0) pdf.addPage()
          
          const yPosition = -(i * a4Height)
          pdf.addImage(imgData, 'JPEG', 0, yPosition, imgWidth, imgHeight, undefined, 'MEDIUM')
        }
      } else {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'MEDIUM')
      }

      // Add clickable links for LinkedIn and GitHub
      if (resumeData.personalInfo.linkedin && resumeData.personalInfo.linkedin.startsWith('http')) {
        pdf.link(400, 50, 100, 15, { url: resumeData.personalInfo.linkedin })
      }
      
      if (resumeData.personalInfo.github && resumeData.personalInfo.github.startsWith('http')) {
        pdf.link(510, 50, 80, 15, { url: resumeData.personalInfo.github })
      }

      pdf.save(`${resumeData.personalInfo.name || 'resume'}_resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const downloadJSON = () => {
    try {
      const dataStr = JSON.stringify(resumeData, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `${resumeData.personalInfo.name || 'resume'}_data.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    } catch (error) {
      console.error('Error downloading JSON:', error)
      alert('Error downloading JSON. Please try again.')
    }
  }

  const formatSkillsSection = (skills: string[], title: string) => {
    if (skills.length === 0) return null
    return (
      <div className="skill-category">
        <strong>{title}:</strong> {skills.join(', ')}
      </div>
    )
  }

  return (
    <div className="resume-preview-container">
      <div className="download-section">
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="download-btn"
            onClick={downloadPDF}
            disabled={!resumeData.personalInfo.name || isGeneratingPDF}
          >
            {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
          </button>
          
          <button 
            className="download-btn"
            onClick={downloadJSON}
            disabled={!resumeData.personalInfo.name}
            style={{ background: '#007bff' }}
          >
            Download JSON
          </button>
        </div>
        
        {isGeneratingPDF && (
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            Please wait, Your Resume is on the way...
          </p>
        )}
        
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Download JSON to save your progress in case you close the browser or refresh the page. You can import it later.
        </p>
      </div>
      
      <div className="resume-preview" ref={resumeRef} style={{ fontFamily: resumeData.fontFamily, fontSize: `${resumeData.fontSize}px` }}>
        {/* Header */}
        <div className="resume-header">
          <h1 className="resume-name">{resumeData.personalInfo.name || 'Your Name'}</h1>
          
          <div className="contact-info" style={{ fontSize: `${resumeData.navbarFontSize}px` }}>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>{resumeData.personalInfo.phone || '+91-1234567890'}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{resumeData.personalInfo.location || 'Your Location'}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>{resumeData.personalInfo.email || 'abc@gmail.com'}</span>
            </div>
            <div className="contact-item">
              <svg width={resumeData.navbarFontSize} height={resumeData.navbarFontSize} viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <a href={resumeData.personalInfo.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="contact-link">
                {resumeData.personalInfo.linkedin || 'LinkedIn'}
              </a>
            </div>
            <div className="contact-item">
              <svg width={resumeData.navbarFontSize} height={resumeData.navbarFontSize} viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <a href={resumeData.personalInfo.github || '#'} target="_blank" rel="noopener noreferrer" className="contact-link">
                {resumeData.personalInfo.github || 'Github'}
              </a>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        {resumeData.workExperience.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Work Experience</h2>
            <div className="section-content">
              {resumeData.workExperience.map((exp, _) => (
                <div key={exp.id} className="experience-item">
                  <div className="experience-header">
                    <div className="experience-company">
                      <strong>{exp.company}</strong>
                      <span className="experience-duration">{exp.duration}</span>
                    </div>
                    <div className="experience-position">
                      <span>{exp.position}</span>
                      <span className="experience-location">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="experience-responsibilities">
                    {exp.responsibilities.filter(resp => resp.trim()).map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Projects</h2>
            <div className="section-content">
              {resumeData.projects.map((project, _) => (
                <div key={project.id} className="project-item">
                  <div className="project-header">
                    <div className="project-name">
                      <strong>{project.name}</strong>
                      <span className="project-link">{project.githubLink}</span>
                    </div>
                  </div>
                  <div className="project-description">
                    {project.description}
                  </div>
                  {project.technologies.length > 0 && (
                    <div className="project-technologies">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills and Certifications */}
        {!Object.values(resumeData.skills).every(skillArray => skillArray.length === 0) && (
          <div className="resume-section">
            <h2 className="section-title">Skills and Certifications</h2>
            <div className="section-content">
              <div className="skills-grid">
                {formatSkillsSection(resumeData.skills.programmingLanguages, 'Programming Languages')}
                {formatSkillsSection(resumeData.skills.techStack, 'Tech Stack')}
                {formatSkillsSection(resumeData.skills.systemDesign, 'System Design')}
                {formatSkillsSection(resumeData.skills.cloudDevops, 'Cloud and DevOps')}
                {formatSkillsSection(resumeData.skills.databases, 'Data & Databases')}
                {formatSkillsSection(resumeData.skills.certifications, 'Certifications')}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {(resumeData.education.institution || resumeData.education.degree) && (
          <div className="resume-section">
            <h2 className="section-title">Education</h2>
            <div className="section-content">
              <div className="education-item">
                <div className="education-header">
                  <div className="education-institution">
                    <strong>{resumeData.education.institution || 'University Name'}</strong>
                    <span className="education-duration">{resumeData.education.duration}</span>
                  </div>
                  <div className="education-degree">
                    <span>{resumeData.education.degree}</span>
                    <span className="education-grade">{resumeData.education.grade}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title">Achievements</h2>
            <div className="section-content">
              <ul className="achievements-list">
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePreview 