import { Box, HStack, Text, Center, Button } from "native-base";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

const ToastErrorContent = (props) => {
  const { content, onPress } = props;
  return (
    <Box bg={"warning.100"} padding={3} borderRadius={10}>
      <HStack space={3}>
        <FontAwesome name="warning" size={24} color="#f97316" />
        <Text style={{ fontSize: 18, fontFamily: "SignikaNegative_Bold" }}>
          Kesalahan
        </Text>
      </HStack>
      <HStack space={3}>
        <FontAwesome name="warning" size={24} color="transparent" />
        <Text>{content}</Text>
      </HStack>
      <Center>
        {onPress && (
          <Button
            width={100}
            onPress={() => onPress()}
            mt={3}
            colorScheme="warning"
            size={"xs"}
          >
            OK
          </Button>
        )}
      </Center>
    </Box>
  );
};

export default ToastErrorContent;

ToastErrorContent.propTypes = {
  content: PropTypes.string,
  onPress: PropTypes.func,
};
