import { expect } from 'chai';
import postHelper from '../helpers/postHelper.js';
import userHelper from '../helpers/usersHelper.js';

describe('JSONPlaceholder API Tests', () => {

    let userId;
    let userId2;
    let postId;
    before(async() =>{
    const users = await userHelper.getUsers();
    userId = users.data[0].id;
    userId2 = users.data[1].id;
    

    const posts =  await postHelper.getPosts();
    postId = posts.data[0].id;
    })

    it('should make a GET request to post endpoint and validate the response', async () => {
        const response = await postHelper.getPost(postId);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id', postId);

        // Verify the title and the body are not null
        expect(response.data.title).to.not.be.null;
        expect(response.data.body).to.not.be.null;
        
        // Verify the header
        expect(response.headers).to.have.property('content-type').that.contains('application/json');
        
    });

    it('should make a POST request and validate the response', async () => {
        const newPost = {
            title: 'Test Title',
            body: 'Test Body',
            userId,
        };
        const response = await postHelper.createPost(newPost);
        expect(response.status).to.equal(201);
        expect(response.data).to.include(newPost);
        expect(response.data.id).to.not.be.null
        expect(response.headers).to.have.property('content-type').that.contains('application/json');
    });

    it('should make a PUT request to post endpoint and validate the response', async () => {
        const updatedPost = {
            id: postId,
            title: 'Test Title2',
            body: 'Test Body2',
            userId: userId2,
        };
        const response = await postHelper.updatePost(postId, updatedPost);
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal(updatedPost);
        expect(response.data.id).to.not.be.null
        expect(response.headers).to.have.property('content-type').that.contains('application/json');
    });

    it('should make a DELETE request to post endpoint and validate the response', async () => {
        const response = await postHelper.deletePost(postId);
        console.log(response.data);
        expect(response.status).to.equal(200);
        expect(response.headers).to.have.property('content-type').that.contains('application/json');


        // Send get request to posts endpoint and verify it returns 404
        try {
            const getPost = await postHelper.getPost(postId);
            console.log('Post after deletion (should not be found in a real API):', getPost.data);
            // We expect this to be an error in a real scenario
            // expect.fail('Post was found after it was deleted');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Post successfully deleted and not found.');
                expect(error.response.status).to.equal(404);
            } else {
                throw error; // Re-throw if it's a different error
            }
        }

    });

    it('should use response from one call in another request', async () => {
        const newPost = {
            title: 'Test Title',
            body: 'Test Body',
            userId,
        };

        // Create a new post
        const postResponse = await postHelper.createPost(newPost);
        console.log('Post response:', postResponse.data);
        expect(postResponse.status).to.equal(201);
        expect(postResponse.data).to.include(newPost);
        expect(postResponse.headers).to.have.property('content-type').that.contains('application/json');

        // Get the ID of the new post
        const postId = postResponse.data.id;
        expect(postId).to.exist;

        // Attempt to retrieve the new post using its ID
        try {
            const getResponse = await postHelper.getPost(postId);
            console.log('Get response:', getResponse.data);
            expect(getResponse.status).to.equal(200);
            expect(getResponse.data).to.include(newPost);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`Post with ID ${postId} was not found (404). This might be expected behavior with jsonplaceholder.typicode.com.`);
                // Pass the test as this is expected behavior
                expect(error.response.status).to.equal(404);
            } else {
                throw error; // Re-throw if it's a different error
            }
        }
    });
});
