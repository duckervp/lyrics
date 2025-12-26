import { CONFIG } from 'src/config-global';

import { LyricHomeView } from 'src/sections/lyric/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title> {`Home - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Look for your favorite song lyrics, Vietnamese music, international music, and more"
      />
      <meta
        name="keywords"
        content="lyric,lyrics,song,music,loi bai hat,lời bài hát,nhac viet,nhạc việt"
      />

      <LyricHomeView />
    </>
  );
}
 