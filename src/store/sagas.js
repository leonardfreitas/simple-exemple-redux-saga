import { delay } from 'redux-saga';
import { takeEvery, put, call, select } from 'redux-saga/effects';

// takeEvery pega todas as ações
// takeLatest pega a ultima ação

function apiGet() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {id: 1, text: 'fazer café'},
                {id: 2, text: 'fazer chá'},
                {id: 3, text: 'fazer bolo'},
            ]);
        }, 2000);
    });
}


function* getTodoList() {

    try {
        const response = yield call(apiGet);

        yield put({
            type: 'SUCCESS_TODO_LIST',
            payload: { data: response }
        });

    } catch (error) {
        yield put({type: 'FALURE_TODO_LIST'})
    }

}


export default function* root() {
    yield [
        takeEvery('REQUEST_TODO_LIST', getTodoList)
    ];
}