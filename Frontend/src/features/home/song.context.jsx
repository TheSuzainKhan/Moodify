import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const defaultSong = {
        "url": "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
        "posterUrl": "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg",
        "title": "Lady Singham",
        "mood": "happy",
    }

    const [ song, setSong ] = useState(defaultSong)
    const [ playlist, setPlaylist ] = useState([])
    const [ currentMood, setCurrentMood ] = useState("")

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState("")

    return (
        <SongContext.Provider
            value={{
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
            }}
        >
            {children}
        </SongContext.Provider>
    )

}
