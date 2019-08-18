import {
    namedAudioBackgrounds,
    audioBackgrounds, vGoodJob, vSetGo, alternateTempoAudioCollection } from '../shared/consts';
export const tempoAudioCollection = {
    default: {
        start: vSetGo,
        background: namedAudioBackgrounds['classic0'],
        beats: alternateTempoAudioCollection.oneTwo,
        end: vGoodJob,
    },
    oneTwo_wo_background_music: {
        start: vSetGo,
        background: null,
        beats: alternateTempoAudioCollection.oneTwo,
        end: vGoodJob,
    },
    oneTwo: {
        start: vSetGo,
        background: audioBackgrounds[1],
        beats: alternateTempoAudioCollection.oneTwo,
        end: vGoodJob,
    },
    upDown: {
        start: vSetGo,
        background: namedAudioBackgrounds["classic6"],
        beats: alternateTempoAudioCollection.upDown,
        end: vGoodJob,
    },
}