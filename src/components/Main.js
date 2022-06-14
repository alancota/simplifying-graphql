//@src/components/Main.js

import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import GraphQL from "./GraphQL";
import {JSONTree} from "react-json-tree";



const Main = () => {
    const [apiResponse, setApiResponse] = useState([""])
    const [showGraph, setShowGraph] = useState(false)
    const [restPerformance, setRestPerformance] = useState("")
    const [graphqlPerformance, setGraphqlPerformance] = useState("")

    const fetchObject = async (uri) => {
        const data = await fetch(uri)
            .then(response => response.json())
            .then(json => json)
        return data;
    }


    const fetchPlanets = async (films) => {
        let moviesObject = []
        films.map(async (film) => {
            const movie = await fetchObject(film)
            const planets = movie.planets
            planets.map(async (planet) => {
                const info = await fetchObject(planet)
                if (info) {
                    moviesObject.push(`${movie.title}, ${info.name}, ${info.population}`)
                    setApiResponse(old => [...old, `${movie.title}, ${info.name}, ${info.population}`])
                }
            })
        })
        return moviesObject
    }

    async function executeREST() {
        const lukeURI = "https://swapi.dev/api/people/1";
        const luke = await fetchObject(lukeURI)
        const films = luke.films
        const planets = await fetchPlanets(films)
    }

    const onFechWithRESTClickedHandle = () => {
        console.time('Fetching using REST')
        setShowGraph(false)
        executeREST()
        console.timeEnd('Fetching using REST')
    }

    const onFetchWithGraphQLClickHandle = () => {
        setShowGraph(true)
    }

    const graphqlExecutionTimeCallback = (time) => {
        setGraphqlPerformance(time)
    }

    return (
        <div className="container p-5">

            <div className="container">
                <h2>REST vs GraphQL Demo</h2>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <Button variant="primary" onClick={onFechWithRESTClickedHandle} type="submit">Fetch with REST</Button>
                    </div>
                </div>
                {/*<div className="row">*/}
                {/*    <div className="col">REST response time: <span className="text-primary"><b>{restPerformance}</b></span></div>*/}
                {/*</div>*/}
                <div className="row mt-3">
                    <div className="col">
                        <Button variant="warning" type="submit" onClick={onFetchWithGraphQLClickHandle}>Fetch with GraphQL</Button>
                    </div>
                </div>
                {/*<div className="row">*/}
                {/*    <div className="col">GraphQL response time: <span className="text-primary"><b>{graphqlPerformance}</b></span></div>*/}
                {/*</div>*/}
                <div className="row mt-5">

                    {showGraph
                        ? <div className="col" key={"1"}><GraphQL executionTime={graphqlExecutionTimeCallback} /></div>
                        : <JSONTree data={apiResponse}/>
                        // : <div className="col" key={"2"}>{apiResponse.map((item,i) => (<p key={i}> {item}</p>))}</div>
                    }
                </div>
            </div>

        </div>
    )
};

export default Main
