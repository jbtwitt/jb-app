import { audioBackgrounds, vGoodJob, vSetGo, alternateTempoAudioCollection } from '../shared/consts';
export const alternateTempoCollection = {
    fast: {
        tempo: 1000,
        goBeats: 2,
        stopBeats: 2,
        repeat: 2,
    },
    normal: {
        tempo: 1000,
        goBeats: 4,
        stopBeats: 3,
        repeat: 10,
    },
    slow: {
        tempo: 1000,
        goBeats: 8,
        stopBeats: 8,
        repeat: 10,
    },
}
export const tempoAudioCollection = {
    default: {
        start: vSetGo,
        background: audioBackgrounds[0],
        beats: alternateTempoAudioCollection.oneTwo,
        end: vGoodJob,
    }
}