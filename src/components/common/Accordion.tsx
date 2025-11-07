import React, { useState } from 'react'
import '@styles/components/accordion.scss'

interface AccordionProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

interface AccordionItemProps {
  header: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const AccordionItem = ({ 
  header, 
  children, 
  isOpen = false, 
  onToggle,
  className = '' 
}: AccordionItemProps) => {
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''} ${className}`}>
      <div className="accordion-header" onClick={onToggle}>
        {header}
        <span className="accordion-icon">{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  )
}

const Accordion = ({ children, defaultOpen = false, className = '' }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ? 0 : null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={`accordion ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === AccordionItem) {
          return React.cloneElement(child, {
            isOpen: openIndex === index,
            onToggle: () => handleToggle(index),
          } as any)
        }
        return child
      })}
    </div>
  )
}

export default Accordion
