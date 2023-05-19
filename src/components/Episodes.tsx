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

    const changePage = (page: number) => {
        params.set('page', String(page));
        setParams(params);
    }

    useEffect(() => {
        if (!params.get('page')) {
            changePage(1);
        }
        axios.get<Response>(`${urlEpisode}?page=${params.get('page')}`).then((response) => {
            setEpisodes(response.data.results);
        })
    },[params.get('page')])

  return (
    <div>
        <button onClick={() => {changePage(Number(params.get('page')) - 1)}}>Previus</button>
        <span>{params.get('page')}</span>
        <button onClick={() => {changePage(Number(params.get('page')) + 1)}}>Next</button>
        <br></br>
        {episodes.map(episode => <><Link to={`/episodes/${episode.id}`}>{episode.name}</Link><br></br></>)}
    </div>
  )
}
