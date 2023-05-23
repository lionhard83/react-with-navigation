import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
export const urlEpisode = 'https://rickandmortyapi.com/api/episode';

export type Response  = {
    info:    Info;
    results: Episode[];
}

export type Info = {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export type Episode = {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    Date;
}


export const Episodes = () => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [params, setParams] = useSearchParams();
    const [textInInput, setTextInInput] = useState('');
    const [hasNext, setNext] = useState(true);
    const [hasPrev, setPrev] = useState(true);

    const findName = () => {
        if (textInInput) {
            params.set('page', String(1)); 
            params.set('name', textInInput); 
        } else {
            params.delete('name');
        }
        setParams(params)
    
    }

    const changePage = (page: number) => {
        params.set('page', String(page));
        setParams(params);
    }

    useEffect(() => {
        if (!params.get('page')) {
            changePage(1);
        }
        const nameQP =  params.get('name') ? `&name=${params.get('name')}` : ''
        axios.get<Response>(`${urlEpisode}?page=${params.get('page')}${nameQP}`).then((response) => {
            setEpisodes(response.data.results);
            setNext(Boolean(response.data.info.next));
            setPrev(Boolean(response.data.info.prev));
        })
    },[params.get('page'), params.get('name')])

  return (
    <div>
        <button disabled={!hasPrev} onClick={() => {changePage(Number(params.get('page')) - 1)}}>Previus</button>
        <span>{params.get('page')}</span>
        <button disabled={!hasNext}  onClick={() => {changePage(Number(params.get('page')) + 1)}}>Next</button>
        <br></br>
        <input value={params.get('name') || ''} onChange={(event) => {setTextInInput(event.target.value)}}></input>
        <button onClick={findName}>Find</button>
        <br></br>
        {episodes.map(episode => <><Link to={`/episodes/${episode.id}`}>{episode.name}</Link><br></br></>)}
    </div>
  )
}
