
import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";


export const useSong = () => {
    const context = useContext(SongContext)

    const {
        loading,
        setLoading,
        song,
        setSong,
        playlist,
        setPlaylist,
        currentMood,
        setCurrentMood,
        error,
        setError,
    } = context

    async function handleGetSong({ mood }) {
        if (!mood) return

        try {
            setLoading(true)
            setError("")
            const data = await getSong({ mood })
            const songs = data?.songs || []

            setCurrentMood(mood)
            setPlaylist(songs)
            setSong(songs[0] || null)

            if (!songs.length) {
                setError("No songs available for this mood yet.")
            }
        } catch (error) {
            setPlaylist([])
            setSong(null)
            setCurrentMood(mood)
            setError(
                error?.response?.data?.message || "Failed to fetch songs for this mood."
            )
        } finally {
            setLoading(false)
        }
    }

    function selectSong(nextSong) {
        setSong(nextSong)
        setError("")
    }

    return ({
        loading,
        song,
        playlist,
        currentMood,
        error,
        handleGetSong,
        selectSong,
    })

}
