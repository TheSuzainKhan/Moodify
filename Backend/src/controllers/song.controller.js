const songModel = require("../models/song.model")
const id3 = require("node-id3")

const MOOD_SEARCH_TERMS = {
    happy: [
        "happy pop hits english",
        "feel good english songs",
        "upbeat dance pop english",
    ],
    sad: [
        "sad english songs",
        "heartbreak pop ballads english",
        "emotional acoustic english",
    ],
    surprised: [
        "energetic english pop songs",
        "epic electronic english",
        "high energy english hits",
    ],
}

function normalizeRemoteSong(track, mood) {
    if (!track.previewUrl) return null

    return {
        _id: `itunes-${track.trackId}`,
        title: track.trackName,
        url: track.previewUrl,
        posterUrl: track.artworkUrl100?.replace("100x100", "600x600") || track.artworkUrl100,
        mood,
        artist: track.artistName,
        album: track.collectionName,
        source: "itunes",
        externalUrl: track.trackViewUrl,
    }
}

async function searchItunesSongs({ term, mood, limit = 8 }) {
    const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=${limit}&country=US`
    )

    if (!response.ok) {
        throw new Error(`iTunes search failed with status ${response.status}`)
    }

    const data = await response.json()

    return (data.results || [])
        .map((track) => normalizeRemoteSong(track, mood))
        .filter(Boolean)
}

async function buildRemotePlaylist(mood) {
    const terms = MOOD_SEARCH_TERMS[mood] || [ `${mood} songs` ]
    const seen = new Set()
    const playlist = []

    for (const term of terms) {
        const songs = await searchItunesSongs({ term, mood })

        for (const song of songs) {
            if (seen.has(song.url)) continue
            seen.add(song.url)
            playlist.push(song)
        }

        if (playlist.length >= 12) {
            break
        }
    }

    return playlist.slice(0, 12)
}

async function uploadSong(req, res) {
    const storageService = require("../services/storage.service")

    const songBuffer = req.file.buffer
    const { mood } = req.body

    const tags = id3.read(songBuffer)

    const [ songFile, posterFile ] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })

}

async function getSong(req, res) {

    const { mood } = req.query

    const localSongs = await songModel.find({
        mood,
    })
    .sort({ title: 1 })

    let songs = localSongs

    if (songs.length < 6) {
        try {
            const remoteSongs = await buildRemotePlaylist(mood)

            if (localSongs.length) {
                const localUrls = new Set(localSongs.map((song) => song.url))
                songs = [
                    ...localSongs,
                    ...remoteSongs.filter((song) => !localUrls.has(song.url))
                ]
            } else {
                songs = remoteSongs
            }
        } catch (error) {
            console.error("Failed to build remote playlist", error.message)
        }
    }

    if (!songs.length) {
        return res.status(404).json({
            message: "No songs found for this mood.",
            songs: [],
            song: null,
        })
    }

    res.status(200).json({
        message: "songs fetched successfully.",
        song: songs[0],
        songs: songs.slice(0, 12),
    })

}


module.exports = { uploadSong, getSong }
