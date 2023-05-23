import React, { useEffect, useState } from 'react'
import { Episode, urlEpisode } from './Episodes/Episodes'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const SingleEpisode = () => {
  const {id} = useParams() as {id: string};
  
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const changeEpisode = (id: number) => {
    navigate(`/episodes/${id}`)
  }
  useEffect(() => {
    axios.get<Episode>(`${urlEpisode}/${id}`).then(response => {
        setEpisode(response.data);
    })
  }, [id])
  return (
    <div>
        <button onClick={() => changeEpisode(Number(id) - 1)} >-</button>
        <button onClick={() => changeEpisode(Number(id) + 1)}>+</button>
        <p>{episode?.name}</p>
        <p>{episode?.id}</p>
    </div>
  )
}
