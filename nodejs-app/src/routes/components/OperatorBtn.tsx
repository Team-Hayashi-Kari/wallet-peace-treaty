import { type FC, useContext } from "react";
import Context from "./Context";
import type { Actions } from "../reducers";

const OperatorBtn: FC<{ o: string; action: Actions }> = ({ o, action }) => {
const { dispatch } = useContext(Context);

return <button onClick={() => dispatch(action)}>{o}</button>;
};

export default OperatorBtn;