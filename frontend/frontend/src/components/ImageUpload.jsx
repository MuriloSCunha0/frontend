import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, storage } from '../firebase';

const ImageUpload = ({ arenaId }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (image) {
      const storageRef = ref(storage, `arenas/${arenaId}/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'arenas', arenaId), {
        photos: arrayUnion(url),
      });
      alert('Image uploaded successfully!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>Upload Image</Button>
    </div>
  );
};

export default ImageUpload;
