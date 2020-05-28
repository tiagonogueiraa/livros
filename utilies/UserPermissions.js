import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class UserPermissions {
    getCameraPermission = async () => {
        // if(Constants.platform.io){
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status != "granted"){
                alert("Preciso de permissão para utilizar sua câmera.")
            }
        // }
    }
}

export default new UserPermissions();