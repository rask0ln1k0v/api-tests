import requestHelper from '../utils/requestHelper.js';

const postHelper = {
    createPost: async (post) => {
        const response = await requestHelper.post('/posts', post);
        return response;
    },
    getPost: async (postId) => {
        const response = await requestHelper.get(`/posts/${postId}`);
        return response;
    }, 
    getPosts: async () => {
        const response = await requestHelper.get(`/posts`);
        return response;
    },
    updatePost: async (postId, post) => {
        const response = await requestHelper.put(`/posts/${postId}`, post);
        return response;
    },
    deletePost: async (postId) => {
        const response = await requestHelper.delete(`/posts/${postId}`);
        return response;
    }
};

export default postHelper;
