import React, { useState } from 'react'
import type { ResumeData } from '../App'
import { demoData } from '../demoData'

interface ResumeFormProps {
    resumeData: ResumeData
    setResumeData: (data: ResumeData) => void
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
    const [newAchievement, setNewAchievement] = useState('')

    const updatePersonalInfo = (field: string, value: string) => {
        setResumeData({
            ...resumeData,
            personalInfo: {
                ...resumeData.personalInfo,
                [field]: value
            }
        })
    }

    const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target?.result as string)
                setResumeData(jsonData)
            } catch (error) {
                console.error('Error parsing JSON:', error)
                alert('Invalid JSON file. Please check the file format.')
            }
        }
        reader.readAsText(file)
        // Clear the input so the same file can be selected again
        event.target.value = ''
    }

    const addWorkExperience = () => {
        const newExp = {
            id: Date.now().toString(),
            company: '',
            position: '',
            duration: '',
            location: '',
            responsibilities: ['']
        }
        setResumeData({
            ...resumeData,
            workExperience: [...resumeData.workExperience, newExp]
        })
    }

    const updateWorkExperience = (id: string, field: string, value: string) => {
        setResumeData({
            ...resumeData,
            workExperience: resumeData.workExperience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        })
    }

    const updateWorkResponsibility = (expId: string, index: number, value: string) => {
        setResumeData({
            ...resumeData,
            workExperience: resumeData.workExperience.map(exp =>
                exp.id === expId ? {
                    ...exp,
                    responsibilities: exp.responsibilities.map((resp, i) =>
                        i === index ? value : resp
                    )
                } : exp
            )
        })
    }

    const addWorkResponsibility = (expId: string) => {
        setResumeData({
            ...resumeData,
            workExperience: resumeData.workExperience.map(exp =>
                exp.id === expId ? {
                    ...exp,
                    responsibilities: [...exp.responsibilities, '']
                } : exp
            )
        })
    }

    const removeWorkResponsibility = (expId: string, index: number) => {
        setResumeData({
            ...resumeData,
            workExperience: resumeData.workExperience.map(exp =>
                exp.id === expId ? {
                    ...exp,
                    responsibilities: exp.responsibilities.filter((_, i) => i !== index)
                } : exp
            )
        })
    }

    const removeWorkExperience = (id: string) => {
        setResumeData({
            ...resumeData,
            workExperience: resumeData.workExperience.filter(exp => exp.id !== id)
        })
    }

    const addProject = () => {
        const newProject = {
            id: Date.now().toString(),
            name: '',
            githubLink: '',
            description: '',
            technologies: []
        }
        setResumeData({
            ...resumeData,
            projects: [...resumeData.projects, newProject]
        })
    }

    const updateProject = (id: string, field: string, value: string) => {
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.map(project =>
                project.id === id ? { ...project, [field]: value } : project
            )
        })
    }

    const addProjectTechnology = (projectId: string, tech: string) => {
        if (!tech.trim()) return
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.map(project =>
                project.id === projectId ? {
                    ...project,
                    technologies: [...project.technologies, tech.trim()]
                } : project
            )
        })
    }

    const removeProjectTechnology = (projectId: string, techIndex: number) => {
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.map(project =>
                project.id === projectId ? {
                    ...project,
                    technologies: project.technologies.filter((_, i) => i !== techIndex)
                } : project
            )
        })
    }

    const removeProject = (id: string) => {
        setResumeData({
            ...resumeData,
            projects: resumeData.projects.filter(project => project.id !== id)
        })
    }

    const addSkill = (category: keyof ResumeData['skills'], skill: string) => {
        if (!skill.trim()) return
        setResumeData({
            ...resumeData,
            skills: {
                ...resumeData.skills,
                [category]: [...resumeData.skills[category], skill.trim()]
            }
        })
    }

    const removeSkill = (category: keyof ResumeData['skills'], skillIndex: number) => {
        setResumeData({
            ...resumeData,
            skills: {
                ...resumeData.skills,
                [category]: resumeData.skills[category].filter((_, i) => i !== skillIndex)
            }
        })
    }

    const updateEducation = (field: string, value: string) => {
        setResumeData({
            ...resumeData,
            education: {
                ...resumeData.education,
                [field]: value
            }
        })
    }

    const addAchievement = (achievement: string) => {
        if (!achievement.trim()) return
        setResumeData({
            ...resumeData,
            achievements: [...resumeData.achievements, achievement.trim()]
        })
    }

    const removeAchievement = (index: number) => {
        setResumeData({
            ...resumeData,
            achievements: resumeData.achievements.filter((_, i) => i !== index)
        })
    }

    return (
        <div className="resume-form">
            {/* Color Palette Selector */}
            <div className="color-palette-section">
                <h3>Choose Your Color Theme</h3>
                <div className="color-palette">
                    {[
                        { name: 'Light Blue', primary: '#4a90e2', secondary: '#2c5aa0' },
                        { name: 'Teal', primary: '#20b2aa', secondary: '#008080' },
                        { name: 'Green', primary: '#28a745', secondary: '#1e7e34' },
                        { name: 'Orange', primary: '#fd7e14', secondary: '#e55a4f' },
                        { name: 'Dark Blue', primary: '#007bff', secondary: '#0056b3' },
                        { name: 'Red', primary: '#dc3545', secondary: '#bd2130' },
                        { name: 'Indigo', primary: '#6610f2', secondary: '#520dc2' },
                        { name: 'Gray', primary: '#6c757d', secondary: '#495057' }
                    ].map((color) => (
                        <div
                            key={color.name}
                            className={`color-option ${resumeData.selectedColor.name === color.name ? 'selected' : ''}`}
                            onClick={() => setResumeData({ ...resumeData, selectedColor: color })}
                            style={{ 
                                background: `linear-gradient(135deg, ${color.primary} 0%, ${color.secondary} 100%)`,
                                cursor: 'pointer'
                            }}
                            title={color.name}
                        >
                            {resumeData.selectedColor.name === color.name && (
                                <div className="color-check">✓</div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="selected-color-name">Selected: {resumeData.selectedColor.name}</p>
            </div>

            {/* Creator Attribution */}
            <div className="creator-attribution">
                <div className="attribution-content">
                    <p className="made-with">Made with ❤️ by <strong>Mateen Shahzad</strong></p>
                    <div className="creator-links">
                        <a
                            href="https://linkedin.com/in/mateenshahzad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="creator-link"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/codebymateen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="creator-link"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                        </a>
                    </div>
                    <p className="attribution-note">Free ATS friendly resume builder for everyone 😊</p>
                </div>
            </div>

            <h2>Resume Builder v1.2.17</h2>

            <div className="demo-section">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setResumeData(demoData)}
                >
                    Load Demo Data
                </button>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Click to load sample data from the reference resume
                </p>
            </div>

            {/* Import JSON Section */}
            <div className="demo-section" style={{ background: 'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)', borderColor: 'rgba(40, 167, 69, 0.2)' }}>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    style={{ display: 'none' }}
                    id="json-import"
                />
                <label htmlFor="json-import" className="btn btn-success" style={{ cursor: 'pointer', margin: 0 }}>
                    Import JSON Data
                </label>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Upload a previously saved JSON file to restore your data
                </p>
            </div>

            {/* Font Selection */}
            <div className="form-section">
                <h3>Font Settings</h3>
                <div className="form-group">
                    <label>Font Family</label>
                    <select
                        value={resumeData.fontFamily}
                        onChange={(e) => setResumeData({ ...resumeData, fontFamily: e.target.value })}
                        className="form-select"
                    >
                        <option value="Calibri">Calibri</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Garamond">Garamond</option>
                        <option value="Palatino">Palatino</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Body Font Size: {resumeData.fontSize}px</label>
                    <div className="font-size-controls">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setResumeData({ ...resumeData, fontSize: Math.max(8, resumeData.fontSize - 1) })}
                        >
                            A-
                        </button>
                        <input
                            type="range"
                            min="8"
                            max="16"
                            value={resumeData.fontSize}
                            onChange={(e) => setResumeData({ ...resumeData, fontSize: parseInt(e.target.value) })}
                            className="font-size-slider"
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setResumeData({ ...resumeData, fontSize: Math.min(16, resumeData.fontSize + 1) })}
                        >
                            A+
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Contact Section Font Size: {resumeData.navbarFontSize}px</label>
                    <div className="font-size-controls">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setResumeData({ ...resumeData, navbarFontSize: Math.max(8, resumeData.navbarFontSize - 1) })}
                        >
                            A-
                        </button>
                        <input
                            type="range"
                            min="8"
                            max="16"
                            value={resumeData.navbarFontSize}
                            onChange={(e) => setResumeData({ ...resumeData, navbarFontSize: parseInt(e.target.value) })}
                            className="font-size-slider"
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setResumeData({ ...resumeData, navbarFontSize: Math.min(16, resumeData.navbarFontSize + 1) })}
                        >
                            A+
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={resumeData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        placeholder="Enter your location"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>LinkedIn</label>
                    <input
                        type="text"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                    <small style={{ fontSize: '11px', color: '#666' }}>
                        Enter full URL for clickable links in PDF
                    </small>
                </div>
                <div className="form-group">
                    <label>GitHub</label>
                    <input
                        type="text"
                        value={resumeData.personalInfo.github}
                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                        placeholder="https://github.com/yourusername"
                    />
                    <small style={{ fontSize: '11px', color: '#666' }}>
                        Enter full URL for clickable links in PDF
                    </small>
                </div>
            </div>

            {/* Work Experience */}
            <div className="form-section">
                <h3>Work Experience</h3>
                {resumeData.workExperience.map((exp, index) => (
                    <div key={exp.id} className="dynamic-section">
                        <div className="dynamic-section-header">
                            <h4>Experience {index + 1}</h4>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeWorkExperience(exp.id)}
                            >
                                Remove
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                                placeholder="Company name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Position</label>
                            <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                                placeholder="Your position"
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration</label>
                            <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => updateWorkExperience(exp.id, 'duration', e.target.value)}
                                placeholder="e.g., Sept 2021 - Present"
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                                placeholder="e.g., Bangalore, India"
                            />
                        </div>
                        <div className="form-group">
                            <label>Responsibilities</label>
                            <ul className="responsibilities-list">
                                {exp.responsibilities.map((resp, respIndex) => (
                                    <li key={respIndex}>
                                        <input
                                            type="text"
                                            value={resp}
                                            onChange={(e) => updateWorkResponsibility(exp.id, respIndex, e.target.value)}
                                            placeholder="Describe your responsibility"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => removeWorkResponsibility(exp.id, respIndex)}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => addWorkResponsibility(exp.id)}
                            >
                                Add Responsibility
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={addWorkExperience}
                >
                    Add Work Experience
                </button>
            </div>

            {/* Projects */}
            <div className="form-section">
                <h3>Projects</h3>
                {resumeData.projects.map((project, index) => (
                    <div key={project.id} className="dynamic-section">
                        <div className="dynamic-section-header">
                            <h4>Project {index + 1}</h4>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeProject(project.id)}
                            >
                                Remove
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Project Name</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                placeholder="Project name"
                            />
                        </div>
                        <div className="form-group">
                            <label>GitHub Link</label>
                            <input
                                type="text"
                                value={project.githubLink}
                                onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
                                placeholder="GitHub repository link"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                placeholder="Describe your project"
                            />
                        </div>
                        <div className="form-group">
                            <label>Technologies</label>
                            <div className="array-input-group">
                                <input
                                    type="text"
                                    placeholder="Add technology"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            addProjectTechnology(project.id, e.currentTarget.value)
                                            e.currentTarget.value = ''
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                        addProjectTechnology(project.id, input.value)
                                        input.value = ''
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="tags-container">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tag">
                                        {tech}
                                        <span
                                            className="remove-tag"
                                            onClick={() => removeProjectTechnology(project.id, techIndex)}
                                        >
                                            ×
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={addProject}
                >
                    Add Project
                </button>
            </div>

            {/* Skills */}
            <div className="form-section">
                <h3>Skills and Certifications</h3>

                {Object.entries({
                    programmingLanguages: 'Programming Languages',
                    techStack: 'Tech Stack',
                    systemDesign: 'System Design',
                    cloudDevops: 'Cloud and DevOps',
                    databases: 'Data & Databases',
                    certifications: 'Certifications'
                }).map(([key, label]) => (
                    <div key={key} className="form-group">
                        <label>{label}</label>
                        <div className="array-input-group">
                            <input
                                type="text"
                                placeholder={`Add ${label.toLowerCase()}`}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        addSkill(key as keyof ResumeData['skills'], e.currentTarget.value)
                                        e.currentTarget.value = ''
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={(e) => {
                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                    addSkill(key as keyof ResumeData['skills'], input.value)
                                    input.value = ''
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div className="tags-container">
                            {resumeData.skills[key as keyof ResumeData['skills']].map((skill, skillIndex) => (
                                <span key={skillIndex} className="tag">
                                    {skill}
                                    <span
                                        className="remove-tag"
                                        onClick={() => removeSkill(key as keyof ResumeData['skills'], skillIndex)}
                                    >
                                        ×
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="form-section">
                <h3>Education</h3>
                <div className="form-group">
                    <label>Institution</label>
                    <input
                        type="text"
                        value={resumeData.education.institution}
                        onChange={(e) => updateEducation('institution', e.target.value)}
                        placeholder="University/College name"
                    />
                </div>
                <div className="form-group">
                    <label>Degree</label>
                    <input
                        type="text"
                        value={resumeData.education.degree}
                        onChange={(e) => updateEducation('degree', e.target.value)}
                        placeholder="e.g., B.Tech, Computer Science And Engineering(CSE)"
                    />
                </div>
                <div className="form-group">
                    <label>Duration</label>
                    <input
                        type="text"
                        value={resumeData.education.duration}
                        onChange={(e) => updateEducation('duration', e.target.value)}
                        placeholder="e.g., July 2015 - June 2019"
                    />
                </div>
                <div className="form-group">
                    <label>Grade</label>
                    <input
                        type="text"
                        value={resumeData.education.grade}
                        onChange={(e) => updateEducation('grade', e.target.value)}
                        placeholder="e.g., Grade: 9.01"
                    />
                </div>
            </div>

            {/* Achievements */}
            <div className="form-section">
                <h3>Achievements</h3>
                <div className="form-group">
                    <div className="array-input-group">
                        <input
                            type="text"
                            value={newAchievement}
                            onChange={(e) => setNewAchievement(e.target.value)}
                            placeholder="Add achievement"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    addAchievement(newAchievement)
                                    setNewAchievement('')
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                addAchievement(newAchievement)
                                setNewAchievement('')
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <ul className="responsibilities-list">
                        {resumeData.achievements.map((achievement, index) => (
                            <li key={index}>
                                <span style={{ flex: 1 }}>{achievement}</span>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeAchievement(index)}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ResumeForm 