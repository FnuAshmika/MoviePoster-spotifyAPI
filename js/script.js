
const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        body: 'grant_type=client_credentials',
        headers:{
            Authorization:`Basic ${btoa(clientID+':'+clientSecret)}`,
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    })
    const data = await result.json()
    return data.access_token
}
// console.log(getToken())
const getSong = async(track, artist) => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist&limit=5`, {
    method: "GET",
    headers:{
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type":'application/json'
    }
    })
    const data = await result.json()
    return data.tracks.items[0].preview_url
}
getSong("Ooh La La", 'Faces')

const clickedEvent = async (figId) => {
    const imgIndex = parseInt(figId.slice(-1)) - 1
    const songList = document.getElementsByTagName('img')
    const [track, artist] = songList[imgIndex].alt.split(' - ')
    const songUrl = await getSong(track,artist)
    // playSong ?? playSong.pause() 
    if(playSong){
        playSong.pause()
    }
    startSong(songUrl)
}

let playSong 
const startSong = (url) => {
    playSong = new Audio(url)
    return playSong.play()
}

const stopSong = () => {
    playSong.pause()
}
