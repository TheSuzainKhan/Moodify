import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import './home.scss'

const Home = () => {
    const { handleGetSong, playlist, loading, currentMood, selectSong, song, error } = useSong()
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const hasPlaylist = playlist.length > 0

    async function onLogout() {
        await handleLogout()
        navigate('/login')
    }

    return (
        <div className="home">
            <header className="home__nav">
                <div className="home__nav-main">
                    <div className="home__brand">Moodify</div>
                    <div className="home__nav-copy">Read your face. Pick your soundtrack.</div>
                </div>
                <div className="home__nav-actions">
                    {user ? (
                        <>
                            <span className="home__nav-user">{user.username}</span>
                            <button className="home__nav-link home__nav-link--primary" onClick={onLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="home__nav-link" to="/login">Login</Link>
                            <Link className="home__nav-link home__nav-link--primary" to="/register">Sign up</Link>
                        </>
                    )}
                </div>
            </header>

            <main className="home__content">
                <section className="home__hero">
                    <div className="home__intro">
                        <p className="home__eyebrow">Emotion-first listening</p>
                        <h1 className="home__headline">Detect your expression and get a playlist that fits it.</h1>
                        <p className="home__subtext">
                            Moodify turns your current expression into a playable selection of tracks.
                            Detect once, browse the queue, and choose the song you want.
                        </p>
                    </div>

                    <FaceExpression
                        onClick={(expression) => { handleGetSong({ mood: expression }) }}
                    />
                </section>

                <section className="home__results">
                    <div className="home__results-head">
                        <div>
                            <p className="home__eyebrow">Playlist</p>
                            <h2 className="home__section-title">
                                {currentMood ? `${currentMood} tracks` : "Mood picks"}
                            </h2>
                        </div>
                        {loading && <span className="home__badge">Loading...</span>}
                    </div>

                    {error && <div className="home__message home__message--error">{error}</div>}

                    {!error && !hasPlaylist && !loading && (
                        <div className="home__message">
                            Detect an expression to fetch a matching playlist.
                        </div>
                    )}

                    {hasPlaylist && (
                        <div className="home__playlist">
                            {playlist.map((item, index) => (
                                <button
                                    key={item._id || `${item.title}-${index}`}
                                    className={`home__song-card ${song?.url === item.url ? 'is-active' : ''}`}
                                    onClick={() => selectSong(item)}
                                >
                                    <img
                                        className="home__song-poster"
                                        src={item.posterUrl}
                                        alt={item.title}
                                    />
                                    <div className="home__song-meta">
                                        <span className="home__song-index">{String(index + 1).padStart(2, '0')}</span>
                                        <h3>{item.title}</h3>
                                        <p>{item.mood}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Player />
        </div>
    )
}

export default Home
