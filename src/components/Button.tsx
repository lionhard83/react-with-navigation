import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Button = () => {
  const navigate = useNavigate();

  const onClick = () => {
    setTimeout(() => {
      navigate(-1);
    }, 1000)
  }
  return (
    <button onClick={onClick}>To Users</button>
  )
}
