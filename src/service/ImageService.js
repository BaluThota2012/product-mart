import sendRequest from "../axios"

const IMAGE_API_URL = ""
const ImageService = () => {

    function uploadImage(data) {
        return sendRequest({METHOD:'POST', PATH:IMAGE_API_URL}, data)
    }
    return Object.freeze({
        uploadImage,
    })
}

export default ImageService;