import CountryPicker from "react-native-region-country-picker";

let countryPickerRef = undefined;

// use countryPickerRef
countryPickerRef.open();
countryPickerRef.close();

<CountryPicker
  enable={true}
  //darkMode={false}
  countryCode={"US"}
  containerConfig={{
    showFlag: true,
    showCallingCode: true,
    showCountryName: true,
    showCountryCode: true,
  }}
  modalConfig={{
    showFlag: true,
    showCallingCode: true,
    showCountryName: true,
    showCountryCode: true,
  }}
  onSelectCountry={}
  onOpen={() => {
    console.log("Open");
  }}
  onClose={() => {
    console.log("Close");
  }}
  containerStyle={{
    container: {},
    flagStyle: {},
    callingCodeStyle: {},
    countryCodeStyle: {},
    countryNameStyle: {},
  }}
  modalStyle={{
    container: {},
    searchStyle: {},
    tileStyle: {},
    itemStyle: {
      itemContainer: {},
      flagStyle: {},
      countryCodeStyle: {},
      countryNameStyle: {},
      callingNameStyle: {},
    },
  }}
  title={"Country"}
  searchPlaceholder={"Search"}
  showCloseButton={true}
  showModalTitle={true}
/>;