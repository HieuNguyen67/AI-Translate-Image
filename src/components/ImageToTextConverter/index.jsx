import { useCallback, useEffect, useState } from "react";
import Tesseract from "tesseract.js";

function ImageToTextConverter() {
  const [imageText, setImageText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Thêm state mới để lưu URL của hình ảnh

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file)); // Tạo URL cho hình ảnh và lưu vào state
  };

  const handleConvert = () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    Tesseract.recognize(imageFile, "eng", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        setImageText(text);
      })
      .catch((error) => {
        console.error("Error during Tesseract recognition:", error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleConvert}>Convert</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}{" "}
      {/* Hiển thị hình ảnh */}
      {imageText && <div>{imageText}</div>}
    </div>
  );
}

export default ImageToTextConverter;
