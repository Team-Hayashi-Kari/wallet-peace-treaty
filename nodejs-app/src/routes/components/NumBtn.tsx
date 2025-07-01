import { type FC, useContext } from "react";
import Context from "./Context";
import { onNumClick } from "../reducers";

const NumBtn: FC<{ n: number }> = ({ n }) => {
const { dispatch } = useContext(Context);

return <button onClick={() => dispatch(onNumClick(n))}>{n}</button>;
};

export default NumBtn;