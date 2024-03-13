import { AfterViewInit, Component,Input, OnInit} from '@angular/core';
import { AccountService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.services';
declare var JitsiMeetExternalAPI: any;


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, AfterViewInit{
  

  user:Users | null=null;
  userInfo:any
  domain: string = "meet.jit.si";
  room: any;
  options: any;
  api: any;
  userName:string="";
  isAudioMuted = false;
  isVideoMuted = false;
  @Input() RoomName:any;
  constructor( private route: ActivatedRoute, private router: Router,private account:AccountService,private userService:UsersService){
    this.user=this.account.userValue;
    console.log("user",this.user);
    
  }
  ngOnInit(): void {
   
    console.log(this.user);

    this.room=this.route.snapshot.params['roomName'];
    this.getData()
    

  }
  getData(){
    this.userService.GetUserByIdRole(this.user?.id,this.user?.role).subscribe(data=>
      {this.userInfo=data;
        if(this.user?.role=="admin")
        {this.userName="Administrateur"}
        else
        {this.userName=data.nom+" "+data.prenom}
      })
  }
  
  startSession(){
    this.options = {
      roomName:this.room,
      width: '100%',
      height:680,
      configOverwrite: { prejoinPageEnabled: false ,
        toolbarButtons: [
          'camera', 'microphone', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip','whiteboard', 'feedback', 'stats',
          'shortcuts', 'tileview', 'videobackgroundblur', 'download',
          'help', 'mute-everyone', 'e2ee'
        ],},
      interfaceConfigOverwrite: {
    
      },
      parentNode: document.querySelector('#jaas-container'),
      userInfo: {
          displayName: this.userName
      }
  }

  this.api = new JitsiMeetExternalAPI(this.domain, this.options);

  // Add event listeners
  this.api.on(JitsiMeetExternalAPI.PARTICIPANT_JOINED, () => {
      console.log('Participant joined');
  });
  this.api.on(JitsiMeetExternalAPI.PARTICIPANT_LEFT, () => {
      console.log('Participant left');
  });
  this.api.on(JitsiMeetExternalAPI.VIDEO_CONFERENCE_JOINED, () => {
      console.log('Video conference joined');
  });
  this.api.on(JitsiMeetExternalAPI.VIDEO_CONFERENCE_LEFT, () => {
      console.log('Video conference left');
  });
  this.api.on(JitsiMeetExternalAPI.AUDIO_MUTE_STATUS_CHANGED, () => {
      console.log('Audio mute status changed');
  });
  this.api.on(JitsiMeetExternalAPI.VIDEO_MUTE_STATUS_CHANGED, () => {
      console.log('Video mute status changed');
  });

  this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus
  });


  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.startSession();
    }, 100);
    
  }
  
  handleClose = () => {
    console.log("handleClose");
  }
  
  handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); 
    const data = await this.getParticipants();
  }
  
  handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); 
    const data = await this.getParticipants();
  }
  
  handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); 
  }
  
  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['/Meet']);
  }
  
  handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); 
  }
  
  handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); 
  }
  
  getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); 
        }, 500)
    });
  }
 
}

