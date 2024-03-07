import React, { useState, useEffect } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Home = () => {
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

  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-ai-translate.vercel.app/v1/api/admin/translate",
        {
          text,
        }
      );
      setTranslation(response.data.translation);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  // Gán giá trị của imageText vào textarea khi đã convert
  useEffect(() => {
    setText(imageText);
  }, [imageText]);

  return (
    <>
      <Container>
        <h1
          className="mx-auto col-12 text-center"
          style={{
            color: "#ff5722",

            fontSize: "3rem",
          }}
        >
          Dịch Văn Bản Tiếng Anh Từ Hình Ảnh
        </h1>
        <Row className="mt-5">
          <Col className="col-md-6 col-12">
            {" "}
            <Form>
              <Form.Group className="position-relative mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Button
                className="py-3 col-12 col-md-6"
                onClick={handleConvert}
                style={{
                  background:
                    "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
                  border: "0px",
                  fontSize: "1.2rem",
                }}
              >
                Chuyển hình ảnh sang văn bản
              </Button>
            </Form>
          </Col>
          <Col className="col-md-6 col-12 mt-md-0 mt-3">
            {" "}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="d-block w-100 rounded-4"
                style={{border:'1px solid'}}
              />
            )}
          </Col>
        </Row>
        <Row className="mt-md-5 mt-2 pb-5 mb-5">
          <Col className="col-md-6 col-12 mt-md-0 mt-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="position-relative mb-3">
                <Form.Control
                  as="textarea"
                  required
                  value={text}
                  onChange={handleChange}
                  style={{ height: "17rem" }}
                />
              </Form.Group>
              <Button
                className="py-3"
                type="submit"
                style={{
                  background:
                    "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
                  border: "0px",
                  fontSize: "1.2rem",
                }}
              >
                Dịch Văn Bản
              </Button>
            </Form>
          </Col>
          <Col className="col-md-6 col-12 mt-md-0 mt-3">
            {translation && (
              <div>
                <h2>Translation:</h2>
                <p>{translation}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
