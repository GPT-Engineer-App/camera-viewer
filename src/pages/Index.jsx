import React, { useRef, useEffect } from "react";
import { Container, Button, Box, useToast } from "@chakra-ui/react";
import { FaVideo, FaStopCircle } from "react-icons/fa";

const Index = () => {
  const videoRef = useRef(null);
  const toast = useToast();

  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          toast({
            title: "Error accessing the camera",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Unsupported Browser",
        description: "Your browser does not support the MediaDevices API",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };

  useEffect(() => {
    return () => stopVideo(); // Cleanup the stream on component unmount
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box boxSize="sm" borderWidth="2px" borderRadius="lg" overflow="hidden">
        <video ref={videoRef} width="100%" height="auto" style={{ maxWidth: "100%" }} />
      </Box>
      <Button leftIcon={<FaVideo />} colorScheme="teal" variant="solid" m={4} onClick={startVideo}>
        Start Camera
      </Button>
      <Button leftIcon={<FaStopCircle />} colorScheme="red" variant="solid" onClick={stopVideo}>
        Stop Camera
      </Button>
    </Container>
  );
};

export default Index;
