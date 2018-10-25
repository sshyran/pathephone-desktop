
import { AnyAction, Reducer } from 'redux';

import { actions } from '~renderer/state/actions';
import { playlistEvents } from '~renderer/ui/Playlist';
import * as playlistSetters from './playlist/setters'
import { initialPlaylistState } from '~renderer/state/domains/playlist/initial';
import { IPlaylistState } from '~renderer/state/domains/playlist/types';

export const playlistReducer: Reducer<IPlaylistState> = (
  (state: IPlaylistState = initialPlaylistState, action: AnyAction): IPlaylistState => {
    const { type, payload } = action;
    switch (type) {

      case actions.systemPlayedTracksRecieved.toString():
        return playlistSetters.replaceTracks(state, payload);

      case actions.systemQueuedTracksRecieved.toString():
        return playlistSetters.addTracks(state, payload);

      case actions.uiNextTrackPlayed.toString():
      case actions.systemAudioEnded.toString():
        return playlistSetters.playNextTrack(state);

      case actions.uiPreviousTrackPlayed.toString():
        return playlistSetters.playPreviousTrack(state);

      case playlistEvents.uiPlaylistTrackRemoved.toString():
        return playlistSetters.removeTrack(state, payload);

      case playlistEvents.uiPlaylistTrackPlayed.toString():
        return playlistSetters.playTrack(state, payload);

      case actions.uiRepeatToggled.toString():
        return playlistSetters.toggleRepeat(state);

      case actions.uiShuffleToggled.toString():
        return playlistSetters.toggleShuffle(state);

      case playlistEvents.uiPlaylistCleared.toString():
        return playlistSetters.clearPlaylist(state);

      default:
        return state;
    }
  }
);