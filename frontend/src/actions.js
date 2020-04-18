import config from './copied_config.js';

export const SET_AUTHTOKEN = 'SET_AUTHTOKEN';
export const FETCH_BACKEND_PAYLOAD = 'FETCH_BACKEND_PAYLOAD';
export const SET_CURRENT_GUILD = 'SET_CURRENT_GUILD';
export const UPDATE_PAYLOAD = 'UPDATE_PAYLOAD';
export const CONTROL_PLAYBACK = 'UPDATE_PAYLOAD';
export const PLAY_SOUNDCLIP = 'PLAY_SOUNDCLIP';
export const CHANGE_TAB = 'CHANGE_TAB';



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
