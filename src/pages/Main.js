//@src/components/Main.js

import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import {Accordion} from "react-bootstrap";
import Collapsible from 'react-collapsible';
import {MdClose, MdInfoOutline} from "react-icons/md";
import { SiApollographql } from "react-icons/si";
import axios from "axios";

import "./Main.css"

import metadata from "../utils/metadata.json"
import Header from "../layout/Header";
import Response from "../components/Response";
import Query from "../components/Query";
import Footer from "../layout/Footer";

const Main = () => {
    const [apiSteps, setApiSteps] = useState([])

    // Endpoints
    const restUri = "https://swapi.dev/api/people/1"
    const graphqlUri = "https://swapi-graphql.netlify.app/.netlify/functions/index"

// GraphQL Query to Try
const graphQuery = `
query Person { 
    person(personID: "1") {
        filmConnection {
            films { 
                planetConnection {
                    planets {
                        name
                        climates
                        population
                    }
                }
            }
        }
    }
}
`

    // Update steps state
    const updateSteps = (step) => {
        setApiSteps(apiSteps => [...apiSteps, step])
    }

    // Function to fetch data using REST
    const fetchDataRest = async (url) => {
        const res = await axios({
            method: "GET",
            url: url
        });
         return await res?.data;
    }

    // Function to fetch data using GraphQL
    const fetchDataGraphql = async (url, query) => {
        const headers = {
            "content-type": "application/json"
        };
        const res = await axios({
            method: "POST",
            headers: headers,
            url: url,
            data: query
        });
        return await res?.data;
    }

    // Reset the step state
    const resetAll = () => {
        setApiSteps([])
    }

    // Handler for when the GraphQL button is clicked
    const onClickGraphQLHandler = async () => {
        resetAll()
        const method = "POST"
        const type = "GraphQL"
        const graphQlQuery = {
            "operation": "Person",
            "query": `query { person(personID: 1) {filmConnection {films {planetConnection {planets {name, population, climates}}}}}}`
        }

        const startTime = performance.now()
        const data = await fetchDataGraphql(graphqlUri, graphQlQuery)
        const endTime = performance.now()
        updateSteps({
            endpoint: graphqlUri,
            type: type,
            method: method,
            execution: `${endTime - startTime} milliseconds`,
            tracking: "N/A",
            data: data
        })

    }

    // Handler for when the REST button is clicked
    const onClickRestHandler = async () => {
        resetAll()
        const method = "GET"
        const type = "REST"
        const startTime = performance.now()
        const data = await fetchDataRest(restUri)
        const endTime = performance.now()

        // Tracking variables
        let name = ""
        let filmTitle = ""

        updateSteps({
            endpoint: restUri,
            type: type,
            method: method,
            execution: `${endTime - startTime} milliseconds`,
            tracking: {
                level: 1,
                person: data.name
            },
            object: "person",
            parent: "root",
            data: data.films
        })

        name = data.name

        for (const uri of data.films) {
            const startTime = performance.now()
            const data = await fetchDataRest(uri)
            const endTime = performance.now()
            updateSteps({
                endpoint: uri,
                type: type,
                method: method,
                execution: `${endTime - startTime} milliseconds`,
                tracking: {
                    level: 2,
                    person: name,
                    film: data.title
                },
                object: "film",
                parent: name,
                data: data.planets
            })

            filmTitle = data.title

            for (const uri of data.planets) {
                const startTime = performance.now()
                const data = await fetchDataRest(uri)
                const endTime = performance.now()
                updateSteps({
                    endpoint: uri,
                    type: type,
                    method: method,
                    execution: `${endTime - startTime} milliseconds`,
                    tracking: {
                        level: 3,
                        person: name,
                        film: filmTitle,
                        planet: data.name
                    },
                    object: "planet",
                    parent: filmTitle,
                    data: [{
                        planetName: data.name,
                        planetPopulation: data.population,
                        planetClimate: data.climate
                    }]})
            }
        }
    }


    // Render
    return (
        <div className="container-main">
            <nav><Header /></nav>
            <div id="sidebar">
                <div className="action_section ms-1 me-1">
                    <Accordion flush defaultActiveKey="0" alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <div className="sidebar-header">
                                <Accordion.Header>Start Here</Accordion.Header>
                            </div>

                            <Accordion.Body>
                                <div className="p-4">
                                    I built this React App to make it easier to demonstrate some differences between REST and GraphQL when fetching data from an API.
                                </div>
                                <div className="">
                                    I'm using the following public endpoints:
                                    <a
                                        href="https://swapi.dev/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        REST
                                    </a>

                                    <a
                                        href="https://studio.apollographql.com/public/star-wars-swapi/home?variant=current"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GraphQL
                                    </a>
                                </div>
                                <div className="">
                                    The use case is simple. We want to fetch the following information where the character is <b>Luke Skywalker</b>:
                                    - All the movies where Luke Skywalker participated
                                    - For each of those movies, we want to know all the planets
                                    - And finaly, for each of those planets, we want to fetch its name, population and climate
                                </div>
                                <div className="mt-4">You can download this code from my GitHub repository: <a href="https://github.com/alancota/simplifying-graphql" className="">simplifying-graphql</a></div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>REST</Accordion.Header>
                            <Accordion.Body>
                                <div className="p-4">
                                    Click on the button below to start the recursive REST API calls.
                                </div>
                                <div className="mt-2 mb-2"><Button size="md" className="action-buttons shadowit" onClick={onClickRestHandler}>Call API using REST</Button></div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>GraphQL</Accordion.Header>
                            <Accordion.Body>
                                <div className="trigger">
                                    <Collapsible
                                        transitionTime={400}
                                        trigger={<MdInfoOutline data-bs-toggle="tooltip" data-bs-placement="top" title="Click to see more about the query"/>}
                                        easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}
                                        triggerWhenOpen={<MdClose data-bs-toggle="tooltip" data-bs-placement="top" title="Close"/>}
                                    >
                                        <div className="p-2 mt-2">
                                            This is the GraphQL query that I'm using:
                                            <div className="text-start shadowit mt-3">
                                                <Query
                                                    code={graphQuery}
                                                    language="graphql"
                                                    showLineNumbers={false}
                                                />
                                            </div>
                                            <div className="p-0 mt-3">
                                                <a
                                                    href="https://studio.apollographql.com/public/star-wars-swapi/explorer?variant=current"
                                                    target="_blank"
                                                    className="btn m-0 p-0 mb-1"
                                                    rel="noreferrer"
                                                >
                                                    <SiApollographql
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title="Launch Apollo Studio" />
                                                </a>
                                            </div>


                                        </div>
                                    </Collapsible>
                                </div>
                                <div className="mt-2">
                                    Click on the button below to fetch the information using GraphQL.
                                </div>
                                <div className="mt-4">
                                    <Button size="md" variant="warning" className="action-buttons shadowit" onClick={onClickGraphQLHandler}>Call API using GraphQL</Button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>

            {/* Present the Response component */}
            <div className="response p-1">
                <Response data={apiSteps}/>
            </div>

            {/*Footer*/}
            <div className="footer justify-content-center p-1">
                <Footer />
            </div>
        </div>
    )
};

export default Main
