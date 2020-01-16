import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { AddProject as AddProjectData, AddProjectVariables } from './__generated__/AddProject'
import { DeleteProject as DeleteProjectData, DeleteProjectVariables } from './__generated__/DeleteProject'
import { Projects as ProjectsData } from './__generated__/Projects'

import { ProjectListItem } from './ProjectListItem'

const PROJECTS = gql`
    query Projects {
        projects {
            id
            name
            bitcoinPublicAddress
            ethereumPublicAddress
            amountGranted
            objective
            image
        }
    }
`

const ADD_PROJECT=gql`
    mutation AddProject($name: String!, $bitcoinPublicAddress: String!, $ethereumPublicAddress: String!){
        addProject(name: $name, bitcoinPublicAddress: $bitcoinPublicAddress, ethereumPublicAddress: $ethereumPublicAddress) {
            id
            name
        }
    }
`

const DELETE_PROJECT=gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`

interface Props {
    title: string
}

export const Projects = ({ title } : Props) => {
    const [name, setName] = useState('')
    const [ethereumAddress, setEthereumAddress] = useState('')
    const [bitcoinAddress, setBitcoinAddress] = useState('')
    
    const { data, loading, error, refetch } = useQuery <ProjectsData>(PROJECTS)
    
    const [addProject] = useMutation<
        AddProjectData,
        AddProjectVariables
    >(ADD_PROJECT)

    const [deleteProject] = useMutation<
        DeleteProjectData,
        DeleteProjectVariables
    >(DELETE_PROJECT)

    const handleAddProject = () => {
        addProject({variables: {name, bitcoinPublicAddress: bitcoinAddress, ethereumPublicAddress: ethereumAddress}})
        refetch()
    }
    const handleDeleteProject = (id: string) => {
        deleteProject({variables: {id}})
        refetch()
    }
    const projects = data ? data.projects: null 
    const projectList = projects ? (
        <ul>
            {
                projects.map(project => {
                    return (
                        <li key = {project.id}>
                            {project.id} | {project.name} | {project.bitcoinPublicAddress} | {project.ethereumPublicAddress} | {project.objective} | {project.image} | {project.amountGranted}
                            <ProjectListItem
                                id={project.id}
                                refetch={refetch}
                            />
                            <button onClick={() => {handleDeleteProject(project.id)}}>Delete</button>
                        </li>
                    )
                })
            }
        </ul>
    ) : null
    return (
        <div>
            <h2>{title}</h2>
            <h3>Add a new project</h3>
            <form onSubmit={handleAddProject}>
                <label htmlFor="Name of Project">Name of Project</label>   
                <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" id="name" /> 
                <label htmlFor="Bitcoin Address of Project">Bitcoin Address of Project</label>   
                <input onChange={e => setBitcoinAddress(e.target.value)} value={bitcoinAddress} type="text" name="bitcoinAddress" id="bitcoinAddress" />
                <label htmlFor="Ethereum Address of Project">Ethereum Address of Project</label>
                <input onChange={e => setEthereumAddress(e.target.value)} value={ethereumAddress} type="text" name="ethereumAddress" id="ethereumAddress" />
                <input type="submit" value="Add new Project" />      
            </form>
            {
                loading ? 
                    <h2>Loading</h2>
                : error ?
                    <h2>Uh oh! Something went wrong - please try again later</h2>
                : (
                    <div>
                        <h3>List of Projects</h3>
                        {projectList}
                    </div>
                )
            }
        </div>
    )
}