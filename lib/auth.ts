
import axios from "axios";
import { cookies } from "next/headers"


export const verifySession = async () => {
    
    try {
        const session = cookies().get('token')

        if (!session) {
            return null
        }

        const currentUser = await axios.get(`http://localhost:8000/api/auth/verify/${session.value}`)
        
        if (!currentUser) {
            return null
        }
        return currentUser.data
        
    } catch (error) {
        return null

    }

}
