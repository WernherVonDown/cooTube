import styles from '../../styles/room.module.scss';
import { useState, useEffect, useRef, useContext } from 'react';
import { socket } from '../../socket';
import PeerConnectionHelper from '../../helpers/peerConnectionHelper';
import AuthContext from '../../stores/authContext';
import useForceUpdate from '../hooks/useForceUpdate';

const peerConnectionsStore = {};
const remoteStreamsStore = {}

const Video = ({ videoId, stream, muted , userName}) => {
    const videoRef = useRef();
    useEffect(() => {
        if (videoRef.current)
            videoRef.current.srcObject = stream;
    }, [])

    return (
        <div className='videoWrapper'>
            <video muted={muted} ref={videoRef} id={videoId} autoPlay />
            <div className='videoUserName'>{userName}</div>
        </div>
    )
    
}

const Main = ({ roomId, users }) => {
    const [localStream, setLocalStream] = useState(null);
    const localVideo = useRef();
    const { user: me } = useContext(AuthContext)
    const forceUpdate = useForceUpdate();
    console.log(users)
    const sendToServer = (data) => {
        console.log('send', data)
        socket.emit('videoChat', data)
    }
    const startCall = async (socketId) => {
        const pc = getPeerConnection(socketId);
        pc.addStream(localStream || await getLocalStream())

        const sdp = await pc.createOffer();

        const callData = {
            source: me.socketId,
            target: socketId,
            type: "video-offer",
            sdp
        }
        sendToServer(callData)
    }

    const answerCall = async ({ source, sdp }) => {
        const pc = getPeerConnection(source);
        pc.setRemoteDescription(sdp)
        pc.addStream(localStream || await getLocalStream())
        const sdpAnswer = await pc.handleAnswer(sdp);

        const answerData = {
            target: source,
            source: me.socketId,
            type: "video-answer",
            sdp: sdpAnswer
        }
        sendToServer(answerData);
    }

    const handleTrackEvent = (socktId, e) => {
        if (!e.streams) return;
        if (!remoteStreamsStore[socktId]) {
            remoteStreamsStore[socktId] = e.streams[0];
            forceUpdate()
        }
    }

    const handleVideoAnswerMsg = async (data) => {
        const { source, sdp } = data;
        const pc = getPeerConnection(source);
        await pc.setRemoteDescription(sdp);
    }

    const handleICECandidateEvent = (socketId, e) => {
        if (e.candidate) {
            sendToServer({
                type: "new-ice-candidate",
                source: me.socketId,
                target: socketId,
                candidate: e.candidate
            });
        }
    }

    const removePeerConnection = (socketId) => {
        delete peerConnectionsStore[socketId];
        delete remoteStreamsStore[socketId];
        forceUpdate()
    }

    const getPeerConnection = (socketId) => {
        if (peerConnectionsStore[socketId]) return peerConnectionsStore[socketId];
        peerConnectionsStore[socketId] = new PeerConnectionHelper();
        peerConnectionsStore[socketId].setIceCandidateHandler(handleICECandidateEvent.bind(this, socketId));
        peerConnectionsStore[socketId].setOnTrackHandler(handleTrackEvent.bind(this, socketId));
        if (localStream) {
            peerConnectionsStore[socketId].addStream(localStream)
        }
        return peerConnectionsStore[socketId];
    }

    const handleNewICECandidateMsg = async (data) => {
        const { source, candidate } = data;
        const pc = getPeerConnection(source);
        await pc.handleNewICECandidate(candidate);

    }

    const subscribe = () => {
        socket.on('videoChat', (msg) => {
            console.log('VIDEO_CHAT', msg)
            switch (msg.type) {
                case "video-offer":  // Invitation and offer to chat
                    answerCall(msg);
                    break;

                case "video-answer":  // Callee has answered our offer
                    handleVideoAnswerMsg(msg);
                    break;

                case "new-ice-candidate": // A new ICE candidate has been received
                    handleNewICECandidateMsg(msg);
                    break;

                // case "hang-up": // The other peer has hung up the call
                //     handleHangUpMsg(msg);
                //     break;
            }
        })

        socket.on('user:leave', socketId => {
            removePeerConnection(socketId);
        })

        socket.on('user:join', (data) => {
            const { socketId } = data;
            startCall(socketId);
        })
    }

    const getLocalStream = async () => {
        if (localStream) return;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
       // localVideo.current.srcObject = stream;
        setLocalStream(stream);
        return stream;
    }

    useEffect(() => {
        subscribe();
        getLocalStream()
        return () => {
            //   cleanup
        };
    }, []);


    const renderRemoteStreams = (socketId) => {
        const userName = users.find(u => u.socketId === socketId)?.userName || 'unkonwn';
        return <Video
            key={`video:${socketId}`}
            videoId={`remoteStream:${socketId}`}
            muted={true}
            userName={userName}
            stream={remoteStreamsStore[socketId]}
        />
    }

    return (
        <div>
            <div className="videosContainer">
                {localStream && <Video
                    videoId={`localStream`}
                    muted={true}
                    userName={`${me.userName} (you)`}
                    stream={localStream}
                />}
                {Object.keys(remoteStreamsStore).map(renderRemoteStreams)}
            </div>
        </div>
    )
    return (
        <div className={styles.test}><h1>{`Room ${roomId}, users: ${users.length}`}</h1></div>
    )
}

export default Main;