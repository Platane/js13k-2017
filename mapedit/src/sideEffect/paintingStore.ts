import { hydratePaintings } from "../store/action"

const url =
    "https://platane.github.io/js13k-2017/image-crusher-ui/image-crush-result.json"

export const attachToStore = store => {
    fetch(url)
        .then(res => res.json())
        .then(x => store.dispatch(hydratePaintings(x)))
}
