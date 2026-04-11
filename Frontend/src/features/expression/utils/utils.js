import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";


export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
    if (!landmarkerRef.current || !videoRef.current) {
        return { status: "not-ready" };
    }

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (!results.faceBlendshapes?.length) {
        setExpression("No face detected");
        return { status: "no-face" };
    }

    const blendshapes = results.faceBlendshapes[ 0 ].categories;

    const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    let currentExpression = null;

    if (smileLeft > 0.5 && smileRight > 0.5) {
        currentExpression = "happy";
    } else if (jawOpen > 0.2 && browUp > 0.2) {
        currentExpression = "surprised";
    } else if (frownLeft > 0.02 && frownRight > 0.02) {
        currentExpression = "sad";
    }

    if (!currentExpression) {
        setExpression("Expression not recognized");
        return { status: "unrecognized" };
    }

    setExpression(currentExpression);
    return { status: "recognized", mood: currentExpression };
};
