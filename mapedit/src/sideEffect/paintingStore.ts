import { hydratePaintings } from "../store/action"

const url_dynamic = "https://us-central1-imagedot-179509.cloudfunctions.net/get"
const url_fast =
    "https://storage.googleapis.com/platane-imagedot-result/res.json"

export const attachToStore = store => {
    fetch(url_fast)
        .then(res => res.json())
        .then(x => store.dispatch(hydratePaintings(x)))
}
