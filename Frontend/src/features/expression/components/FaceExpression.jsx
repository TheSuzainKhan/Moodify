
import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Preparing camera...");
    const [ isReady, setIsReady ] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const setup = async () => {
            try {
                await init({ landmarkerRef, videoRef, streamRef });
                if (isMounted) {
                    setIsReady(true);
                    setExpression("Ready to detect");
                }
            } catch (error) {
                console.error("Failed to initialize face detection", error);
                if (isMounted) {
                    setExpression("Camera unavailable");
                }
            }
        };

        setup();

        return () => {
            isMounted = false;
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const detectionResult = detect({ landmarkerRef, videoRef, setExpression })

        if (detectionResult?.status !== "recognized") {
            return
        }

        onClick(detectionResult.mood)
    }


    return (
        <div className="face-card">
            <div className="face-card__visual">
            <video
                ref={videoRef}
                className="face-card__video"
                playsInline
            />
            </div>
            <div className="face-card__content">
                <p className="face-card__eyebrow">Expression Scanner</p>
                <h2 className="face-card__title">Read your mood and build a matching queue</h2>
                <p className="face-card__description">
                    Look at the camera, hold your expression for a second, then detect.
                </p>
                <div className="face-card__footer">
                    <span className="face-card__status">{expression}</span>
                    <button
                        className="face-card__button"
                        onClick={handleClick}
                        disabled={!isReady}
                    >
                        {isReady ? "Detect expression" : "Starting camera..."}
                    </button>
                </div>
            </div>
        </div>
    );
}
