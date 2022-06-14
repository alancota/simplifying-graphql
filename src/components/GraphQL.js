//@src/components/GraphQL.js

import React from 'react'
import {
    useQuery,
    gql
} from "@apollo/client";
import { JSONTree } from 'react-json-tree';


const STARWARS_QUERY = gql`
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
`;

const GraphQl = (props) => {
    console.time('Fetching using GraphQL')
    const { loading, error, data } = useQuery(STARWARS_QUERY);
    var endTime = performance.now()
    console.timeEnd('Fetching using GraphQL')
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {/*{JSON.stringify(data.person.filmConnection.films)}*/}
            <JSONTree data={data.person.filmConnection.films}/>
        </div>
    )
};

export default GraphQl
