import useTypewriter from '../hooks/useTypewriter'

/* ─── Photography Page ───────────────────────────────────
   Auto-loads all jpg/jpeg/png/mp4/mov from
   /src/assets/photography/ via Vite glob.
   Add files to that folder — page updates automatically.
────────────────────────────────────────────────────────── */

const modules = import.meta.glob(
  '/src/assets/photography/*.{jpg,jpeg,png,mp4,mov,JPG,JPEG,PNG,MP4,MOV}',
  { eager: true, import: 'default' }
)

const allMedia = Object.values(modules)

const images = allMedia.filter(src => /\.(jpg|jpeg|png)$/i.test(src))
const videos = allMedia.filter(src => /\.(mp4|mov)$/i.test(src))

/* ─── 3 images between every video ─── */
function distributeMedia(images, videos) {
  const result = []
  let imgIndex = 0
  let vidIndex = 0

  while (imgIndex < images.length) {
    for (let i = 0; i < 3 && imgIndex < images.length; i++) {
      result.push({ type: 'image', src: images[imgIndex++] })
    }
    if (vidIndex < videos.length) {
      result.push({ type: 'video', src: videos[vidIndex++] })
    }
  }

  return result
}

const media = distributeMedia(images, videos)

/* Title cycles through these words as a typewriter (shared hook). */
const TITLE_WORDS = ['Photography', 'Traveling', 'Adventures']

/* ─── Component ─────────────────────────────────────────── */
export default function Photography({ navigate }) {
  const typed = useTypewriter(TITLE_WORDS)
  return (
    <div className="photo-page">

      <div className="photo-header">
        <h1 className="photo-title" aria-label="Photography">
          <span aria-hidden="true">{typed}<span className="type-caret"></span></span>
        </h1>
        <p className="peel-note peel-note--l">Moments I didn't design, but framed.</p>
      </div>

      <div className="photo-masonry">
        {media.map((item, i) => (
          <div key={i} className="photo-item">
            {item.type === 'image' ? (
              <img src={item.src} alt="" loading="lazy" />
            ) : (
              <video
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
