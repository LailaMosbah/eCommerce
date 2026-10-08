// Lotties
import { Lottie } from "lottie-react"

import notFound from "@assets/lotties/notFound.json";
import empty from "@assets/lotties/empty.json";
import loading from "@assets/lotties/loading.json";
import error from "@assets/lotties/error.json";

const lottieFilesMap = {
    notFound,
    empty,
    loading,
    error,
};
type LottiesHandlerProps = {
    type: keyof typeof lottieFilesMap
    message?: string
}
function LottiesHandler({ type, message }: LottiesHandlerProps) {
    const lottieFile = lottieFilesMap[type];
    const styleMessage = type === "error" ? { color: "red", fontWeight: "bold", fontSize: "19px" } : { fontSize: "19px", fontWeight: "bold", color: "#555" };
    return (
        <div>
            <Lottie src={lottieFile} loop={true} autoplay style={{ width: "200px", height: "200px" }} />
            {message && <p style={styleMessage}>{message}</p>}
        </div>
    )
}

export default LottiesHandler
