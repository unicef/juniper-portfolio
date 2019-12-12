import { IResolvers } from 'apollo-server-express'
import { Database, Project } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const projectResolvers: IResolvers = {
    Project: {
        id: (project: Project): string => project._id.toString()
    },
    Query: {
        projects: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database })
        : Promise<Project[]> => {
            return await db.projects.find({}).toArray()
        }
    },
    Mutation: {
        addProject: () => {
            return 'Adding project'
        },
        editProject: () => {
            return 'Editing project'
        },
        deleteProject: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database }
        ): Promise<Project> => {
            const deleteRes = await db.projects.findOneAndDelete({
                _id: new ObjectId(id)
            })
            if(!deleteRes.value) {
                throw new Error('failed to delete result')
            }
            return deleteRes.value
        }
    }
}