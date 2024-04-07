// 1. сохранить код
// 2 перенаправить в мои снипеты

import { useSelector } from 'react-redux'
import routes from "../routes.js";

const useSaveButton = () => {
    const moveTo = () => {
        const username = useSelector((state) => state.user.userInfo.username)
        routes.profilePagePath(username)
    }
    const saveCode = ''

    return {
        moveTo,
        saveCode
    }
}

export default useSaveButton