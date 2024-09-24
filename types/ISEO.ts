export type ISEOImage = {
  mediaItemUrl: string | null;
};

export type ISEO = {
  metaDesc: string;
  canonical: string;
  cornerstone: boolean;
  opengraphAuthor: string;
  opengraphDescription: string;
  opengraphImage: ISEOImage;
  opengraphModifiedTime: string;
  opengraphPublishedTime: string;
  opengraphPublisher: string;
  opengraphTitle: string;
  opengraphType:
    | "website"
    | "article"
    | "book"
    | "profile"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_status"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other";
  opengraphUrl: string;
  title: string;
  twitterDescription: string;
  twitterImage: ISEOImage;
  twitterTitle: string;
  schema: {
    raw: string;
  };
};
