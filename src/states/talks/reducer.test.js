import { describe, expect, it } from 'vitest';
import talksReducer from './reducer';

describe('talkReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UKNOWN' };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the talks when given by RECEIVE_TALKS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_TALKS',
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talks test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2024-01-14T07:21:00.000Z',
          },
          {
            id: 'talks-2',
            text: 'Talks test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2024-01-14T07:22:22.000Z',
          },
        ],
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual(action.payload.talks);
  });

  it('should return the talk with the new talk when given by ADD_TALK action', () => {
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talks test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2024-01-14T07:21:00.000Z',
      },
    ];

    const action = {
      type: 'ADD_TALK',
      payload: {
        talk: {
          id: 'talks-2',
          text: 'Talks test 2',
          user: 'user-2',
          replyTo: '',
          likes: [],
          createdAt: '2024-01-14T07:22:22.000Z',
        },
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual([action.payload.talk, ...initialState]);
  });

  it('should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action', () => {
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talks test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2024-01-14T07:21:00.000Z',
      },
    ];

    const action = {
      type: 'TOGGLE_LIKE_TALK',
      payload: {
        talkId: 'talk-1',
        userId: 'user-1',
      },
    };

    const nextState = talksReducer(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: [action.payload.userId],
      },
    ]);

    const nextState2 = talksReducer(nextState, action);

    expect(nextState2).toEqual(initialState);
  });
});
