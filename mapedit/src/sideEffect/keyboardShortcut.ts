import {
    undo,
    redo,
    cameraOverwriteOn,
    cameraOverwriteOff,
} from '../store/action'
import { selectIsDraging } from '../store/selector/drag'
import { selectIsCameraOverwrite } from '../store/selector/currentTool'

export const attachToStore = store => {
    const onkeydown = ({ target, which, ctrlKey }: MouseEvent) => {
        // ignore event fired from textearea
        if (['input', 'textarea'].includes(target.tagName.toLowerCase())) return

        // ignore when dragging something
        if (selectIsDraging(store.getState())) return

        if (ctrlKey && which == 90) store.dispatch(undo())
        else if (ctrlKey && which == 89) store.dispatch(redo())
        else if (which == 32) store.dispatch(cameraOverwriteOn())
    }

    const onkeyup = () => {
        if (selectIsCameraOverwrite(store.getState()))
            store.dispatch(cameraOverwriteOff())
    }

    window.addEventListener('keydown', onkeydown)
    window.addEventListener('keyup', onkeyup)
}
