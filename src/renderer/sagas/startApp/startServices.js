import { call, all, spawn, put } from 'redux-saga/effects'

import asyncTimeout from '~utils/asyncTimeout'

import { systemAppStartProceed } from '~actions/system'

import startAlbumsReciever from './startServices/startAblumsReciever'
import startAlbumsPublisher from './startServices/startAlbumsPublisher'
import startAlbumsSharingService from './startServices/startAlbumsSharingService'
import startDiscoverPageService from './startServices/startDiscoverPageService'
import startTracksCache from './startServices/startTracksCache'
import startNotificationsService from './startServices/startNotificationsService'
import startAlbumsCollectionInfo from './startServices/startAlbumsCollectionInfo'
import startNewReleaseChecker from './startServices/startNewReleaseChecker'

function * startServices (apis) {
  yield put(systemAppStartProceed(66))
  yield all([
    spawn(startAlbumsReciever, apis),
    spawn(startAlbumsPublisher, apis),
    spawn(startAlbumsSharingService, apis),
    spawn(startDiscoverPageService, apis),
    spawn(startTracksCache, apis),
    spawn(startAlbumsCollectionInfo, apis),
    spawn(startNotificationsService, apis),
    spawn(startNewReleaseChecker, apis)
  ])
  yield put(systemAppStartProceed(100))
  yield call(asyncTimeout, 100)
}

export default startServices