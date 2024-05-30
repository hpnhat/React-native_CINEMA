import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeLoginInfo = async (accessToken: any, userData: any) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    console.log("ok");
  } catch (error) {
    console.error("Error storing login info:", error);
  }
};

export const getLoginInfo = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const userData = await AsyncStorage.getItem("userData");

    if (accessToken !== null && userData !== null) {
      return { accessToken, userData: JSON.parse(userData) };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting login info:", error);
    return null;
  }
};

export const removeLoginInfo = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("userData");
  } catch (error) {
    console.error("Error removing login info:", error);
  }
};
