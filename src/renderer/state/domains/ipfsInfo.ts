import { AnyAction, Reducer } from 'redux';

import { actions } from '~renderer/state/actions';
import { IIpfsBandwidthStat, IIpfsRepoStat } from '~renderer/types/api';

export interface IIpfsInfoState {
  isOffline: boolean;
  gateway: null | string;
  apiEndpoint: null | string;
  peersCount: null | number;
  metabinPeersCount: null | number;
  repoStat: null | IIpfsRepoStat;
  bandwidthStat: null | IIpfsBandwidthStat;
}

const initialState: IIpfsInfoState = {
  isOffline: false,
  gateway: null,
  apiEndpoint: null,
  peersCount: null,
  metabinPeersCount: null,
  repoStat: null,
  bandwidthStat: null
};

export const ipfsInfoReducer: Reducer<IIpfsInfoState> = (
  state: IIpfsInfoState = initialState, action: AnyAction
): IIpfsInfoState => {
  const { type, payload } = action;
  switch (type) {
    case actions.systemIpfsInfoRecieved.toString():
      return {
        ...state,
        ...payload.ipfsInfo,
        isOffline: payload.isOffline
      }
    case actions.systemIpfsStatsRecieved.toString():
      return {
        ...state,
        ...payload
      };
    case actions.systemMetabinPeersRecieved.toString():
    return {
      ...state,
      metabinPeersCount: payload
    }
    default:
      return state;
  }
};