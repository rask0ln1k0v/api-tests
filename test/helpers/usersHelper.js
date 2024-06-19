import requestHelper from '../utils/requestHelper.js';

const userHelper = {
    getUsers: async () => {
        const response = await requestHelper.get(`/users`);
        return response;
    },
   
};

export default userHelper;
