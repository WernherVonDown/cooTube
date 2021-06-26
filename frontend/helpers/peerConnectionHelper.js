const iceServers = [
    {
        url: 'stun:stun.l.google.com:19302'
    },
    {
        url: 'turn:78.46.107.230:3486',
        urls: ['turn:78.46.107.230:3486'],
        username: 'kurentoturn',
        credential: 'kurentoturnpassword'
    },
]

export default class PeerConnectionHelper {
    constructor() {
        this.myPC = new RTCPeerConnection({
            iceServers
        });

        this.iceCandidatesQueue = [];
        this.remoteDescription = null;

        this.subscribe();
    }

    subscribe = () => {
       // this.myPC.onicecandidate = this.handleICECandidateEvent;//this
        //this.myPC.onnegotiationneeded = this.handleNegotiationNeededEvent;
        this.myPC.onremovetrack = this.handleRemoveTrackEvent;
        this.myPC.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
        this.myPC.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
        this.myPC.onsignalingstatechange = this.handleSignalingStateChangeEvent;
        //this.myPC.ontrack = this.handleTrackEvent; //track
    }

    setIceCandidateHandler = (handler) => {
        this.myPC.onicecandidate = handler;
    }

    setOnTrackHandler = (handler) => {
        this.myPC.ontrack = handler;
    }

    setHandleNegotiationNeededEvent = (handler) => {
        // const offer = await this.myPC.createOffer();

    // If the connection hasn't yet achieved the "stable" state,
    // return to the caller. Another negotiationneeded event
    // will be fired when the state stabilizes.
    this.myPC.onnegotiationneeded = handler;
return ;
    if (this.myPC.signalingState != "stable") {
      console.log("     -- The connection isn't stable yet; postponing...")
      return false
    }

    // Establish the offer as the local peer's current
    // description.

    console.log("---> Setting local description to the offer");
    return this.createOffer()
    //await this.myPC.setLocalDescription(offer);
    }

    addStream = (stream) => {
        console.log('ADDDDD STREAM', stream)
        this.localStream = stream
        stream.getTracks().forEach(track => this.myPC.addTrack(track, stream));
    }

    createOffer = async () => {
        const offer = await this.myPC.createOffer();
        await this.myPC.setLocalDescription(offer);
        return this.myPC.localDescription;
    }

    setRemoteDescription = async (sdp) => {
        this.remoteDescription = new RTCSessionDescription(sdp);
        await this.myPC.setRemoteDescription(this.remoteDescription);
        await this.setCandidatesFromQueue()
    }

    setCandidatesFromQueue = async () => {
        await Promise.all(this.iceCandidatesQueue.map(this.handleNewICECandidate))
    }

    handleAnswer = async (sdp) => {
        //const desc = new RTCSessionDescription(sdp);
        // if (this.myPC.signalingState != "stable") {
        //     //log("  - But the signaling state isn't stable, so triggering rollback");
        
        //     // Set the local and remove descriptions for rollback; don't proceed
        //     // until both return.
        //     await Promise.all([
        //       this.myPC.setLocalDescription({type: "rollback"}),
        //       this.setRemoteDescription(sdp)
        //     ]);
        //     return this.myPC.localDescription;
        //   } 
       // await this.setRemoteDescription(sdp);
        await this.myPC.setLocalDescription(await this.myPC.createAnswer());
        console.log('HAHAH', this.iceCandidatesQueue)
        
        // if (!this.stream) {
        //     this.stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        // }
        // this.stream.getTracks().forEach(track => this.myPC.addTrack(track, this.stream));
        return this.myPC.localDescription;
    }

    handleNewICECandidate = async (candidate) => {
        const iceCandidate = new RTCIceCandidate(candidate);
        if (!this.remoteDescription) {this.iceCandidatesQueue.push(iceCandidate); return}
        console.log("*** Adding received ICE candidate: " + JSON.stringify(iceCandidate), 'aaa', candidate);
        await this.myPC.addIceCandidate(iceCandidate);
    }

    handleICECandidateEvent = (e) => {
        console.log("*** Outgoing ICE candidate: " + e.candidate.candidate);
        // if (e.candidate) {
        //     console.log("*** Outgoing ICE candidate: " + e.candidate.candidate);

        // //     sendToServer({
        // //         type: "new-ice-candidate",
        // //         target: targetUsername,
        // //         candidate: e.candidate
        // //     });
        //  }
        //console.log('handleICECandidateEvent', e);
    }

    handleTrackEvent = (e) => {
        console.log('handleTrackEvent', e);
    }

    handleNegotiationNeededEvent = (e) => {
        console.log('handleNegotiationNeededEvent', e);
    }

    handleRemoveTrackEvent = (e) => {
        console.log('handleRemoveTrackEvent', e);
    }

    handleICEConnectionStateChangeEvent = (e) => {
        console.log('handleICEConnectionStateChangeEvent', e);
    }

    handleICEGatheringStateChangeEvent = (e) => {
        console.log('handleICEGatheringStateChangeEvent', e);
    }

    handleSignalingStateChangeEvent = (e) => {
        console.log('handleSignalingStateChangeEvent', this.myPC && this.myPC.signalingState);
    }

}