import { useEffect, useRef } from 'react'

const VIDEO_ID = 'okJqVvkQTQ8'
const START = 435
const END = 825
let apiPromise

function loadPlayerApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previousReady = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.()
        resolve(window.YT)
      }
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.onerror = () => { apiPromise = undefined; reject(new Error('YouTube unavailable')) }
      document.head.appendChild(script)
    })
  }
  return apiPromise
}

export default function PitchVideo() {
  const container = useRef(null)

  useEffect(() => {
    let disposed = false
    let player
    let timer
    const restart = target => target.loadVideoById({ videoId: VIDEO_ID, startSeconds: START, endSeconds: END })

    loadPlayerApi().then(YT => {
      if (disposed) return
      const mount = document.createElement('div')
      container.current.appendChild(mount)
      player = new YT.Player(mount, {
        videoId: VIDEO_ID,
        playerVars: { start: START, end: END, autoplay: 1, mute: 1, playsinline: 1, rel: 0, origin: window.location.origin },
        events: {
          onReady: ({ target }) => {
            target.getIframe().title = 'RaktKhoj pitch — 7:15 to 13:45'
            target.mute()
            target.playVideo()
            // Seeking can clear YouTube's endSeconds boundary; keep it enforced.
            timer = window.setInterval(() => {
              if (target.getPlayerState() !== YT.PlayerState.PLAYING) return
              const time = target.getCurrentTime()
              if (time >= END || time < START - 1) restart(target)
            }, 250)
          },
          onStateChange: ({ data, target }) => {
            if (data === YT.PlayerState.ENDED) restart(target)
          },
        },
      })
    }).catch(() => {
      // The permanent YouTube link below remains available if its API is blocked.
    })

    return () => {
      disposed = true
      window.clearInterval(timer)
      player?.destroy()
    }
  }, [])

  return <div className="award-video" ref={container} />
}
