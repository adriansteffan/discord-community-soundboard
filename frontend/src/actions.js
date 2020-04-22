import config from './copied_config.js';

export const SET_AUTHTOKEN = 'SET_AUTHTOKEN';
export const FETCH_BACKEND_PAYLOAD = 'FETCH_BACKEND_PAYLOAD';
export const SET_CURRENT_GUILD = 'SET_CURRENT_GUILD';
export const UPDATE_PAYLOAD = 'UPDATE_PAYLOAD';
export const CONTROL_PLAYBACK = 'UPDATE_PAYLOAD';
export const PLAY_SOUNDCLIP = 'PLAY_SOUNDCLIP';
export const CHANGE_TAB = 'CHANGE_TAB';
export const UPLOAD_CLIP = 'UPLOAD_CLIP';



export const fetchBackendPayload = () => {
    return (dispatch, getState) => {
        
        const state = getState();
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            console.log(xhr.response);

            if(xhr.status != 200){
                dispatch(setAuthToken(null, true));
                return;
            }
            const payload = JSON.parse(xhr.response);
            dispatch(updatePayload(payload));
            dispatch(setCurrentGuild(payload["guilds"][0]));


        });
        xhr.open('GET', config.backendUrl+'/content/fetch');
        
        xhr.setRequestHeader('Authorization','Token ' + state.currentInformation.authToken);
        xhr.send();

        return ({
            type: FETCH_BACKEND_PAYLOAD,
        })
    };
}

export const setCurrentGuild = (guild) => ({
        type: SET_CURRENT_GUILD,
        guild: guild
})

export const updatePayload = (payload) => ({
        type: UPDATE_PAYLOAD,
        payload: payload
})

    

export const setAuthToken = (token, isExpired) => ({ 
    type: SET_AUTHTOKEN,
    token: token,
    isExpired: isExpired,
})

export const changeTab = (tab) => ({
    type: CHANGE_TAB,
    tab: tab,
})


export const controlPlayback = (controlAction) => {
    return (dispatch, getState) => {

        const state = getState();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {});
        xhr.open('POST', config.backendUrl+'/bot/control_playback');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization','Token ' + state.currentInformation.authToken);
        xhr.send("control="+controlAction+"&guild_id="+state.currentInformation.guild.id);

        return {
            type: CONTROL_PLAYBACK,
        }
    }
}
    
    
    
export const playSoundClip = (name) => {
    return (dispatch, getState) => {
        
        const state = getState();
        var xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {})
        xhr.open('POST', config.backendUrl+'/bot/play_clip');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization','Token ' + state.currentInformation.authToken);
        xhr.send("clip_name="+name+"&guild_id="+state.currentInformation.guild.id);

                
        return ({
            type: PLAY_SOUNDCLIP,
            name: name
        })
    };
}

export const uploadClip = (file, name) => {
    return (dispatch, getState) => {
        
        if(file === null){
            alert('No file provided!'); 
            return;
        }
        
        if(!file.name.endsWith('.mp3')){
            alert('File needs to be mp3!'); 
            return;
        }

        /* Check for valid name - at least one character and contains only alphanumeric chars and underscores*/
        if (name == "" || name === null){ 
            alert('no name provided'); 
            return;
        }
        if (name.search(/^[a-zA-Z0-9_]+$/) === -1){ 
            alert('Soundclip name can only contain letters, numbers and underscores!'); 
            return;
        }

    
        const state = getState();

        let formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);

        let xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            console.log(xhr.response);

            if(xhr.status != 200){
                alert('Upload failed');
                return;
            }

            alert('Upload successfull');

        });
        xhr.open('POST', config.backendUrl+'/content/upload_sound_clip');
        
        xhr.setRequestHeader('Authorization','Token ' + state.currentInformation.authToken);
        xhr.send(formData);

        return ({
            type: UPLOAD_CLIP,
        })
    };
}
