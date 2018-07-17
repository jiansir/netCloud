
export class Song{
  constructor(params) {
    this.id = params.id; //歌曲ID
    this.name = params.name; //歌曲名称
    this.singer = params.singer; //歌手
    this.album = params.album; //专辑
    this.image = params.image; //封面图
    this.duration = params.duration; //时长
  }
}
function filterSinger(singers){
  var arr=[];
  singers.forEach(item=>{
    arr.push(item.name)
  })
  return arr.join("/")
}

export function createSongs(music){
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.artists.length > 0 && filterSinger(music.artists),
    album: music.album.name,
    image: music.album.picUrl || null,
    duration: music.duration / 1000,
  })
}

const formatSongs=function(list){
  let Songs=[];
  list.forEach(item => {
    if(item.id){
      Songs.push(createSongs(item))
    }
  });
}
export default formatSongs