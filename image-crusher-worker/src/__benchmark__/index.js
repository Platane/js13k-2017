import { mutateHard } from 'common/genetic/mutation/hardMutation'
import { mutateSoft } from 'common/genetic/mutation/softMutation'
import * as PARAM from 'common/param'
import { addGene } from 'common/genetic/mutation/addGene'
import * as rTree from 'common/fastRImage/rImageTree'
import { getFitness as rGetFitness } from 'common/fastRImage/rImage/diff'
import { getFitness } from 'common/rImage/getFitness'
import { createBlank } from 'common/rImage/draw'
import { ADNtoRImage } from 'common/adn/ADNtoRImage'

const initialAdn = Array.from({ length: 5 }).reduce(
    (adn, _) => addGene(PARAM, adn),
    []
)

const N = 2000

const adns = Array.from({ length: N }).map(() => mutateHard(PARAM, initialAdn))

const target = Array.from({ length: PARAM.SIZE * PARAM.SIZE * 3 }).map(
    () => 128
)

{
    const start = Date.now()

    let rt = rTree.create(PARAM, initialAdn)

    adns.forEach(adn => {
        const rt_ = rTree.mutate(PARAM, initialAdn, adn, rt)

        const fitness = rGetFitness(target, rt_.rImage)
    })

    console.log(`${(Date.now() - start) / N} ms, rTree with mutation`)
}

{
    const start = Date.now()

    adns.forEach(adn => {
        const fitness = rGetFitness(
            target,
            rTree.create(PARAM, initialAdn).rImage
        )
    })

    console.log(`${(Date.now() - start) / N} ms, rTree, recreated on the fly`)
}

{
    const start = Date.now()

    const rImage = createBlank()

    adns.forEach(adn => {
        const fitness = getFitness(
            PARAM.SIZE,
            target,
            ADNtoRImage(PARAM, adn, rImage)
        )
    })

    console.log(`${(Date.now() - start) / N} ms, ADNtoRImage`)
}

{
    const start = Date.now()

    adns.forEach(adn => {
        const fitness = getFitness(PARAM.SIZE, target, ADNtoRImage(PARAM, adn))
    })

    console.log(`${(Date.now() - start) / N} ms, ADNtoRImage  with cache`)
}
