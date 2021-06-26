import styles from '../../styles/room.module.scss';
import { useState, useEffect, useRef, useContext } from 'react';
import { socket } from '../../socket';
import PeerConnectionHelper from '../../helpers/peerConnectionHelper';
import AuthContext from '../../stores/authContext';

const peerConnectionsStore = {}

const Main = ({roomId, users}) => {
   //const [users, setUsers] = useState([]);
    const [localStream, setLocalStream] = useState(null);
    const localVideo = useRef();
    const { user: me } = useContext(AuthContext)
    console.log(users)


    const sendToServer = (data) => {
        console.log('send', data)
        socket.emit('videoChat', data)
    }
    const startCall = async (socketId) => {
        const pc = getPeerConnection(socketId);
        await getLocalStream()
        const sdp = await pc.createOffer();
     
        const callData = {
            source: me.socketId,
            target: socketId,
            type: "video-offer",
            sdp
          }
          sendToServer(callData)
    }

    const answerCall = async ({source, sdp}) => {
        const pc = getPeerConnection(source);
        pc.setRemoteDescription(sdp)
        await getLocalStream()
        const sdpAnswer = await pc.handleAnswer(sdp);
        
        const answerData = {
            target: source,
            source: me.socketId,
            type: "video-answer",
            sdp: sdpAnswer
          }
          sendToServer(answerData);
    }

    const handleTrackEvent = (socektId, e) => {
        console.log('handleTrackEvent', e);
    }

    const handleVideoAnswerMsg = async (data) => {
        const {source, sdp} = data;
        const pc = getPeerConnection(source);
        console.log("HANDLE", pc, source, sdp)
        await pc.setRemoteDescription(sdp);
      //  await getLocalStream()
    }

    const handleICECandidateEvent = (socketId, e) => {
        if (e.candidate) {
            console.log("*** Outgoing ICE candidate: " + e.candidate.candidate);

            sendToServer({
                type: "new-ice-candidate",
                source: me.socketId,
                target: socketId,
                candidate: e.candidate
            });
         }
        console.log('handleICECandidateEvent', e);
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
        const {source, candidate} = data;
        const pc = getPeerConnection(source);
        await pc.handleNewICECandidate(candidate);

    }

    const subscribe = () => {

        socket.on('videoChat', (msg) => {
            console.log('VIDEO_CHAT', msg)
            switch(msg.type) {
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

        socket.on('user:join', (data) => {
           console.log('JOINNN', data)
           const { socketId } = data;
           //const pc = getPeerConnection(socketId);
           startCall(socketId);
        })
    }
    

    const handleNeg = (socketId) => {
        console.log('HANDLE NEG')
        const pc = getPeerConnection(socketId)
        if (pc.myPC.signalingState != "stable") {
            console.log("     -- The connection isn't stable yet; postponing...")
            return false
          }
      
          // Establish the offer as the local peer's current
          // description.
      
          console.log("---> Setting local description to the offer");
          return startCall()
    }

    const getLocalStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        localVideo.current.srcObject = stream;
        setLocalStream(stream);
        Object.keys(peerConnectionsStore).map(key => peerConnectionsStore[key].addStream(stream))

    }

    useEffect(() => {
        subscribe();
        //sgetLocalStream()
        return () => {
         //   cleanup
        };
    }, []);




    return (
        <div>
            <div>
                <video autoPlay
                    id='localVideo'
                    muted 
                    ref={localVideo}
                />
            </div>
        </div>
    )
    return (
        <div className={styles.test}><h1>{`Room ${roomId}, users: ${users.length}`}</h1></div>
    )
}

export default Main;