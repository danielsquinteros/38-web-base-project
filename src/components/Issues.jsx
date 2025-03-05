import React from 'react'
import { useState, useEffect } from 'react'

const Issues = () => {
    const [issues, setIssues] = useState([]);
    const [issuesFilter, setIssuesFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');


    const changeInputSearch = (value) => {
        setSearch(value)
    }

    const fetchIssues = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('https://api.github.com/repos/facebook/react/issues');
            if(response.status !== 200){
                throw new Error('paso algo mal amigo :( ayuda!')
                //{message:'paso algo mal amigo :( ayuda!' }
            }
            const data = await response.json()
            setIssues(data);
        } catch (err) {
            console.log(err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchIssues()
    }, [])


  useEffect(() => {
    if(search === '' && search.length === 0){
        setIssuesFilter(issues)
    } else {
        const newIssues = issues.filter((issue) => {
            // Retorna los que cumplen la condición creando un nuevo arreglo
            if(issue.title.toLowerCase().includes(search.toLowerCase())){
                return issue;
            }
        })
        setIssuesFilter(newIssues)
    }
  }, [search, issues])


  if(isLoading === true){
    return <h1>Cargando...</h1>
  }

  if(error !== null){
    return <h1>ocurrio un error.. {error}</h1>
  }

  return (
    <>
        <h1>Issues</h1>
        <input type='text' onChange={() => {changeInputSearch(event.target.value)}}  />
        {
            issuesFilter.map((issue) => {
                return (
                    <div key={issue.id}>
                        <h3>{issue.title}</h3>
                        <p>{issue.id}</p>
                        <hr/>
                    </div>
                )
            })
        }
    </>
  )
}

export default Issues