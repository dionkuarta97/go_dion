import React, {useState} from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import DefaultPrimaryButton from "../../../Components/Button/DefaultPrimaryButton";
import DefaultTextInput from "../../../Components/CustomTextInput/DefaultTextInput";
import PasswordTextInput from "../../../Components/CustomTextInput/PasswordTextInput";
import {LpFontStyles} from "../../../Theme/styles/learnProStyles";
import {LpSizesUtils} from "../../../Theme/utils/learnProUtils";
import RegisterForm1 from "./RegisterForm1";
import RegisterForm2 from "./RegisterForm2";

const RegisterContent = () => {
    const [selectedForm, setSelectedForm] = useState(0);

    const FormList = [<RegisterForm1 />, <RegisterForm2 />];

    return (
        <View
            style={{
                paddingVertical: LpSizesUtils.fixPadding * 7.0,
                paddingHorizontal: LpSizesUtils.fixPadding * 2.0,
            }}
        >
            {FormList[selectedForm]}

            <View style={{flexDirection: "row"}}>
                {selectedForm != 0 && (
                    <View style={{flex: 1}}>
                        <DefaultPrimaryButton
                            text="Prev"
                            onPress={() => setSelectedForm(selectedForm - 1)}
                        />
                    </View>
                )}
                {selectedForm != 0 && <View style={{width: 20}}></View>}
                {selectedForm != FormList.length - 1 && (
                    <View style={{flex: 1}}>
                        <DefaultPrimaryButton
                            text="Next"
                            onPress={() => setSelectedForm(selectedForm + 1)}
                        />
                    </View>
                )}

                {selectedForm == FormList.length - 1 && (
                    <View style={{flex: 1}}>
                        <DefaultPrimaryButton
                            text="Submit"
                            onPress={() => {
                                console.log("Submit");
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default RegisterContent;
