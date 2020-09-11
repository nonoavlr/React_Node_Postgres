import React, { useState, useEffect } from 'react';
import './home.css';

export default function Home(){
    const [ result, setResult ] = useState();
    const [ query, setQuery ] = useState({query : undefined});
    const [ flexQuery, setFlex] = useState();

    const fetchQuery = ({query}) => {
        console.log(JSON.stringify(query));
        fetch('/query', {
            headers : {
                'Content-Type': 'application/json'
            },
            method : 'post',
            type : 'application/json',
            body : JSON.stringify(query)
        })
        .then(res => res.json())
        .then(res => { console.log(res); return res; })
        .then(res => setResult(res))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery({ query : flexQuery });
    };

    useEffect(
        () => fetchQuery({query}), [query]
    );

    const renderTable = (result) => {
        if(Object.keys(result).length >= 1){
            return(
                <div className='query-table'>
                    <table>
                        <thead>
                            <tr>
                                {   
                                    result.results.fields.map((item, index) => {
                                        return(
                                            <th key={index}>{item.name}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result.results.rows.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            {
                                                Object.values(item).map((i, d) => {
                                                    return(
                                                        <td key={d}> {i} </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    };

    return(
        <div id="page">
            <div className="card-content">
                <h1>PgAdmin | Node.js</h1>
        
                <form onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label>Your Query</label>
                        <input type='text' onChange={e => setFlex(e.target.value) }/>
                    </div>
                    <button type="submit" className="btn-query">Enviar</button>
                </form>
                {
                    result &&
                    <div>
                        {renderTable(result)}
                    </div>   
                }
            </div>
        </div>
    )
}