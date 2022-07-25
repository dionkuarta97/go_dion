import React, { useEffect } from "react";
import { Select, Box, CheckIcon, Center, Text } from "native-base";

const TahunAjaran = (props) => {
  const { tahun, onChange, tryout } = props;
  let [service, setService] = React.useState("");

  useEffect(() => {
    if (tahun.length > 0) {
      if (tryout) {
        setService(tryout);
      } else {
        setService(tahun[0].id);
      }
    }
  }, [tahun]);

  console.log(tryout);
  return (
    <>
      <Text marginTop={1} bold>
        Tahun Ajaran
      </Text>
      <Center>
        <Box marginTop={2}>
          <Select
            height={10}
            selectedValue={service}
            minWidth="200"
            _selectedItem={{
              bg: "amber.400",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setService(itemValue);
              onChange(itemValue);
            }}
          >
            {tahun.map((el) => (
              <Select.Item label={el.title} value={el.id} key={el.id} />
            ))}
          </Select>
        </Box>
      </Center>
    </>
  );
};

export default TahunAjaran;
