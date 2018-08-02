import {
    undo,
    redo,
    cameraOverwriteOn,
    cameraOverwriteOff,
    setTool,
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
        else if (which == 67) store.dispatch(setTool('camera'))
        else if (which == 82) store.dispatch(setTool('rectwall'))
        else if (which == 80) store.dispatch(setTool('tracewall'))
        else if (which == 69) store.dispatch(setTool('erasewall'))
    }

    const onkeyup = () => {
        if (selectIsCameraOverwrite(store.getState()))
            store.dispatch(cameraOverwriteOff())
    }

    window.addEventListener('keydown', onkeydown)
    window.addEventListener('keyup', onkeyup)
}
