import React, { useEffect } from 'react'
import './DamageIndicator.css'

const DamageIndicator = ({ messages, setMessages }) => {
  useEffect(() => {
    messages.forEach((message) => {
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== message.id))
      }, 1000)
    })
  }, [messages, setMessages])

  const messageText = (message) => {
    switch (message.type) {
      case 'hit':
        return `-${message.damage}`
      case 'critical':
        return `CRITICAL! -${message.damage}`
      case 'evaded':
        return 'Evaded'
      case 'missed':
        return 'Missed'
      default:
        return ''
    }
  }

  return (
    <>
      {messages.map((message) => (
        <p key={message.id} className={`message ${message.type}`}>
          {messageText(message)}
        </p>
      ))}
    </>
  )
}

export default DamageIndicator
