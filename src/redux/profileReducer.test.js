import profileReducer, { addPost_actionCreator, deletePost } from "./profileReducer"
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

let initialState = {
    posts_Data: [
        { id: 1, counter: 0, message: 'Hi' },
        { id: 2, counter: 0, message: 'I`m here.' },
        { id: 3, counter: 0, message: 'Hey?' },
        { id: 4, counter: 0, message: 'Do you hear me?' },
        { id: 5, counter: 0, message: '...' },
        { id: 6, counter: 0, message: '...' },
        { id: 7, counter: 1, message: 'I`m waiting...' },
    ],
};

/* test('length of posts should be incremented', () => {
    //1. test data
    let action = addPost_actionCreator('test_post_text');
    //2. action
    let newState = profileReducer(initialState, action);
    //3. expectation
    expect(newState.posts_Data.length).toBe(8);
});

test('added post should be corrected', () => {
    let action = addPost_actionCreator('test_post_text');
    let newState = profileReducer(initialState, action);
    expect(newState.posts_Data[7].message).toBe('test_post_text');
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(initialState, action);
    expect(newState.posts_Data.length).toBe(6);
});

test('after deleting length of messages shouldn`t be changed if id is incorrect', () => {
    let action = deletePost(-6);
    let newState = profileReducer(initialState, action);
    expect(newState.posts_Data.length).toBe(7);
}); */