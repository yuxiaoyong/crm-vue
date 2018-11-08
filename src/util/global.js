import moment from "moment";

export function formatTime(input, fmtstring) {
  if(!input){
    return "";
  }
  return moment(input).format(fmtstring);
}

export function isImage(fileName){
  if(!fileName) return false;

  let suffix = fileName.substring(fileName.lastIndexOf(".")+1).toUpperCase();
  switch(suffix){
    case "JPG":
    case "JPEG":
    case "PNG":
    case "GIF":
    case "BMP":
    case "TIFF":
      return true;
    default:
      return false;
  }
}

