function formatLyric(lyrics) {
  var lrc = lyrics.split("\n");
  var timeReg = /\[\d{2}:\d{2}\.\d{2,3}\]/g;//匹配时间的正则表达式
  var result = [];
  for (var i = 0; i < lrc.length - 1; i++) {
    var time = lrc[i].match(timeReg) || []; //获取歌词里的时间
    var value = lrc[i].replace(timeReg, ""); //获取纯歌词文本
    for (var j = 0; j < time.length; j++) {
      var t = time[j].slice(1, -1).split(":"); //t[0]分钟，t[1]秒
      var timeArr = (parseInt(t[0], 10) * 60 + parseFloat(t[1])).toFixed(3);
      result.push([timeArr, value]);//以[时间(秒)，歌词]的形式存进result
    }
  }
  return result
  // var lines = lrc.split("\n");
  //   var resy = new Array();
  //   var j = lines.length - 1;
  //   for (var i = 0; i < lines.length; i++) {
  //     resy[i] = new Array();
  //     var line = lines[j].split("]");
  //     var Tm = line[0].substring(1, line[0].length).split(":");
  //     resy[i][0] = parseInt(Tm[0], 10) * 60 + parseFloat(Tm[1]);
  //     resy[i][1] = line[1];
  //     j--;
  //   }
}
export default formatLyric