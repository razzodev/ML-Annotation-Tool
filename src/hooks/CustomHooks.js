import {useState} from 'react'

export function useFiles() {
    const [state, setstate] = useState();
    function withBlobs(files) {
      const blobs = [...files]
        .map(file => {
          if (file.type.includes("image")) {
            console.log("image");
            file.preview = URL.createObjectURL(file);
            return file;
          }
          console.log("not image");
          return null;
        })
        .filter(elem => elem !== null);
  
      setstate(blobs);
    }
    return [state, withBlobs];
  }

  export function consoleJSON(data) {
    return 	console.log(JSON.stringify(data,null,'\t'))
  }