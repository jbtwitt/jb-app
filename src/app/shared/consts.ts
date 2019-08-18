
let audioPath = "assets/audios";
export const audios = [
    new Audio("assets/audios/one.m4a"),
    new Audio("assets/audios/two.m4a"),
    new Audio("assets/audios/three.m4a"),
    new Audio("assets/audios/four.m4a"),
    new Audio("assets/audios/five.m4a"),
];
export const vSetGo = new Audio(`${audioPath}/setGo.m4a`);
export const vGoodJob = new Audio(`${audioPath}/goodjob.m4a`);
export const v1234 = new Audio(`${audioPath}/v1234.m4a`);

export const alternateTempoAudioCollection = {
    "oneTwo": [
        new Audio("assets/audios/one.m4a"),
        new Audio("assets/audios/two.m4a"),
    ],
    "upDown": [
        new Audio("assets/audios/up.m4a"),
        new Audio("assets/audios/down.m4a"),
    ]
}
export const audioBackgrounds = [
    new Audio(`${audioPath}/unlockcelebration.mp3`),
    new Audio(`${audioPath}/howlingabyss_champselect.mp3`),
    new Audio(`${audioPath}/butchersbridge_champselect.mp3`),
];
export const namedAudioBackgrounds = {
    classic0: new Audio(`${audioPath}/1698 Pachelbel , Canon in D.mp3`),
    classic1: new Audio(`${audioPath}/1731 Vivaldi , Flute Concerto in G minor 'La Notte', VI. Allegro.mp3`),
    classic2: new Audio(`${audioPath}/1778 Rondo Alla Turca, from Piano Sonata in A.mp3`),
    classic3: new Audio(`${audioPath}/1810 Beethoven- Fur Elise.mp3`),
    classic4: new Audio(`${audioPath}/1848 Schumann - The Merry Peasant.mp3`),
    classic5: new Audio(`${audioPath}/1858 J. Strauss II- Tritsch Tratsch Polka.mp3`),
    classic6: new Audio(`${audioPath}/1865 Brahms- Waltz.mp3`),
    classic7: new Audio(`${audioPath}/1896 R. Strauss - Also sprach Zarathustra - Fanfare.mp3`),
    classic8: new Audio(`${audioPath}/1900 Rimsky-Korsakov - Dance of the Bumble Bee.mp3`),
}
