import axios from "axios";

const validateToken = async(req) => {
    const accessToken = req.body.access_token;
    const provider = req.body.provider;
    if(!provider || !accessToken) {
        return false
    }
    try {
        switch (provider) {
            case 'facebook':
                const page_id = req.body.page_id
                const page_access_token = req.body.page_access_token
                const response = await axios.get(`https://graph.facebook.com/me`, {
                    params: {
                        fields: 'name, email, birthday, picture',
                        access_token : accessToken
                    }
                });
                const profile = response.data;
                req.user = profile;
                const pageResponse = await axios.get(`https://graph.facebook.com/${page_id}`, {
                    params: {
                        fields:'name, description, category_list, picture',
                        access_token: page_access_token
                    }
                })
                req.page = pageResponse.data;
                return req
                break
            default:
                return false
        }
    } catch (error) {
        console.error('Error fetching Facebook Profile:', error.response);
        return false
    }
}

export { validateToken }