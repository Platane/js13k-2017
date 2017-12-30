import { h } from 'preact'
import { FloatingRes } from '../FloatingRes'
import { AncestorTree } from '../AncestorTree'
import { BestImages } from '../BestImages'
import { List } from '../List'
import { Worker } from '../Worker'
import withState from './hoc.state'
import style from './style.css'

const App_ = ({
    images,
    selectedImage,
    selectedAdn,
    onSelectImage,
    onSelectAdn,
}) => (
    <div>
        <List images={images} onSelectImage={onSelectImage} />

        {selectedImage && (
            <AncestorTree
                param={selectedImage.PARAM}
                ancestorTree={selectedImage.ancestorTree}
                onSelectAdn={onSelectAdn}
            />
        )}
        {selectedImage && (
            <BestImages image={selectedImage} n={8} onSelectAdn={onSelectAdn} />
        )}

        {selectedAdn && (
            <FloatingRes {...selectedAdn} close={() => onSelectAdn()} />
        )}

        <div className={style.footer}>
            <Worker />
        </div>
    </div>
)

export const App = withState(App_)
