import { config } from '../config'
import connectDataStore from '@google-cloud/datastore'
import { parseImage, formatImage } from '../util/dataStore/parse'

export const prune = (ancestorTree, max_children) => ({
    ...ancestorTree,

    children: ancestorTree.children
        .slice()
        .sort((a, b) => (a.fitness < b.fitness ? -1 : 1))
        .slice(0, max_children)
        .map(x => prune(x, max_children)),
})

export const run = async () => {
    const datastore = connectDataStore({
        projectId: config.googleCloudPlatform.project_id,
        credentials: config.googleCloudPlatform,
    })

    const query = datastore.createQuery('image')

    const [images, _] = await datastore.runQuery(query)

    await datastore.save(
        images.map(i => {
            const data = parseImage(i)
            const key = i[datastore.KEY]

            return {
                method: 'update',
                key,
                excludeFromIndexes: ['target', 'PARAM', 'ancestorTree'],
                data: formatImage({
                    ...data,
                    ancestorTree: prune(data.ancestorTree, 5),
                }),
            }
        })
    )
}
