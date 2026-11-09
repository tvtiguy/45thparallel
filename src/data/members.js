// The band, past and present. Both the Home grid and the About page read from
// here, so there's one place to edit.
//
// `active: false` hides someone from the site without throwing anything away --
// their photo, role and bio stay right here. Flip it back to true and they
// reappear everywhere, in list order. Nothing else needs to change.

const members = [
  {
    name: 'Mark Watson',
    role: 'Guitar & Vocals',
    image:
      'https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/2d4f4a97-6065-4f67-8d5c-905bdd217db0/IMG_6610.jpg',
    bio: `Originally from Chicago, IL, Mark picked up the guitar in his college dorm and never looked back. He formed his first band "Quixotic" with high school friends in the late 1980s. In 2000, he moved to Hillsboro, Oregon with his family. Later, he formed "Beverly Hillsboro" with his business partner Ken, which eventually morphed into "45th Parallel."`,
    active: true,
  },
  {
    name: 'Rich Boam',
    role: 'Drums & Vocals',
    image:
      'https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/416e4f19-5c0e-425f-848b-27bc22d3cccd/IMG_20220504_140420446-1.jpg',
    bio: `Hailing from the area near Wilsonville, Rich began drum lessons in 1973 at age nine. His first professional gig was with the Jon Bricker Blues Band in 1985 at the University of Portland. He joined KC Project, a 50s/60s band, in 1986, then moved to "Groove," an original fusion funk band, in 1989. After leaving performing in 1992 to pursue songwriting, Rich joined "Beverly Hillsboro" in 2016, which eventually evolved into "45th Parallel" in 2022.`,
    active: true,
  },
  {
    name: 'John Wesson',
    role: 'Guitar & Vocals',
    image:
      'https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/36e315c2-cced-4007-8013-8bc2cef95d87/JohnEdited.png',
    bio: `Raised in the Chicago area, John fell in love with blues-based rock and roll early on, frequenting legendary venues like B.L.U.E.S, Kingston Mines, and Buddy Guy's Legends. He moved to Portland in the early 1990s and has played at various local venues including Trails End Saloon, Hoppers, and the Waterfront Blues Festival. John brings his passion for authentic blues-rock to every 45th Parallel performance.`,
    active: true,
  },
  {
    name: 'Mark Moulding',
    role: 'Keyboards',
    image: '/mark-moulding.jpg',
    bio: `Mark, from the Southern California area, began playing music quite early, with piano lessons at age six and string bass at eight. After playing bass in various stage bands and as the youngest member of the Peninsula Symphony orchestra, he set aside the bass to play keyboards in college in a coffee-house duo, including an appearance on the Gong Show (the girl with the guitar won...). Following college, he played in a variety of local bands, recording two albums with the Rich Harper Blues Band before taking a break to start an engineering company. Returning to music in the "aughts", he co-founded the Wrongway Feldman band in the Bay area, then moved to the Portland area and 45th Parallel.`,
    active: true,
  },
  {
    // Left the band Sept 2026. Kept here in full -- set active: true to restore.
    name: 'Tracy Dragoo',
    role: 'Bass & Vocals',
    image: '/tracy-dragoo.png',
    imgClass: 'scale-[1.6] origin-top -translate-y-8 group-hover:scale-[1.7]',
    bio: `Tracy Dragoo is a bass player born and raised in Southern California whose passion for music began in the fourth grade with the upright bass. By high school, Tracy had made the switch to electric bass and quickly found a home performing with Top 40 bands throughout the Southern California music scene. Since those early days, music has remained a constant part of life, with decades of live performance experience and a deep love for connecting with audiences through groove and rhythm.

Rooted in the sounds of R&B, soul, disco, and classic rock, Tracy developed a versatile playing style influenced by the rich musical diversity of California's live music circuit. Over the past ten years, that musical journey has continued to grow, adding country and flamenco to an already wide-ranging list of genres enjoyed both on stage and in the studio.

Throughout a long-running career, Tracy has been fortunate to occasionally perform and record with several well-known artists and musicians in Southern California, experiences that helped shape both musicianship and professionalism. Now based in the Pacific Northwest, Tracy is excited to continue performing, collaborating, and bringing years of experience and passion to new musical opportunities.`,
    active: false,
  },
]

export const currentMembers = members.filter((m) => m.active)
export const formerMembers = members.filter((m) => !m.active)
export default members
