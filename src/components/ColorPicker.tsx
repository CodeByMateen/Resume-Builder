import React, { useState } from 'react'
import { HsvColorPicker } from 'react-colorful'
import './ColorPicker.css'

interface ColorPickerProps {
  selectedColor: {
    primary: string
    secondary: string
    name: string
  }
  onColorChange: (color: { primary: string; secondary: string; name: string }) => void
}

// Helper function to convert hex to HSV
const hexToHsv = (hex: string): { h: number; s: number; v: number } => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0
  if (diff !== 0) {
    if (max === r) h = ((g - b) / diff) % 6
    else if (max === g) h = (b - r) / diff + 2
    else h = (r - g) / diff + 4
  }
  h = Math.round(h * 60)
  if (h < 0) h += 360

  const s = max === 0 ? 0 : Math.round((diff / max) * 100)
  const v = Math.round(max * 100)

  return { h, s, v }
}

// Helper function to convert HSV to hex
const hsvToHex = (h: number, s: number, v: number): string => {
  s /= 100
  v /= 100

  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c

  let r = 0, g = 0, b = 0

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Helper function to generate secondary color (darker version)
const generateSecondaryColor = (primary: string): string => {
  const hsv = hexToHsv(primary)
  // Make it darker by reducing value and increasing saturation slightly
  const newV = Math.max(hsv.v - 30, 20)
  const newS = Math.min(hsv.s + 10, 100)
  return hsvToHex(hsv.h, newS, newV)
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  const [hsvColor, setHsvColor] = useState(() => hexToHsv(selectedColor.primary))



  const handleHsvChange = (newHsv: { h: number; s: number; v: number }) => {
    setHsvColor(newHsv)
    const primaryHex = hsvToHex(newHsv.h, newHsv.s, newHsv.v)
    const secondaryHex = generateSecondaryColor(primaryHex)
    
    onColorChange({
      primary: primaryHex,
      secondary: secondaryHex,
      name: 'Custom'
    })
  }



  return (
    <div className="color-picker-container">
      <h3>Choose Your Color Theme</h3>
      
      {/* Direct Color Picker Interface */}
      <div className="direct-color-picker">
        <div className="color-picker-main">
          <div className="hsv-picker-wrapper">
            <HsvColorPicker color={hsvColor} onChange={handleHsvChange} />
          </div>
          
          <div className="color-info-panel">
            <div className="color-preview-section">
              <div className="color-preview-large">
                <div 
                  className="color-preview-primary"
                  style={{ backgroundColor: hsvToHex(hsvColor.h, hsvColor.s, hsvColor.v) }}
                />
                <div 
                  className="color-preview-secondary"
                  style={{ backgroundColor: generateSecondaryColor(hsvToHex(hsvColor.h, hsvColor.s, hsvColor.v)) }}
                />
              </div>
              <div className="color-values">
                <div className="color-value">
                  <span className="color-label">Primary:</span>
                  <span className="color-hex">{hsvToHex(hsvColor.h, hsvColor.s, hsvColor.v)}</span>
                </div>
                <div className="color-value">
                  <span className="color-label">Secondary:</span>
                  <span className="color-hex">{generateSecondaryColor(hsvToHex(hsvColor.h, hsvColor.s, hsvColor.v))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default ColorPicker 